import React, {useEffect} from "react";
import apple from './apple.png';
import snake from './snake.png';
function Cell(props) {

    //variable to determine if cell is apple cell matched
    const applecell = (props.cell.rowindex === props.apple.rowindex && props.cell.cellindex === props.apple.cellindex);

    //use effect to check if active cell in apple cell and end game
    useEffect(() => {
        if (props.cell.active && (props.cell.rowindex === props.apple.rowindex && props.cell.cellindex === props.apple.cellindex))
            props.stopgame();
    }, [applecell]);

    return (

        <td>
            <div className='celldiv'>
                {
                    props.cell.active && !applecell &&
                    <div>
                        <table className="activecelltable">
                            <tbody>
                            <tr>
                                <td>&nbsp;</td>
                                <td>
                                    <button disabled={props.cell.rowindex === 0}
                                            onClick={() => props.movecell('UP', props.cell.rowindex, props.cell.cellindex)}>↑
                                    </button>
                                </td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>
                                    <button disabled={props.cell.cellindex === 0}
                                            onClick={() => props.movecell('LEFT', props.cell.rowindex, props.cell.cellindex)}>←
                                    </button>
                                </td>
                                <td><img src={snake} alt="snake"/></td>
                                <td>
                                    <button disabled={props.cell.cellindex === props.fieldwidth - 1}
                                            onClick={() => props.movecell('RIGHT', props.cell.rowindex, props.cell.cellindex)}>→
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>
                                    <button disabled={props.cell.rowindex === props.fieldheight - 1}
                                            onClick={() => props.movecell('DOWN', props.cell.rowindex, props.cell.cellindex)}>↓
                                    </button>
                                </td>
                                <td>&nbsp;</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                }
                {
                    !props.cell.active && !applecell &&
                    <div className='celldiv' style={{background: props.cell.color}}>&nbsp;</div>
                }
                {
                    !props.cell.active && applecell &&
                    <div><img src={apple} alt="apple"/></div>
                }
            </div>
        </td>
    )
}

export default Cell;