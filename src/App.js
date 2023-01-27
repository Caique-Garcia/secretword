
//css
import './App.css';

//react
import {useCallback, useEffect, useState} from 'react';

//data
import {wordsList} from './data/words';

//components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

//stagios do game
const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"}
];


function App() {

  //Setando estagio inicial do jogo na variavel
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [pickedLetter, setPickedCLetter] = useState("");

  const pickWordAndCategory = () =>
  {
    // Pick a random category
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];
    
        
    //Pick a ramdom word
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    
    //retornando um objeto com duas variaveis
    return {word, category};

  }

  
  
  //start the game
  const startGame = () => 
  {
    //selecionando variaveis do retorno da função
    const {word, category} = pickWordAndCategory();    
    setGameStage(stages[1].name)
    console.log(word, category);

    //create array of latters
    let wordLetters = word.split("");
    //transformando o array de letras em letras minusculas
    wordLetters = wordLetters.map((l) => l.toLowerCase());
    console.log(wordLetters);

    //fill states
    setPickedWord(word)
    setPickedCategory(category)
    setPickedCLetter(wordLetters)

  };

  //processando letra do input
  const verifyLetter = () =>
  {
    setGameStage(stages[2].name)
  };

  //recomeçando o jogo
  const retry = () => 
  {
    setGameStage(stages[0].name)
  };

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter} /> }
      {gameStage === 'end' &&  <GameOver retry={retry} /> }
      
    </div>
  );
}

export default App;
