import { useEffect, useState, useRef } from 'react';
import { getCharacter, getPeople } from './api/people';
import './App.css';

import data from "./data.json";



function App() {
      const inputSearch = useRef;
      const [textSearch, setTextSearch] = useState("");
      const [people, setPeople] = useState([]);
      const [currentCharacter, setCurrentCharacter] = useState(1); 
      const [errorState, setErrorState] = useState({ hasError: false })
      const [details, setDetails] = useState({});  

      useEffect (() =>{
        getPeople()
        .then((data) => setPeople(data.results))
        .catch(handleError);
      }, []);
      
      useEffect(() => {
          getCharacter(currentCharacter).then(setDetails).catch(handleError);
      }, [currentCharacter])


 const handleError = (err) => {
    setErrorState({ hasError: true , message: err.message})
 }

 const showDetails = (character) => {
    const id = Number(character.url.split('/').slice(-2)[0]);
    setCurrentCharacter(id);
    //useEffect
 }
 
 const onChangeTextSearch = (event) => {
  event.preventDefault();
  const text = inputSearch.current.value;
  setTextSearch(text);
 }

  return (
      
      <div>
        <input ref={inputSearch} onChange={onChangeTextSearch} type="text" placeholder='BUSCA UN PERSONAJE'/>
      <ul>
        {errorState.hasError && <div>{errorState.message}</div>}
        {people.map((character) => (
        <li key={character.name} onClick={() => showDetails(character)}>{character.name}</li>
        ))}
      </ul>
      {details &&
      <aside>
        <h1>{details.name}</h1>
        <ul>
          <li>height: {details.height}</li>
          <li>mass: {details.mass}</li>
          <li>year of birth: {details.birth_year}</li>

        </ul>
      </aside>}
      </div>
  );
}

export default App;
