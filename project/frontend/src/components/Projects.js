console.log("Projects.js carregado!");

import React, { useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  // Carrega os projetos do backend
  useEffect(() => {
    fetch("http://localhost:5000/projects")
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.log("Erro ao carregar projetos:", err));
  }, []);

  return (
    <div>
      <h2>Projetos</h2>
      <ul>
        {projects.map(p => (
          <li key={p._id}>
            <strong>{p.name}</strong> — {p.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
