import React, {useState} from "react";

function FieldSettings(props) {

    const [height, setHeight] = useState(5);
    const [width, setWidth] = useState(8);
    const [traceColor, setTraceColor] = useState('#28A745');

    const MIN = 3;
    const MAX = 10;

    // HANDLERS for TEXT BOXES or DROPDOWN*****************************************************************************
    const handleWidthChange = (event) => {
        let val = +event.target.value
        if (val < MIN) val = MIN;
        if (val > MAX) val = MAX;
        setWidth(val);
    }
    const handleHeightChange = (event) => {
        let val = +event.target.value
        if (val < MIN) val = MIN;
        if (val > MAX) val = MAX;
        setHeight(val);
    }
    const handleColorChange = (event) => {
        setTraceColor(event.target.value);
    }

    //ADD NEW FIELD/START GAME*****************************************************************************************
    const addNewField = () => {
        props.createfield(width, height, traceColor);
    }

    //STOP GAME********************************************************************************************************
    const StopGame = () => {
        props.stopgame();
    }

    return (
        // if field not created then display text boxes with properties for new field and button submit
        //otherwise show stop game button
        <div className='container app container-60'>
            {!props.fieldcreated &&
            <div className='row align-items-center'>
                <div className='col-sm col-space align-items-center'><label className='col-form-label-sm'>Field Columns </label> <input
                    className='form-control-sm'
                    onChange={handleWidthChange}
                    value={width} type='number'
                    min="3" max="10"/>
                </div>
                <div className='col-sm  col-space align-items-center'><label className='col-form-label-sm'>Field Rows </label> <input
                    className='form-control-sm'
                    onChange={handleHeightChange}
                    value={height} type='number'
                    min="3" max="10"/>
                </div>
                <div className='col-sm col-space align-items-center'><label className='col-form-label-sm'>Trace Color </label>
                    <select className='form-control-sm' name="colors" id="colors" value={traceColor}
                            onChange={handleColorChange}>
                        <option value="Purple">Purple</option>
                        <option value="#28A745">Green</option>
                        <option value="Pink">Pink</option>
                        <option value="LightBlue">Light Blue</option>
                    </select></div>
                <div className='col-sm col-space align-items-center'>
                    <button className='btn btn-success btn-sm btn-space' onClick={addNewField}>Start New Game</button>
                </div>
            </div>
            }
            {props.fieldcreated &&
            <div className='align-content-lg-center align-items-center' >
                <button className='btn btn-danger btn-sm btn-space' onClick={StopGame}>Stop Game/Start Over</button>
                <p>Click Up, Down, Left, Right buttons to reach apple.
                    If you wait more than 2 seconds it will auto move for you in random direction.</p>
            </div>
            }
        </div>

    )
}

export default FieldSettings;