import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const [editingProject, setEditingProject] = useState(null);

  // Função para buscar projetos do backend
  useEffect(() => {
    axios.get('http://localhost:5000/projects')
      .then(response => setProjects(response.data))
      .catch(error => console.error('Erro ao buscar serviços:', error));
  }, []);

  // Função para lidar com mudanças nos campos de formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prevState => ({ ...prevState, [name]: value }));
  };

  // Função para adicionar um novo projeto
  const handleAddProject = () => {
    if (!newProject.name || !newProject.description) {
      alert('Preencha todos os campos!');
      return;
    }
    axios.post('http://localhost:5000/projects', newProject)
      .then(response => {
        setProjects([...projects, { ...newProject, _id: response.data }]);
        setNewProject({ name: '', description: '' });
        scrollToSection('projectList');
      })
      .catch(error => console.error('Erro ao adicionar serviço:', error));
  };

  // Função para deletar um projeto
  const handleDeleteProject = (projectId) => {
    if (window.confirm('Tem certeza que deseja remover este serviço?')) {
      axios.delete(`http://localhost:5000/projects/${projectId}`)
        .then(response => {
          setProjects(projects.filter(project => project._id !== projectId));
        })
        .catch(error => console.error('Erro ao deletar serviço:', error));
    }
  };

  // Função para iniciar a edição de um projeto
  const handleEditProject = (project) => {
    setEditingProject(project._id);
    setNewProject({ name: project.name, description: project.description });
    scrollToSection(`updateProject_${project._id}`);
  };

  // Função para atualizar um projeto existente
  const handleUpdateProject = () => {
    axios.put(`http://localhost:5000/projects/${editingProject}`, newProject)
      .then(response => {
        setProjects(projects.map(project => (
          project._id === editingProject ? { ...project, ...newProject } : project
        )));
        setEditingProject(null);
        setNewProject({ name: '', description: '' });
      })
      .catch(error => console.error('Erro ao atualizar serviço:', error));
  };

  // Função para rolar a tela para uma seção específica
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#e8e8e8',
      fontFamily: 'Arial, sans-serif',
      margin: 0,
      padding: 0
    }}>
      {/* Header com Navegação */}
      <header style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #ddd',
        padding: '0',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
      }}>
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '15px 40px'
        }}>
          {/* Logo Esquerda */}
          <div style={{
            width: '80px',
            height: '80px',
            border: '3px solid #2d2d2d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.7em',
            fontWeight: 'bold',
            color: '#2d2d2d',
            textAlign: 'center',
            lineHeight: '1.2'
          }}>
            BARBEARIA<br/>DO OGRO
          </div>

          {/* Menu Central */}
          <div style={{ display: 'flex', gap: '0' }}>
            <NavButton onClick={() => scrollToSection('home')} active={false}>Home</NavButton>
            <NavButton onClick={() => scrollToSection('projectList')} active={true}>Serviços</NavButton>
            <NavButton onClick={() => scrollToSection('location')}>Localização</NavButton>
            <NavButton onClick={() => scrollToSection('contact')}>Contato</NavButton>
          </div>

          {/* Logo Direita - Ogro */}
          <div style={{
            width: '80px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3.5em'
          }}>
            🧌
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" style={{
        backgroundColor: '#e0e0e0',
        padding: '80px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1400px',
        margin: '0 auto',
        gap: '60px'
      }}>
        <div style={{ flex: 1 }}>
          <h1 style={{
            fontSize: '3.5em',
            fontWeight: 'bold',
            margin: '0 0 20px 0',
            color: '#2d2d2d'
          }}>
            Barbearia do Ogro
          </h1>
          <h2 style={{
            fontSize: '1.8em',
            fontWeight: 'bold',
            margin: '0 0 30px 0',
            color: '#2d2d2d'
          }}>
            Barbearia de verdade.
          </h2>
          <div style={{
            width: '100%',
            height: '120px',
            background: 'repeating-linear-gradient(0deg, transparent, transparent 8px, #c0c0c0 8px, #c0c0c0 10px)',
            marginBottom: '40px'
          }}></div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <button 
              onClick={() => scrollToSection('why')}
              style={{
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                padding: '15px 40px',
                fontSize: '1.1em',
                cursor: 'pointer',
                borderRadius: '30px',
                fontWeight: 'bold'
              }}
            >
              Expertise
            </button>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <img 
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80"
            alt="Interior da Barbearia do Ogro"
            style={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              borderRadius: '10px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}
          />
        </div>
      </section>

      {/* Why Section */}
      <section id="why" style={{
        backgroundColor: '#e8e8e8',
        padding: '80px 40px',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '2.5em',
          fontWeight: 'bold',
          marginBottom: '60px',
          color: '#2d2d2d'
        }}>
          Mas, por quê cortar com o Ogro?
        </h2>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '80px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <FeatureCard icon="📜" title="Certificados" />
          <FeatureCard icon="⭐" title="Avaliação" />
          <FeatureCard icon="🏪" title="Localização" />
        </div>
      </section>

      {/* Services Section */}
      <section id="projectList" style={{
        backgroundColor: '#e0e0e0',
        padding: '80px 40px',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '2.5em',
          fontWeight: 'bold',
          marginBottom: '60px',
          color: '#2d2d2d'
        }}>
          Nossos Serviços
        </h2>

        {projects.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: '#f5f5f5',
            borderRadius: '15px',
            border: '2px dashed #999',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <p style={{ fontSize: '1.2em', color: '#666' }}>
              Nenhum serviço cadastrado ainda.
            </p>
            <button 
              onClick={() => scrollToSection('addProject')}
              style={{
                marginTop: '20px',
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                padding: '12px 30px',
                fontSize: '1em',
                cursor: 'pointer',
                borderRadius: '25px',
                fontWeight: 'bold'
              }}
            >
              Adicionar Primeiro Serviço
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {projects.map((project, index) => (
              <ServiceCard 
                key={project._id}
                project={project}
                icon={index === 0 ? '✂️' : index === 1 ? '🧔' : '🪒'}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
                editingProject={editingProject}
                newProject={newProject}
                handleInputChange={handleInputChange}
                handleUpdateProject={handleUpdateProject}
              />
            ))}
          </div>
        )}
      </section>

      {/* Add Service Section */}
      <section id="addProject" style={{
        backgroundColor: '#e8e8e8',
        padding: '80px 40px'
      }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: '#fff',
          padding: '40px',
          borderRadius: '15px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '2em',
            fontWeight: 'bold',
            marginBottom: '30px',
            color: '#2d2d2d',
            textAlign: 'center'
          }}>
            Adicionar Novo Serviço
          </h2>

          <input
            type="text"
            name="name"
            value={newProject.name}
            onChange={handleInputChange}
            placeholder="Nome do Serviço"
            style={{
              width: '100%',
              padding: '15px',
              marginBottom: '20px',
              fontSize: '1em',
              border: '2px solid #ddd',
              borderRadius: '8px',
              boxSizing: 'border-box'
            }}
          />

          <textarea
            name="description"
            value={newProject.description}
            onChange={handleInputChange}
            placeholder="Descrição do Serviço"
            rows="4"
            style={{
              width: '100%',
              padding: '15px',
              marginBottom: '20px',
              fontSize: '1em',
              border: '2px solid #ddd',
              borderRadius: '8px',
              resize: 'vertical',
              boxSizing: 'border-box'
            }}
          />

          <button 
            onClick={handleAddProject}
            style={{
              width: '100%',
              backgroundColor: '#000',
              color: '#fff',
              border: 'none',
              padding: '15px',
              fontSize: '1.1em',
              cursor: 'pointer',
              borderRadius: '8px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#333'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#000'}
          >
            Adicionar Serviço
          </button>
        </div>
      </section>

      {/* Location Section with Google Maps */}
      <section id="location" style={{
        backgroundColor: '#e8e8e8',
        padding: '80px 40px'
      }}>
        <h2 style={{
          fontSize: '2.5em',
          fontWeight: 'bold',
          marginBottom: '40px',
          color: '#2d2d2d',
          textAlign: 'center'
        }}>
          📍 Nossa Localização
        </h2>
        
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          alignItems: 'center'
        }}>
          {/* Informações de Contato */}
          <div style={{
            backgroundColor: '#fff',
            padding: '40px',
            borderRadius: '15px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{
              fontSize: '1.8em',
              marginBottom: '20px',
              color: '#2d2d2d',
              fontWeight: 'bold'
            }}>
              Barbearia do Ogro
            </h3>
            <div style={{ fontSize: '1.1em', color: '#555', lineHeight: '2' }}>
              <p style={{ margin: '10px 0' }}>
                📍 <strong>Endereço:</strong><br/>
                Av. Atlântica, 1702 - Copacabana<br/>
                Rio de Janeiro - RJ, 22021-001
              </p>
              <p style={{ margin: '10px 0' }}>
                📞 <strong>Telefone:</strong> (21) 3333-4444
              </p>
              <p style={{ margin: '10px 0' }}>
                🕐 <strong>Horário:</strong><br/>
                Seg - Sex: 9h às 20h<br/>
                Sábado: 9h às 18h<br/>
                Domingo: Fechado
              </p>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div style={{
            borderRadius: '15px',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            height: '450px'
          }}>
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.1996573985244!2d-43.17644492378095!3d-22.96792683875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bd54f3e4e3d3d%3A0x7e1b4e4e4e4e4e4e!2sAv.%20Atl%C3%A2ntica%2C%201702%20-%20Copacabana%2C%20Rio%20de%20Janeiro%20-%20RJ!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
              title="Localização da Barbearia do Ogro"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{
        backgroundColor: '#e0e0e0',
        padding: '80px 40px',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '2.5em',
          fontWeight: 'bold',
          marginBottom: '40px',
          color: '#2d2d2d'
        }}>
          Quer cortar conosco?
        </h2>
        <button 
          onClick={() => window.open('https://wa.me/21994941502', '_blank')}
          style={{
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            padding: '18px 50px',
            fontSize: '1.2em',
            cursor: 'pointer',
            borderRadius: '30px',
            fontWeight: 'bold'
          }}
        >
          Fale com o Ogro!
        </button>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#f5f5f5',
        padding: '60px 40px',
        borderTop: '1px solid #ddd'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            border: '3px solid #2d2d2d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.7em',
            fontWeight: 'bold',
            color: '#2d2d2d',
            textAlign: 'center',
            lineHeight: '1.2'
          }}>
            BARBEARIA<br/>DO OGRO
          </div>
          <div style={{ display: 'flex', gap: '100px' }}>
            <FooterMenu />
            <FooterMenu />
            <FooterMenu />
          </div>
        </div>
      </footer>
    </div>
  );
}

