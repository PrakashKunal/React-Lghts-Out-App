import React, {Component} from 'react'
import './Board.css'
import Cell from './Cell'

class Board extends Component
{
    constructor(props)
    {
        super(props);
        this.state={hasWon:false, board: this.getBoard()};
        this.getBoard=this.getBoard.bind(this);
    }
    static defaultProps={ 
        nrows:5,
        ncols:5,
        lightOnVar:0.3
    };
    getBoard()
    {
        var board=[];
        for(let i=0;i<this.props.nrows;i++)
        {
            var arr=[];
            for(let j=0;j<this.props.ncols;j++)
            {
                arr.push(Math.random()<this.props.lightOnVar? true : false );
            }
            board.push(arr);
        }
        return board;
    }
    
    flipCells(coor)
    {
        let {ncols, nrows} = this.props;
        let board = this.state.board;
        let [x,y] = coor.split("-").map(Number); 
        function flipCell(x,y)
        {
            if(x>=0 && x<nrows && y>=0 && y<ncols)
            {    
                    board[x][y]=!board[x][y];
            }
        }  
            flipCell(x,y);
            flipCell(x-1,y);
            flipCell(x+1,y);
            flipCell(x,y-1);
            flipCell(x,y+1);
        let c=0,isWon=false;
        for(let i=0;i<nrows;i++)
        {
            for(let j=0;j<ncols;j++)
            {
                if(board[i][j])
                ++c;
            }
        }
        if(c===0)
        isWon=true;
        this.setState({board:board,hasWon:isWon})
    }   
    render()
    {
        if(this.state.hasWon===true)
        return(<h1>Congratulations!! You have Won the Game</h1>)
        else{
        var tempBoard=[];
        for(let i=0;i<this.props.nrows;i++)
        {
            var arr=[];
            for(let j=0;j<this.props.ncols;j++)
            {
                let coor =`${i}-${j}`;
                arr.push(<Cell key={coor} isLightOn={this.state.board[i][j]} flipCells={()=>this.flipCells(coor)} />);}
                tempBoard.push(<tr>{arr}</tr>);
        }
        return(
        <div className='gameBoard'>
            <h1>LIGHTS OUT GAME</h1>
        <table>
            <tbody>
                {tempBoard}
            </tbody>
        </table>
        </div>
        )
        }
    }
}

export default Board