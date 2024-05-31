import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const Beers = () => {
  const [beers, setBeers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.sampleapis.com/beers/ale');
        if (response.status !== 200) {
          throw new Error("Error en la conexión de la API");
        }
        setBeers(response.data);
        console.log("Conexión exitosa");
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleReset = () => {
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = beers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(beers.length / itemsPerPage);

  return (
    <div className="container my-4 " style={{ background: '#45b' }}>
      <h1 className="text-center text-white mb-4">Beers List</h1>
      <div className="row" >
        {currentItems.map((beer, index) => (
          <div className="col-md-3 mb-4" key={index} >
            <div className="card h-100">
              <img src={beer.image} className="card-img-top" alt={beer.name} />
              <div className="card-body">
                <h5 className="card-title">{beer.name}</h5>
                <p className="card-text">{beer.price}</p>
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
  );
};