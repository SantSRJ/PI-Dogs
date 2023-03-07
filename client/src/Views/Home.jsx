import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDogs,
  orden_year,
  getTemperaments,
  filterDogsByTemperament,
  filterDogsByOrigin,
  sortByName,
  sortByWeight,
} from '../Redux/actions';
import { Link } from 'react-router-dom';
import Card from '../Components/Card';
import Paginado from '../Components/Paginado';
import SearchBar from '../Components/SearchBar';
import '../Styles/Home.css';
import { GiDogHouse, GiSittingDog } from 'react-icons/gi';

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const allTemperaments = useSelector((state) => state.temperaments);

  // Paginado:
  const [currentPage, setCurrentPage] = useState(1); // En una constante me guardo el estado local actual y la otra me setea el estado actual. El state inicial es 1 porque empiezo en la primer página.
  const [dogsPerPage /*_setDogsPerPage*/] = useState(8); // Me guardo cuantos perros quiero por página.
  const indexOfLastDog = currentPage * dogsPerPage; // El índice del último perro de cada página va a ser el numero de la página multiplicado por la cantidad de perros por página.
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog); // El slice me permite cortar un array en dos partes. El primer parámetro es el índice del primer elemento que quiero, el segundo es el índice del último elemento que quiero.

  // El índice del primer perro de cada página va a ser el índice del último de esa página menos la cantidad de perros por página.
  // const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog); // Los perros mostrados en cada página serán los que estén en la porción que va desde el primero hasta el último de cada página, de la lista total de perros.

  const [/*orden*/, setOrden] = useState(""); // Estado local que me sirve para modificar el estado cuando ordeno y renderizar los perros ordenados como quiero.

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  //---------------------------------------------------------------------

  // Ahora voy a traerme del estado los perros cuando el componente se monta:
  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(getDogs());
  }

  function order_years(e) {
    e.preventDefault();
    dispatch(orden_year(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
  }

  function handleFilterTemperaments(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterDogsByTemperament(e.target.value));
  }

  function handleFilterOrigin(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterDogsByOrigin(e.target.value));
  }

  function handleSortByName(e) {
    e.preventDefault();
    dispatch(sortByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleSortByWeight(e) {
    e.preventDefault();
    dispatch(sortByWeight(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <div className="home">
      <div className="divNB">
        <h1 className="titulo3">🐶 Full Stack Development - PERN</h1>
        <ul className="navbar">
          <li>
            <button
              onClick={(e) => {
                handleClick(e);
              }}
              className="elementNB"
            >
              Home <GiDogHouse />
            </button>
          </li>
          <li>
            <Link to="/dogs">
              <button className="elementNB">
                Crear cachorro <GiSittingDog />
              </button>
            </Link>
          </li>
          <li className="content-select1">
            <select onChange={(e) => handleSortByName(e)}>
              <option value="selected" hidden className="razas">
                Ordenar por razas
              </option>
              <option value="asc">A - Z</option>
              <option value="desc">Z - A</option>
            </select>
          </li>

          <li className="content-select1">
            <select onChange={(e) => order_years(e)}>
              <option value="selected" hidden className="razas">
                Ordenar por años
              </option>
              <option value="asc">A - Z</option>
              <option value="desc">Z - A</option>
            </select>
          </li>

          <li className="content-select1">
            <select onChange={(e) => handleSortByWeight(e)}>
              <option value="selected" hidden>
                Ordenar por peso
              </option>
              <option value="asc">Más ligero masculino</option>
              <option value="desc">Más pesado masculino</option>
            </select>
          </li>
          <li className="content-select1">
            <select onChange={(e) => handleFilterTemperaments(e)}>
              <option key={0} value="all">
                temperamentos
              </option>
              {allTemperaments
                ?.sort(function (a, b) {
                  if (a.name < b.name) return -1;
                  if (a.name > b.name) return 1;
                  return 0;
                })
                .map((el) => {
                  return (
                    <option key={el.id} value={el.name}>
                      {el.name}
                    </option>
                  );
                })}
            </select>
          </li>
          <li className="content-select1">
            <select onChange={(e) => handleFilterOrigin(e)}>
              <option value="all">Todas las razas</option>
              <option value="api">Razas Existentes</option>
              <option value="created">Razas Creadas</option>
            </select>
          </li>
          <li>
            <SearchBar />
          </li>
        </ul>
      </div>
      <Link to={"/"} className="titulo">
        {" "}
        Dog Salir 🐶
      </Link>
      <br /> <br /> <br />
      <Paginado
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        paginado={paginado}
      />
      <div className="container">
        {currentDogs.map((el) => {
          return (
            <div key={el.id} className="cardHome">
              <Link to={"/home/" + el.id} style={{ textDecoration: "none" }}>
                <Card
                  name={el.name}
                  image={el.image}
                  temperaments={el.temperaments}
                  min_weight={el.min_weight}
                  max_weight={el.max_weight}
                  key={el.id}
                />
              </Link>
            </div>
          );
        })}
      </div>
      {/*<Paginado dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado} />*/}
    </div>
  );
}
