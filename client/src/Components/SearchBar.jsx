import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDogs } from '../Redux/actions';
import { GiThrowingBall } from 'react-icons/gi';
import '../Styles/SearchBar.css';

export default function SearchBar() {

    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e) {
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        var found = getDogs(name);
        dispatch(found)
        setName('');
    }

    return (
        <>
            <input
                type='text'
                placeholder='!Buscar por raza...'
                onChange={e => handleInputChange(e)}
                value={name}
                className='input'
                onKeyPress={e => e.key === 'Enter' && handleSubmit(e)}
            />
            <button
                type='submit'
                onClick={e => handleSubmit(e)}
                className='fetch'
            >
                <strong>Buscar! <GiThrowingBall /></strong>
            </button>
        </>
    )
}