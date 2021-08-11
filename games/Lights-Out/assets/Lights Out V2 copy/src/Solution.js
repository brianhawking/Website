class Solution {

    constructor(size, currentState) {
        this.matrix = [];
        this.currentState = currentState;
        this.size = size;
        // create giant matrix
        this.index = 0;
        
    //    0 // 1 1 0 1 0 0 0 0 0 
    //    1 // 1 1 1 0 1 0 0 0 0
    //    2 // 0 1 0 0 0 1 0 0 0
        
        for(var i = 0; i < size*size; i++){
            this.matrix[i] = [];
            for(var j = 0; j < size*size; j++){
                this.matrix[i][j] = 0;
            }
        }
        
        var jRow = 0;
        var indexRow = 0;
        for(var index = 0; index < (size*size); index++){
            
            indexRow = Math.floor(index/size);
            
            for(var j = 0; j<(size*size); j++){
                jRow = Math.floor(j/size);
                
                if(index == j){
                    this.matrix[index][j] = 1;
                }
                
                if(j == (index-1) && jRow == indexRow){
                    this.matrix[index][j] = 1;
                }
                
                if(j == (index+1) && jRow == indexRow){
                    this.matrix[index][j] = 1;
                }
                
                if(j == (index-size)){
                    this.matrix[index][j] = 1;
                }
                
                if(j == (index+size)){
                    this.matrix[index][j] = 1;
                }
                
                this.matrix[index][size*size]=currentState[index];
                
            }         
    
        }   
        
        console.log(this.matrix);
        this.rowReduce();
    }
    rowReduce(){
        this.pivot = [];
        for(var i = 0; i < this.size*this.size; i++){
            this.pivot[i] = 0;
        }
        
        for(var column = 0; column < this.size*this.size; column++){
        for(var row = 0; row < this.size*this.size; row++){
            
                if(this.matrix[row][column] == 1 && this.pivot[row] == 0){
                    // pivot
                    for(var k = 0; k<this.size*this.size; k++){
                        if(this.matrix[k][column] == 1 && k !== row){
                            for(var scan = column; scan<this.size*this.size+1; scan++){
                                this.matrix[k][scan] = (this.matrix[k][scan]+this.matrix[row][scan])%2;
                            }
                       
                        }
                    }
                    this.pivot[row] = 1;
                   // console.log("ROw ", row, "DONE");
                }
            
            
            }
         
        
        }   
        var solution = [];
        var i = 0;
        for(var col = 0; col < this.size*this.size; col++){

            for(var row = 0; row < this.size*this.size; row++){

                if( (this.matrix[row][col] == 1) && this.matrix[row][this.size*this.size] == 1){
                    //console.log(col);
                    solution[i] = col;
                    i++;
                }
            }

        }
     this.showSolution(solution)
    }
    
showSolution(solution) {
    return solution;
}
}