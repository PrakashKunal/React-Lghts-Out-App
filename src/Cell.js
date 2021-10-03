import React, {Component} from 'react';
import './Cell.css';
class Cell extends Component
{
    constructor(props)
    {
        super(props);
        this.clickHandler=this.clickHandler.bind(this);
    }
    clickHandler(evt)
    {
        this.props.flipCells();
    }
    render()
    { 
        var classname='Cell '+(this.props.isLightOn ? " LightOn" : "")
        return(
            <td onClick={this.clickHandler} className={classname}/>
        )
    }
}

export default Cell