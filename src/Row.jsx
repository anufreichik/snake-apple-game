import React from "react";
import Cell from "./Cell";

function Row(props) {
    return (
        <tr>
            {
                props.cells.map(el => <Cell key={Math.random()}
                                            cell={el}
                                            movecell={props.movecell}
                                            fieldwidth={props.fieldwidth}
                                            fieldheight={props.fieldheight}
                                            apple={props.apple}
                                            stopgame={props.stopgame}

                />)

            }
        </tr>
    )
}

export default Row;