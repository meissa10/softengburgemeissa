/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */


  
  
  
  ////////////////////////////////////////////////////////////////////////
  
  var TrieNode = function(value) {
    this.value=value;
    this.children = [];
    this.isWord = false;
  };
  
  //////////////////////////////////////////////////////////////////////////////
  
  
  var MakeTrie = function(dict) {
    var root = new TrieNode('');
    
    if(dict.length===0){
      return;
    }
  
    //for  each words in dict 
    for(let words of dict){
      var node = root;
      //for each letter in the word
      for(let  i =0;i<words.length;++i){
        var letter = words[i];
        var ord  = letter.charCodeAt(0) - 97;
        //if a node with that  letter doesnt exist:
        var curNode = node.children[ord];
        if(node.children[ord]=== undefined){
          //create one
          
          curNode = new TrieNode(letter);
          node.children[ord]=curNode;
          
          
  
        
        }
        
        //if it does, go to the next node or if it isthe last one make it true
        node=curNode;
        
        
      }
      node.isWord=true; 
      
    }
    return root;
  };
  
  
  //////////////////////////////////////////////////////////////////////////////
  
  
  
  
  let findwords=function(word,x,y,grid,visited,trie,solutionset){
    //let triee  = MakeTrie(dictionary);
    
    
    
    let adjacentMatrix =[[0,1],[1,0],[0,-1],[-1,0],[1,1],[-1,1],[1,-1],[-1,-1]];
    
    
    //Base case:
    //b1:  if x  and y are out of bound
    //b2  already visited y and x
    //-->return immediatly
    
    if(y<0 || x<0 || y>=grid.length || x >=grid.length || visited[x][y]===true){
      return;
    }
    
    
    
    //append grid[x][y] to the word
    
    word +=  grid[x][y];
    
    //console.log("Cur word ="+word+"  Grid["+x+"]["+y+"]="+grid[x][y]);
    //1. check if  that word  is a prefix for  any word in the trie
    if(isprefix(word,trie)){
       visited[x][y]=true;
      //1.a. check if that prefix  is an actual word in the dictionnary
        if (isword(word,trie)){
          
          
          //1.b if true -->  add word to solutionsset and check if the length of the word is at least 3
          
          if(word.length>2){
            //console.log(word)
            solutionset.add(word);
          }
     
        }
      
  
    //2.keep searching using the adjacent tiles --> call findword
         
    
    for(let i=0;i<8;i++){
      findwords(word,x+adjacentMatrix[i][0],y+adjacentMatrix[i][1],grid,visited,trie,solutionset)
      
      
    }
    
  }
    //3.if false-->  keep searching using the  adjacent tiles
    
    visited[x][y]=false
    
       
       
     }
  
  
  
  ////////////////////////////////////////////////////////////////////
  
  let isprefix= function(word,trie){
    /*//console.log(trie);
    for(let tword of trie){
      if(tword.substr(0,word.length)==word){
        //console.log(tword.substr(0,word.length))
        return true
      }
    }
    
    return false;*/
    let subword=''
    
    let curNode=trie;
    
    for(let i =0;i<word.length;i++){
      
      if(curNode!==undefined){
        
        for(let node of curNode.children){
          
          if(node!==undefined && node.value===word[i]){
            subword+=word[i];
            curNode=node;
            break;
          }
        }
      }
    }
    if(word===subword){
      
      return true;
    }
    
     return false;
    
  }
  
  let isword= function(word,trie){
    //check if each char in word is in trie
    //for each char in word
    
    let subword=''
    let curNode=trie;
    
    for(let i =0;i<word.length;i++){
      
      if(curNode!==undefined){
        
        for(let node of curNode.children){
          
          if(node!==undefined && node.value===word[i]){
            subword+=word[i];
            curNode=node;
            break;
          }
        }
      }
    }
    if(word===subword && curNode.isWord===true){
      
      return true;
    }
    
     return false;
    
    
    
    
  }
  
  ////////////////////////////////////////////////////////////////////
  
  let converttolowercase = function(grid){
    for(let i=0;i<grid.length;i++){
      for(let j=0;j<grid.length;j++){
        if(grid[i][j]){
          grid[i][j]= grid[i][j].toLowerCase();
        }
        
      }
      
    }
    
    /*for(let j=0;j<dict.length;j++){
        dict[j]=dict[j].toLowerCase();
      }*/
    
    
    
    
  }
  
  ////////////////////////////////////////////////////////////////////
  function findAllSolutions (grid, dictionary) {
    let solutions = [];
     
     converttolowercase(grid);
     //alert(dictionary);
     let trie  = MakeTrie(dictionary);
     
     
  //1.  Check  inputs params(return [] if correct)
  
    //1a.  Check if  any empty  input
    if(grid === null || dictionary === null){
      return solutions;
    }
  
  
    //1b.  Check if NXN
    let N = grid.length;
     
     
    if(N===0){
      return solutions;
      
    }
   
    for(let  i=0; i<N;i++){
      if(grid[i].length!== N ){
        return solutions;
      }
    }
  
    //Convert inputs data into same case
    //Setup any  Data  structures(Visited, solutions,dictionnary(Trie|Hash|List|Set))
    
     
     //let trie=new Set(dictionary);
     
     
     
     
    let solutionset=new  Set();
    //iterate over NxN grid -  find all words that  begin with grid  [y] [x]
  
     
     for(let y= 0; y<N ; y++){
       for(let x= 0; x<N ; x++){
         
         
         let word= "";
         
         let visited = new Array(N).fill(false).map(() => new Array(N).fill(false));
         
         findwords(word,x,y,grid,visited,trie,solutionset);
         
         
         
         
       }
     }
     
     
     
     
     
     
     
    solutions= Array.from(solutionset)
    
    return solutions;
  }
  ////////////////////////////////////////////////////

  export default findAllSolutions;