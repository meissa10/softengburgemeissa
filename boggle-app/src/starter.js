import React, {useState} from 'react'
import Board from './Board.js'
import {Paper} from  '@material-ui/core'
import grid from './gridGen.js'



function Starter(){
    
     
    return(
            <Board tableau={grid}/>
    )
}
 

 export  default Starter