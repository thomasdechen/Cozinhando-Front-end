import { useState, useMemo } from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Card } from './components/card/card';
import { FoodData } from './interface/FoodData';
import { useFoodData } from './hooks/useFoodData';
import { CreateModal } from './components/create-modal/create-modal';
import { CreateModalContent } from './components/create-modal/CreateModalContent';

//Importação de imagens
import logoImage from './img/logo cozinhando.png';
import arrowImage from './img/Orange Arrow.png';
import socialImage from './img/Social Media.png';

function App() {
  const { data } = useFoodData(); // Puxa os dados da API

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showMyRecipes, setShowMyRecipes] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<FoodData | null>(null);

  const sortedData = data?.sort((a, b) => b.likes - a.likes) || [];
  const limitedData = sortedData.slice(0, 6);

  const sortedDataByDate = data?.sort((a, b) => new Date(b.date) - new Date(a.date)) || [];
  const limitedDataByDate = sortedDataByDate.slice(0, 6);

  // Função para filtrar as receitas pelo nome
  const filteredDataByName = useMemo(() => { //React Hook para armazenar em cache o resultado de um cálculo
    return data?.filter(foodData =>
      foodData.title.toLowerCase().includes(searchValue.toLowerCase())
    ) || [];
  }, [data, searchValue]);

  const limitedFilteredDataByName = filteredDataByName.slice(0, 12);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (searchValue.trim() === '') {
      setIsFocused(false);
    }
  };

  const handleCardClick = (foodData: FoodData) => {
    setSelectedRecipe(foodData);
    handleOpenModal();
  };

  const handleCardClick2 = () => {
    setSelectedRecipe({
      id: 0,
      likes: 0, 
      title: 'Exemplo de Título',
      image: 'URL da Imagem',
      category: 'Exemplo de Categoria',
      recipe: 'Aqui vai a receita...',
    });
    handleOpenModal();
  };


  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
    <Router>
      <div className="container">
        <header>
          <section className="logo">
            <a href="#" onClick={() => setShowMyRecipes(false)}><img src={logoImage} alt="logo" /></a>
          </section>
          <section className="nav-items">
            <ul>
              <li className="dropdown">
              <a href="#" onClick={() => setShowMyRecipes(false)}>REFEIÇÕES</a>
                <ul className="dropdown-menu">
                  <li><Link to="/almoco">Almoço</Link></li>
                  <li><Link to="/jantar">Jantar</Link></li>
                  <li><Link to="/sobremesa">Sobremesa</Link></li>
                </ul>
              </li>
              {/* Adicione a nova rota "Minhas Receitas" */}
              <li><a href="#" onClick={() => setShowMyRecipes(true)}>MINHAS RECEITAS</a></li>
              {isModalOpen && <CreateModal closeModal={handleOpenModal}/>}
              <li><a href="#" onClick={handleOpenModal} >CRIAR RECEITA</a></li>
              <li><a href="#">LOGIN</a></li>
            </ul>
          </section>
        </header>
  
        <section id='search' className={`search-bar ${isFocused ? 'focused' : ''}`}>
          <input
            type="text"
            placeholder="Qual receita você está procurando?"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </section>
  
        <section className="cards">
          {searchValue.trim() === '' && !showMyRecipes && (
            <>
              <div id='bestRecipes'>
                <h1>As melhores receitas</h1>
                <br />
                <img src={arrowImage} alt="seta"/>
              </div>
              <div className="card-grid">
                {limitedData.map(foodData =>  // Pega os objetos que estão dentro do data
                  <Card // Retorna um card para cada um do objetos do data
                    key={foodData.id}
                    category={foodData.category}
                    title={foodData.title}
                    image={foodData.image}
                    likes={foodData.likes}
                    date={foodData.date}
                    recipe={foodData.recipe}
                    onClick={() => handleCardClick2()}
                  />
                )}
              </div>
  
              <div id='bestRecipes'>
                <h1>O que há de novo</h1>
                <br />
                <img src={arrowImage} alt="seta"/>
              </div>
              <div className="card-grid">
                {limitedDataByDate.map(foodData => 
                  <Card
                    key={foodData.id}
                    category={foodData.category}
                    title={foodData.title}
                    image={foodData.image}
                    likes={foodData.likes}
                    date={foodData.date}
                    recipe={foodData.recipe}
                    onClick={() => handleCardClick2()}
                  />
                )}
              </div>
            </>
          )}
  
          {searchValue.trim() !== '' && limitedFilteredDataByName.length > 0 && (
            <div id='searchResults'>
              <h1>Resultados da Pesquisa</h1>
              <br />
              <div className="card-grid">
                {limitedFilteredDataByName.map(foodData => 
                  <Card
                    key={foodData.id}
                    category={foodData.category}
                    title={foodData.title}
                    image={foodData.image}
                    likes={foodData.likes}
                    date={foodData.date}
                    recipe={foodData.recipe}
                    onClick={() => handleCardClick2()}
                  />
                )}
              </div>
            </div>
          )}

          {showMyRecipes && (
            <div id="myRecipes">
              <h1>Minhas Receitas</h1>
              <br />
              <div className="card-grid">
                {data.map((foodData) => (
                  <Card
                    key={foodData.id}
                    category={foodData.category}
                    title={foodData.title}
                    image={foodData.image}
                    likes={foodData.likes}
                    date={foodData.date}
                    recipe={foodData.recipe}
                    onClick={() => handleCardClick2()}
                  />
                ))}
              </div>
            </div>
          )}    

        </section>
  
        <footer>
          <section className='line1'>
            <a href="#"><img className='logo-footer' src={logoImage} alt="logo" /></a>
            <p>Siga nossas redes sociais</p>
            <a href="#"><img className='social-footer'  src={socialImage} alt="redes-sociais" /></a>
          </section>
            
          <section className='line2'>
            <ul>
              <a href="#"><li>Refeições</li></a>
              <a href="#"><li>Minhas receitas</li></a>
              <a href="#"><li>Criar receita</li></a>
            </ul>
          </section>
  
          <section className='line3'>
            <ul>
              <a href="#"><li>Sobre nós</li></a>
              <a href="#"><li>Contato</li></a>
            </ul>
          </section>
        </footer>
      </div>
    </Router>
  );
}  

export default App