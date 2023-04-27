import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector, } from 'react-redux';
import { getDetail, delete_dog, cleanDetail } from '../Redux/actions';
import { useEffect } from 'react';
import '../Styles/Detail.css';
import { GiDogBowl, GiDogHouse, GiSittingDog } from "react-icons/gi";

export default function Detail() {
  const dispatch = useDispatch();
  
  const { id } = useParams();
  const myDog = useSelector((state) => state.detail);
  
  
  useEffect(() => {
    dispatch(cleanDetail());
    dispatch(getDetail(id));
    return(() => dispatch(delete_dog({})))
  }, [dispatch, id]);

  // vamos a crear un metodo para borrar el perro de la lista creada
    const deleteDog = () => {
    dispatch(delete_dog(id));
    alert("Seguro que quieres borrar a este perro?");
    window.location.href = "/home";
  };

return (
    <div className="divDetail">
      <div className="detail-container">
        <div className="detail-container-img">
          <h1 className="name">{myDog.name}</h1>
          <img src={myDog.image} alt={myDog.name} className="image" />
        </div>
        <div className="detail-container-info">
          <h4 className="caracts">Altura</h4>
          <p>
            {myDog.min_height} - {myDog.max_height} cm
          </p>
          <h4 className="caracts">Peso</h4>
          <p>
            {myDog.min_weight} - {myDog.max_weight} kg
          </p>
          <h4 className="caracts">Esperanza de vida</h4>
          <p className="last">{myDog.life_span}</p>
          <h4 className="caracts">Temperamentos</h4>
          <p className="last">{myDog.temperaments}</p>
          <div className="conta">
          <Link to="/home">
            <button className="buttonHome3" id="home">
              Home <GiDogHouse />
            </button>
          </Link>
          <Link to="/dogs">
            <button className="buttonHome3">
              Crear Cachorro <GiSittingDog />
            </button>
          </Link>
          <Link to={"/home"}>
            <button className="buttonDelete" onClick={deleteDog}>
              Borrar <GiDogBowl />
            </button>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
