import React, {useState, useEffect} from 'react'
import axios from 'axios'

export const SwitchGames = () => {

  const [game, setGame]= useState([]);

  useEffect(()=>{
    const fetchData = async () =>{
      try {
        const response = await  axios.get('https://api.sampleapis.com/switch/games')
        setGame(response.data);
        if(!response.status.ok){
          throw new Error('Error fetching the games');
        }
      } catch (error) {
        console.error(error);
      }
    }
  },[]);

  return (
    <div className="container my-4">
      <h1 className="text-center text-white mb-4">Coffee List</h1>
      <div className="row">
        {currentItems.map((coffee, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <div className="card h-100">
              <img src={coffee.image} className="card-img-top" alt={coffee.title} />
              <div className="card-body">
                <h5 className="card-title">{coffee.title}</h5>
                <p className="card-text">{coffee.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center">
        <nav>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handleClick(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-primary" onClick={handleReset}>Volver al inicio</button>
      </div>
    </div>
  )
}
