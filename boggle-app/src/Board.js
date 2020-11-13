import React, {useState} from 'react'
import {Grid} from '@material-ui/core'
import {Button} from '@material-ui/core'
import Board from './Board.js'
import {Paper} from  '@material-ui/core'
import './Board.css';



function Starter({tableau}){
  //let grid=[["A", "B", "C"], ["D", "E", "F"], ["G", "H", "I"]];
    
    let grid= tableau;
    function printTile(id,letter){
        
        return(
            <Grid item key={id} xs={1}  >
                
                <Paper elevation={10} style={{color:"black"}, {backgroundColor: "white"}} >
                   {letter}  
                </Paper>    
                
                    
                    
                
                    
                
                
            </Grid>  
        );
        

    }
    function printRow(id, row){
        return(
            <Grid container justify="center" item  key={id} spacing={5} className="Tile" >
                {Object.keys(row).map((tile)=>{
                    return(
                        printTile((id+tile),row[tile])
                        
                    )
                }
                )}
            </Grid>
        )

    }
//<div className= "Board-div" ></div>
    function printGrid(grid){
        
         return(
        
         <Grid container justify= "center" spacing= {5}>
             {Object.keys(grid).map((rowKey)=>{
                 return(
                     printRow(rowKey,grid[rowKey])
                 );
                    
                 
             }

             )}
             
         </Grid>
         );
         
};
     

     return(
        <div className= "Board-div" >
        {printGrid(grid)}
        </div>
          
        
     )
}
 

 export  default Starter