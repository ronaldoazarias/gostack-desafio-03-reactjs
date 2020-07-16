import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  const getRepositories = () => {
    api.get('repositories').then(response =>{
      setRepositories(response.data);
    });
  }

  useEffect(()=>{
    getRepositories();
  }, []);  

  async function handleAddRepository() {
    let newRepository = {
      "title": "Front End ReactJS",
      "url": "Ronaldo",
      "techs": [
        "Node.js",
        "PHP",
        "React"
      ]     
    }

    const response = await api.post('repositories', newRepository);

    if (response.status === 200) {
      //alert ('Repository added sucessfully!');
      setRepositories([... repositories, newRepository]);
    }

  }

  async function handleRemoveRepository(id, k) {
    const response = await api.delete(`repositories/${id}`);
    if (response.status === 204) {
      let repositoriesTmp = repositories;
      //const repositoryIndex = repositoriesTmp.findIndex(repository => repository.id === id);
      //repositoriesTmp.splice(repositoryIndex, 1);
      repositoriesTmp.splice(k, 1);
      setRepositories([... repositoriesTmp]);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository, k) => (
          <li key={k}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id, k)}>
              Remover
            </button>
          </li>))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
