import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button'
import  Starter from './starter.js'
import grid from './gridGen.js'
import Solutions from './solver.js'
import { TextField } from '@material-ui/core';
import english_dic from './full-wordlist'
import LogInButton from  './login_button.js'
import TextInput from './CreateAccount.js'
import UserResponses from './UserResponse.js'

function App() {
  const GAME_STATE = {
    BEFORE: 'before',
    IN_PROGRESS: 'in_progress',
    ENDED: 'ended',
    
  }
const  [user,setUser]=useState(null);
let dictionnary= english_dic;
let Allsolutions  = Solutions(grid, dictionnary);

let [actual_state, setState]= useState(GAME_STATE.BEFORE);
let [label_sign, setLabel]= useState("Make a guess");
let [Foundsolutions,setFoundsolutions]= useState([]);
let [buttonText, setButton]= useState("Start New Game");
let [input,setInput]=  useState("");
let [ShowleaderBoard, setShowLeaderBoard]= useState(false);
  


function addInput(list_of_found_solutions, all_the_solutions, word_to_be_added){
  //alert(all_the_solutions);
  //alert(list_of_found_solutions);
  //alert(word_to_be_added);
  if(all_the_solutions.includes(word_to_be_added)){
    
    if(list_of_found_solutions.includes(word_to_be_added)){
      setLabel("Word already found");
    }

    else{
      setLabel(input + " is CORRECT !!!");
      list_of_found_solutions.push(word_to_be_added);

    }
    

  }
  

  else{
    setLabel(input +" is Incorrect :(");
  }






}
function update_state(){
   
    
    //alert(dictionnary);
    if(actual_state == GAME_STATE.BEFORE){
      setState(GAME_STATE.IN_PROGRESS);
      setButton("End Game");
    }
    else if(actual_state == GAME_STATE.IN_PROGRESS){
      setState(GAME_STATE.ENDED);
      setButton("Start a New Game");
      setLabel("Make a Guess");

    }
    else{
      setState(GAME_STATE.IN_PROGRESS);
      setButton("End Game");
      setFoundsolutions([]);
    }
    
    
    
}

function key_press(e){
  if(e.key==='Enter'){
    //alert(Allsolutions)
    //alert(input);
    
    addInput(Foundsolutions, Allsolutions, input)
    e.target.value="";

  }

}

  
    
  return (
    <div className="App">
      <header className="App-header">
        {actual_state===GAME_STATE.BEFORE &&
        <div  >
          <h2 >
          Welcome to my Boggle
        </h2>
        {user ==  null&& 
        <h2 >
          <p>
            Leaderboard:
          </p>
          <UserResponses />

        <LogInButton setUser ={(user) => setUser(user)}/>
        { user !==  null&&  
            <p >
              {user.displayName}
            </p>
          }
      </h2>

        }
        



        </div>
        
        
        }
        
        
        
        
        { user !==null &&
        <p >
          Player: {user.displayName}
        </p>
          
        }
        
        <div >
          <p > 
          <Button onClick={()=>update_state()} style={{backgroundColor:"beige"}} >
            {buttonText}
            
          </Button>
          </p>

          {(actual_state === GAME_STATE.IN_PROGRESS ) &&
          <div >
            

          <p >



            <Starter/>

            
          </p>

          <p >
            {label_sign}
          </p>

          <p >
            

            

            <TextField onKeyPress={(e)=>key_press(e)} onChange={(event) => setInput(event.target.value)}/>
          </p>

          <p >
            <h4  >
              Solutions you found:
            </h4>

            {Object.keys(Foundsolutions).map((wordFound) =>{
              return(
                <div >
                  <ul >
                    {Foundsolutions[wordFound]}
                  </ul>
                </div>
              )
            }

            
            )}
             
          </p>

          </div>
        
             
            
            
            
          

          }
          {(actual_state === GAME_STATE.ENDED ) &&
          
          
          <p >
            
            <Starter/>
            < TextInput score ={Foundsolutions.length} user={user}/>
            <h5 >
                  List of all solutions: 
            </h5>
            {Object.keys(Allsolutions).map((words)=>{
              return( 
                <div >
                  <ul >
                    {Allsolutions[words]}
                  </ul>
                </div>
    
              )
            }
            )}
            
          

            </p>
          


          }
        </div>
        
        
        
          
          
        
    </header>  
    </div>
  );
}

export default App;
