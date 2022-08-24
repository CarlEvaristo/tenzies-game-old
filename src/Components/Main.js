import React from "react"
import Dice from "./Dice"
import Confetti from 'react-confetti'

function Main(){
    const [turn, setTurn] = React.useState(0)
    const [isFinished, setIsFinished] = React.useState(false)
    const [diceValue, setDiceValue] = React.useState(0)
    const [allDice, setAllDice] = React.useState(newDiceArray())
    const [playerName, setName] = React.useState("")

    function newDiceArray() {
        return new Array(10).fill(null).map((item,index)=> ({id: index+1, value: getRandomDice(), isFinished: false}))
    }

    function newGame(){
        setAllDice(newDiceArray())
        setTurn(0)
        setDiceValue(0)
        setIsFinished(false)
        setName("")
    }

    function getRandomDice(){
        return (
            Math.floor(Math.random() * 6) + 1
        )
    }

    React.useEffect(()=>{
        let finishedArray = allDice.filter(item => item.isFinished)
        finishedArray.length === 1 && setDiceValue(finishedArray[0].value)
        finishedArray.length === 10 && setIsFinished(true)
    }, [allDice])


   function handleClick(index, value) {
        if (diceValue === 0) {
            setDiceValue(value)
        }
        if (diceValue === 0 || diceValue === value) {
            return setAllDice(prevDice => prevDice.map(dice => {
                return (dice.id === index) ? {...dice, isFinished:true} : dice
            }))
        } 
    }

    function handleThrow(){
        setTurn(prevValue => prevValue + 1)
        let finishedArray = allDice.filter(item => item.isFinished)
        if (finishedArray.length !== 0) {
            return setAllDice(prevDice => prevDice.map(dice => {
                return (dice.isFinished === false) ? {...dice, value: getRandomDice()} : dice
            }))
        }
    }

    const diceElements = allDice.map(dice => {
        return(
            <Dice 
                key={dice.id} 
                id={dice.id} 
                value={dice.value} 
                isFinished={dice.isFinished} 
                handleClick={handleClick}/>
        )
    })

    function handleSubmit(event) {
        event.preventDefault()
        console.log(playerName)
    }

    function handleChange(event) {
        event.preventDefault()
        const {name, value} = event.target
        setName(value)
    }

    return(
        <main>
            {isFinished && <Confetti />}
            <h1>Tenzies</h1>
            <p className="subText">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="diceContainer">
                {diceElements}
            </div>
            {isFinished ? 
                <>
                    <div className="inline"><p>Your Score: {turn} rolls</p><button onClick={newGame}>New Game</button></div>
                    <form className="inline" onSubmit={handleSubmit}>	
                        <input type="text" name="name" placeholder="Your Name" onChange={handleChange} />  
                        <button>Save Score</button>
                    </form>
                </> : 
                <button onClick={handleThrow}>Roll</button>}
            <p>High Score:</p>
            <ol className="highScore">
            </ol>
        </main>
    )
}

export default Main