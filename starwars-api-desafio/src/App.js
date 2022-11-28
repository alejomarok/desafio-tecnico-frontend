import { useEffect, useState, useRef } from 'react';
import { getCharacter, getPeople, searchCharacter } from './api/people';
import './App.css';

//import data from "./data.json";



function App() {
      const inputSearch = useRef(null);
      const [textSearch, setTextSearch] = useState("");
      const [people, setPeople] = useState([]);
      const [currentCharacter, setCurrentCharacter] = useState(1); 
      const [errorState, setErrorState] = useState({ hasError: false })
      const [details, setDetails] = useState({}); 
      
      const [page, setPage] = useState(1);


      useEffect (() =>{
        getPeople(page)
        .then(setPeople)
        .catch(handleError);
      }, [page]);
       
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

 const onSearchSubmit = (event) => {
  if (event.key !== "Enter") return;

  inputSearch.current.value = "";
  setDetails({});
  searchCharacter(textSearch)
  .then(setPeople)
  .catch(handleError);
};

const onChangePage = (next) => {
  if (!people.previous && page + next <= 0) return;
  if (!people.next && page + next >= 9) return;

  setPage(page + next);
};

  return (
      
      <div >

<div class="input-group input-group-lg">
  <input 
          ref={inputSearch}
        onChange={onChangeTextSearch}
        onKeyDown={onSearchSubmit}
        placeholder="Busca un personaje"
        type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"/>
</div>


<ul class="list-group-1 list-group list-group-flush">
{errorState.hasError && <div>{errorState.message}</div>}
        {people?.results?.map((character) => (
  <li key={character.name} onClick={() => showDetails(character)} class="list-group-item"><h4 className='personajes'>{character.name}</h4></li>
  ))}
  
</ul>
  


      <section className='botones'>
      <button class="btn btn-light" onClick={() => onChangePage(-1)}>Prev</button><h4 className='pagina'> {page} </h4> 
      <button class="btn btn-light" onClick={() => onChangePage(1)}>Next</button>
      </section>
      {details &&
      
      
      
      <aside>
        
        <h1 className='detalleNombre'>{details.name}</h1>
        <ul class="list-group-2 list-group list-group-flush">
  <li class="list-group-item"><b>Height: </b>{details.height}</li>
  <li class="list-group-item"><b>Mass: </b>{details.mass}</li>
  <li class="list-group-item"><b>Hair color: </b>{details.hair_color}</li>
  <li class="list-group-item"><b>Skin color: </b>{details.skin_color}</li>
  <li class="list-group-item"><b>Eye color: </b>{details.eye_color}</li>
  <li class="list-group-item"><b>Gender: </b>{details.gender}</li>


        </ul>
        
        
        
        
       
      </aside>}
      </div>
  );
}

export default App;
