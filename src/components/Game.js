import "./Game.css"

const Game = ( {verifyLetter} ) => {
  return (
    <div className="game">
        <p className="points">
            <span>Pontuação: 000</span>
        </p>
        <h1>Adivinhe a palavre</h1>
        <h3 className="tip" >Dica sobre a palavra: <span>Dica...</span></h3>
        <div className="wordContainer">
            <span className="letter">
                AA
            </span>
            <span className="blankSquare">

            </span>
            <div className="letterContainer">
                <p>Tente advinhar uma letra da palavra:</p>
                <form>
                    <input type="text" name="letter" maxLength="1" required />
                    <button>Jogar!</button>
                </form>
            </div>
            <div className="wrongLettersContainer">
                <p>Letras Já utilizadas:</p>
                <span>a, </span>
                <span>b, </span>
            </div>
        </div>
    </div>
  )
}

export default Game