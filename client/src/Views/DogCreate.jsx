import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTemperaments, postDog } from '../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import '../Styles/DogCreate.css';
import { IoPaw } from 'react-icons/io5'

function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Tu raza debe tener un nombre.';
    }
    else if (input.name.length > 30) {
        errors.name = 'Ese es un nombre demasiado largo. Mantenlo simple!!';
    }
    else if (!input.min_height) {
        errors.min_height = 'Se requiere altura mínima!!';
    }
    else if (isNaN(parseInt(input.min_height))) {
        errors.min_height = 'La altura debe ser un número';
    }
    else if (input.min_height <= 0) {
        errors.min_height = 'Tu raza no puede ser más corta que 0';
    }
    else if (parseInt(input.min_height) >= parseInt(input.max_height)) {
        errors.min_height = 'La altura mínima debe ser inferior a la altura máxima';
    }
    else if (!input.max_height) {
        errors.max_height = 'Se requiere altura máxima!!';
    }
    else if (isNaN(parseInt(input.max_height))) {
        errors.max_height = 'La altura debe ser un número';
    }
    else if (input.max_height > 150) {
        errors.max_height = 'Creo que 150 cm es suficiente para la altura de un perro, ¿no??';
    }
    else if (!input.max_weight) {
        errors.max_weight = 'Se requiere peso mínimo!!';
    }
    else if (isNaN(parseInt(input.min_weight))) {
        errors.min_weight = 'El peso debe ser un número.';
    }
    else if (input.min_weight <= 0) {
        errors.min_weight = 'Tu raza debe pesar al menos más que la nada';
    }
    else if (!input.max_weight) {
        errors.max_weight = 'Se requiere peso máximo!!';
    }
    else if (isNaN(parseInt(input.max_weight))) {
        errors.max_weight = 'El peso debe ser un número.';
    }
    else if (parseInt(input.max_weight) <= parseInt(input.min_weight)) {
        errors.min_weight = 'El peso máximo debe ser mayor que el peso mínimo';
    }
    else if (input.max_weight > 200) {
        errors.max_weight = 'Estamos creando un perro, no un elefante. 🐘!! Mantenga su peso por debajo de 200';
    }
    else if (!input.life_span) {
        errors.life_span = 'Se requiere tiempo de vida!!';
    }
    else if (isNaN(parseInt(input.life_span))) {
        errors.life_span = 'La vida útil debe ser un número';
    }
    else if (input.life_span > 50) {
        errors.life_span = 'Lamentablemente, los perros no viven tanto 😥';
    }
    else if (input.life_span <= 0) {
        errors.life_span = 'No quieres que tu perro viva???? 😮';
    }
    else if (!input.image) {
        errors.image = 'Se requiere imagen!!';
    }
    return errors;
}

