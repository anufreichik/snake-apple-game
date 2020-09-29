import React, {useState, useEffect} from 'react';
import './App.css';
import {v4 as uuidv4} from 'uuid';
import Row from "./Row";
import FieldSettings from "./FieldSettings";

function App() {

    //VARIABLE DECLARATION*********************************************************************************************
    const [field, setField] = useState([]); //field variable
    const [traceColor, setTraceColor] = useState('#28A745');//trace color variable to paint cells
    const [seconds, setSeconds] = useState(0);//timer seconds variable
    const [isTimerActive, setIsTimerActive] = useState(false); //timer active variable used for  timer
    const [currentActiveCell, setCurrentActiveCell] = useState(); //saving current active cell that buttons on
    const [fieldCreated, setfieldCreated] = useState(false);
    const [apple, setApple] = useState({rowindex: 0, cellindex: 0});//apple position on field
    const directions = ['UP', 'DOWN', 'LEFT', 'RIGHT']; //directions of movements used


    //TIMER************************************************************************************************************
    useEffect(() => {
        //RANDOM MOVE CELL
        const doRandomMove = () => {
            //get random move direction
            const randomDir = directions[Math.floor(Math.random() * 4)];
            console.log('random move', randomDir);
            if (randomDir === 'DOWN' && currentActiveCell.rowindex < field.length - 1)
                moveCell('DOWN', currentActiveCell.rowindex, currentActiveCell.cellindex);
            else if (randomDir === 'UP' && currentActiveCell.rowindex > 0)
                moveCell('UP', currentActiveCell.rowindex, currentActiveCell.cellindex);
            else if (randomDir === 'LEFT' && currentActiveCell.cellindex > 0)
                moveCell('LEFT', currentActiveCell.rowindex, currentActiveCell.cellindex);
            else if (randomDir === 'RIGHT' && currentActiveCell.cellindex < field[0].length - 1)
                moveCell('RIGHT', currentActiveCell.rowindex, currentActiveCell.cellindex);
        }

        let interval = null;
        if (isTimerActive) {
            interval = setInterval(() => {
                //every two seconds check if random move needs to be done
                if (seconds > 0 && seconds % 2 === 0) doRandomMove();
                setSeconds(seconds => seconds + 1);
            }, 2000);
        } else if (!isTimerActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isTimerActive, seconds, currentActiveCell, field]);


    //RESET SECONDS to 0 on end of the game****************************************************************************
    const resetSeconds = () => {
        setSeconds(0);
    }

//CREATE NEW FIELD and START NEW GAME**********************************************************************************
    const CreateField = (w, h, color) => {
        const newField = [];
        for (let i = 0; i < h; i++) {
            const row = [];
            for (let j = 0; j < w; j++) {
                row.push({id: uuidv4(), rowindex: i, cellindex: j, color: 'White', active: false});
            }
            newField.push(row);
        }
        //init active cell to be the left conner cell

        const centerW = Math.floor(w/2);
        const centerH = Math.floor(h/2);
        newField[centerH][centerW].active = true;
        setCurrentActiveCell({...currentActiveCell,rowindex: centerH, cellindex: centerW});
        setField(newField);
        setTraceColor(color);
        setIsTimerActive(true);
        const randomApplePosition={rowindex:Math.floor(Math.random() * (h-1)), cellindex:Math.floor(Math.random() * (w-1))}
        //setApple({rowindex: newField.length - 1, cellindex: newField[0].length - 1});
        setApple(randomApplePosition);
        setfieldCreated(true);

    }
    //CLEAR FIELD and STOP GAME****************************************************************************************
    const StopGame = () => {
        setField([]);
        setIsTimerActive(false);
        setSeconds(0);
        setCurrentActiveCell({rowindex: 0, cellindex: 0});
        setApple({rowindex: 0, cellindex: 0});
        setfieldCreated(false);
    }


    //MOVE CELL********************************************************************************************************
    const moveCell = (direction, rowindex, cellindex) => {
        const newField = [...field];
        //set current cell not active anymore
        newField[rowindex][cellindex].active = false;
        newField[rowindex][cellindex].color = traceColor;
        switch (direction) {
            case 'UP':
                newField[rowindex - 1][cellindex].active = true;
                setCurrentActiveCell({rowindex: rowindex - 1, cellindex: cellindex})
                break;
            case'DOWN':
                newField[rowindex + 1][cellindex].active = true;
                setCurrentActiveCell({rowindex: rowindex + 1, cellindex: cellindex})
                break;
            case 'LEFT':
                newField[rowindex][cellindex - 1].active = true;
                setCurrentActiveCell({rowindex: rowindex, cellindex: cellindex - 1})
                break;
            case 'RIGHT':
                newField[rowindex][cellindex + 1].active = true;
                setCurrentActiveCell({rowindex: rowindex, cellindex: cellindex + 1})
                break;
            default:
        }
        setField(newField);
        resetSeconds();
    }

    return (
        <div className="App">
            <FieldSettings createfield={CreateField}
                           stopgame={StopGame}
                           fieldcreated={fieldCreated}
            />
            <hr/>
            <table>
                <tbody>
                {
                    field.map(el => <Row key={Math.random()}
                                         cells={el}
                                         movecell={moveCell}
                                         fieldheight={field.length}
                                         fieldwidth={field[0].length}
                                         apple={apple}
                                         stopgame={StopGame}
                    />)
                }
                </tbody>
            </table>
        </div>
    );
}

export default App;