// Componente NavButton
const NavButton = ({ children, onClick, active }) => (
  <button
    onClick={onClick}
    style={{
      backgroundColor: 'transparent',
      border: 'none',
      borderRight: '1px solid #ddd',
      padding: '10px 40px',
      fontSize: '1.1em',
      cursor: 'pointer',
      color: active ? '#000' : '#666',
      fontWeight: active ? 'bold' : 'normal',
      transition: 'all 0.3s'
    }}
  >
    {children}
  </button>
);

// Componente FeatureCard
const FeatureCard = ({ icon, title }) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{
      width: '120px',
      height: '120px',
      margin: '0 auto 20px auto',
      backgroundColor: '#fff',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '3em',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      {icon}
    </div>
    <h3 style={{
      fontSize: '1.3em',
      fontWeight: 'bold',
      color: '#2d2d2d'
    }}>
      {title}
    </h3>
  </div>
);

// Componente ServiceCard
const ServiceCard = ({ project, icon, onEdit, onDelete, editingProject, newProject, handleInputChange, handleUpdateProject }) => (
  <div style={{
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.15)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
  }}
  >
    <div style={{ fontSize: '4em', marginBottom: '20px' }}>{icon}</div>
    <h3 style={{
      fontSize: '1.5em',
      fontWeight: 'bold',
      marginBottom: '15px',
      color: '#2d2d2d'
    }}>
      {project.name}
    </h3>
    <div style={{
      height: '80px',
      marginBottom: '20px',
      color: '#666',
      fontSize: '1em',
      lineHeight: '1.6'
    }}>
      {project.description}
    </div>
    
    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
      <button 
        onClick={() => onEdit(project)}
        style={{
          flex: 1,
          backgroundColor: '#000',
          color: '#fff',
          border: 'none',
          padding: '10px',
          fontSize: '0.9em',
          cursor: 'pointer',
          borderRadius: '6px',
          fontWeight: 'bold'
        }}
      >
        Editar
      </button>
      <button 
        onClick={() => onDelete(project._id)}
        style={{
          flex: 1,
          backgroundColor: '#dc3545',
          color: '#fff',
          border: 'none',
          padding: '10px',
          fontSize: '0.9em',
          cursor: 'pointer',
          borderRadius: '6px',
          fontWeight: 'bold'
        }}
      >
        Remover
      </button>
    </div>

    {editingProject === project._id && (
      <div id={`updateProject_${project._id}`} style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        border: '2px solid #ddd'
      }}>
        <h4 style={{ marginBottom: '15px', color: '#2d2d2d' }}>Editar Serviço</h4>
        <input
          type="text"
          name="name"
          value={newProject.name}
          onChange={handleInputChange}
          placeholder="Nome do Serviço"
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            boxSizing: 'border-box'
          }}
        />
        <textarea
          name="description"
          value={newProject.description}
          onChange={handleInputChange}
          placeholder="Descrição"
          rows="3"
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            resize: 'vertical',
            boxSizing: 'border-box'
          }}
        />
        <button 
          onClick={handleUpdateProject}
          style={{
            width: '100%',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            padding: '10px',
            fontSize: '1em',
            cursor: 'pointer',
            borderRadius: '6px',
            fontWeight: 'bold'
          }}
        >
          Salvar Alterações
        </button>
      </div>
    )}
  </div>
);

// Componente FooterMenu
const FooterMenu = () => (
  <div>
    <h4 style={{
      fontSize: '1.2em',
      fontWeight: 'bold',
      marginBottom: '15px',
      color: '#2d2d2d'
    }}>
      Menu
    </h4>
  </div>
);

export default App;