export default function DogCreate() {
    const dispatch = useDispatch();
    const allTemperaments = useSelector((state) => state.temperaments);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: '',
        min_height: '',
        max_height: '',
        min_weight: '',
        max_weight: '',
        life_span: '',
        image: '',
        temperaments: [],
    });

    useEffect(() => {
        dispatch(getTemperaments());
    },[dispatch]);

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        // Esta función hace lo siguiente:
        // Cada vez que modifique o agregue algo, a mi estado input, además de lo que tiene, le agrega
        // el value de lo que se esté modificando. La idea es que a medida que vaya llenando los inputs
        // del formulario, me vaya modificando el estado inicial, que tiene todas las propiedades vacías.

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
        }));
    }
    function handleSelect(e) {
        if (!input.temperaments.includes(e.target.value)) {
            setInput({
                ...input,
                temperaments: [...input.temperaments, e.target.value]
            });
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        // console.log(errors);
        if (!Object.getOwnPropertyNames(errors).length && input.name && input.min_height && input.max_height && input.min_weight && input.max_weight && input.life_span && input.temperaments.length && input.image) {
            dispatch(postDog(input));
            alert('Dog creado con Exito 👏');
            setInput({
                name: '',
                min_height: '',
                max_height: '',
                min_weight: '',
                max_weight: '',
                life_span: '',
                image: '',
                temperaments: [],
            });
        } else {
            alert('No se puede crear la raza con estos datos 🤷‍♂️')
        }
    }

    function handleDeleteTemperament(el) {
        setInput({
            ...input,
            temperaments: input.temperaments.filter(temp=> temp !== el)
        });
    }

    return (
        <div className='divCreate'>

            <h1 className='title2'>🐕 CREA TU PROPIA RAZA DE PERRO! 🐶</h1>
            <br/>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label className="orden"><strong className="nombre">Nombre: </strong></label>
                    <input type='text' value={input.name} name='name' onChange={e => handleChange(e)} />
                    {errors.name && (
                        <p className='error'><strong>{errors.name}</strong></p>
                    )}
                </div>
                <div>
                    <label><strong className="alt">Altura mínima: </strong></label>
                    <input type='text' value={input.min_height} name='min_height' onChange={e => handleChange(e)} />
                    <label><strong> cm</strong></label>
                    {errors.min_height && (
                        <p className='error'><strong>{errors.min_height}</strong></p>
                    )}
                </div>
                <div>
                    <label><strong className="alt">Altura máxima: </strong></label>
                    <input type='text' value={input.max_height} name='max_height' onChange={e => handleChange(e)} />
                    <label><strong> cm</strong></label>
                    {errors.max_height && (
                        <p className='error'><strong>{errors.max_height}</strong></p>
                    )}
                </div>
                <div>
                    <label><strong className="peso">Peso mínimo: </strong></label>
                    <input type='text' value={input.min_weight} name='min_weight' onChange={e => handleChange(e)} />
                    <label><strong> kg</strong></label>
                    {errors.min_weight && (
                        <p className='error'><strong>{errors.min_weight}</strong></p>
                    )}
                </div>
                <div>
                    <label><strong className="maximo">Peso máximo: </strong></label>
                    <input type='text' value={input.max_weight} name='max_weight' onChange={e => handleChange(e)} />
                    <label><strong> kg</strong></label>
                    {errors.max_weight && (
                        <p className='error'><strong>{errors.max_weight}</strong></p>
                    )}
                </div>
                <div>
                    <label><strong className="vida">Esperanza de vida: </strong></label>
                    <input type='text' value={input.life_span} name='life_span' onChange={e => handleChange(e)} />
                    <label><strong> años</strong></label>
                    {errors.life_span && (
                        <p className='error'><strong>{errors.life_span}</strong></p>
                    )}
                </div>
                <div>
                    <label><strong className="imagen">Imagen: </strong></label>
                    <input type='text' value={input.image} name='image' onChange={e => handleChange(e)} />
                </div>
                <div>
                    <select className="tem" onChange={e => handleSelect(e)} >
                        <option value='selected' hidden >Temperamentos</option>
                        {allTemperaments?.sort(function (a, b) {
                            if (a.name < b.name) return -1;
                            if (a.name > b.name) return 1;
                            return 0;
                        }).map(temp => {
                            return (
                                <option value={temp.name} key={temp.id}>{temp.name}</option>
                            )
                        })}
                    </select>

                    {input.temperaments.map(el => {
                        return (
                            
                                <ul className='allTemps' key={el}>
                                    <li>
                                        <p className='temp1'><strong>{el}</strong></p>
                                        <button onClick={() => handleDeleteTemperament(el)} className='x' >Eliminar</button>
                                    </li>
                                </ul>
                        )
                    })}

                </div>
                <button type='submit' className='salir1' ><strong>Crear<IoPaw/></strong></button>
                    <Link to='/home'><button className='salir'><strong>Home 🐶</strong></button></Link>
            </form>
        </div>
    )
}