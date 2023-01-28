
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
  const [letters, setPickedCLetter] = useState([]);
  
  const guessesQty = 3;

  const [guessedLetters,setGuessdLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesQty)
  const [score, setScore] = useState(0)

  

  const pickWordAndCategory = useCallback(() =>
  {
    // Pick a random category
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];
    
        
    //Pick a ramdom word
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    
    //retornando um objeto com duas variaveis
    return {word, category};

  }, [words]);

  
  
  //start the game
  const startGame = useCallback(() => 
  {
    //clear all letters
    clearLetterState();

    //selecionando variaveis do retorno da função
    const {word, category} = pickWordAndCategory();    
    setGameStage(stages[1].name);
    

    //create array of latters
    let wordLetters = word.split("");
    //transformando o array de letras em letras minusculas
    wordLetters = wordLetters.map((l) => l.toLowerCase());
   
    //fill states
    setPickedWord(word);
    setPickedCategory(category);
    setPickedCLetter(wordLetters);

  }, [pickWordAndCategory]);

  //processando letra do input
  const verifyLetter = (letter) =>
  {
    //standardizing the letter
    const normalizedLetter = letter.toLowerCase();

    //check if the letter has already been used
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return
    };

    //push guessed letter or remove a chance
    if(letters.includes(normalizedLetter)){

      setGuessdLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ]);

    } else {

      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ]);

      setGuesses((actualGesses) => actualGesses - 1);

    }
    
  };
  const clearLetterState = () =>
  {
    setGuessdLetters([]);
    setWrongLetters([]);
  }


  //check attempts
  //useEffetct monitorando o estatus da variavel gesses
  useEffect(() => {
    if(guesses <= 0){
      //reset all states
      clearLetterState()

      setGameStage(stages[2].name);
    }
  }, [guesses])

  //check win condicion
  useEffect(() => {
    //criando array uniqueLetters com apenas letras unicas basiado no arrau letters
    const uniqueLetters = [...new Set(letters)];

    //win condicion
    //comparando tamanho de array de letras acertadas com array de letras unicas 
    if(guessedLetters.length === uniqueLetters.length){
      //add score
      setScore((actualScore) => (actualScore += 100));

      //restar game with new word
      startGame();

    }

  }, [guessedLetters, letters, startGame]);
  
  
  //recomeçando o jogo
  const retry = () => 
  {
    setScore(0);
    setGuesses(guessesQty);
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <Game 
       verifyLetter={verifyLetter}
       pickedWord={pickedWord}
       pickedCategory={pickedCategory}
       letters={letters}
       guessedLetters={guessedLetters}
       wrongLetters={wrongLetters}
       guesses={guesses}
       score={score} /> }
      {gameStage === 'end' &&  <GameOver retry={retry} score={score} /> }
      
    </div>
  );
}

export default App;
