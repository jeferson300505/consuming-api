import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const RickAndMorty = () => {
  const [rick, setRick] = useState([]);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(rick.length / itemsPerPage);

  useEffect(() => {
    const fetchRick = async () => {
      try {
        const response = await axios.get('https://api.sampleapis.com/rickandmorty/characters');
        setRick(response.data);
      } catch (error) {
        console.log("Error al recuperar los datos de Rick and Morty:", error);
      }
    };

    fetchRick();
  }, []);

  return (
    <div id="carouselExample" className="carousel slide container " style={{ width: '1000px', marginTop: '50px' }}>
      <h2 style={{ color:'#fff', textAlign:'center' }}> Rick And Morty </h2>
      <div className="carousel-inner">
        {Array.from({ length: totalPages }, (_, pageIndex) => (
          <div className={`carousel-item ${pageIndex === 0 ? 'active' : ''}`} key={pageIndex}>
            <div className="row">
              {rick.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage).map((personajes, index) => (
                <div className="col-md-3 mb-4" key={index}>
                  <div className="card h-100">
                    <img src={personajes.image} className="d-block w-100 card-img-top" alt={personajes.name} />
                    <div className="card-body">
                      <h5 className="card-title">Nombre: {personajes.name}</h5>
                      <p className="card-text">Especie: {personajes.species}</p>
                      <p>Origen: {personajes.origin.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon bg-black" aria-hidden="true"></span>
        <span className="visually-hidden ">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon bg-black" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};