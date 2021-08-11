class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }

  preload () {
    // load images
    this.load.image('logo', 'assets/logo.png');
  }

  create (data) {
        this.data = data;
        this.data.solution = true;
        this.buttons = [];
        this.size = data.size;
      

        this.popSound = this.sound.add('pop');
      
        this.aGrid = new AlignGrid({scene:this,rows:11, cols:12});
        this.aGrid.showNumbers();
      
        this.setUpBoard(this.size);
        
        this.input.on("gameobjectdown", this.buttonClick,this);
      
        this.gameButton = this.add.sprite(100, 200, 'blueButton1').setInteractive();
        this.centerButton(this.gameButton, -2.8);
      
      

        this.gameText = this.add.text(0, 0, 'Menu', { fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.gameText, this.gameButton);

        this.gameButton.on('pointerdown', function (pointer) {
            
          this.scene.start('Title',this.data);
        }.bind(this));
      
      // solution button
        this.solutionButton = this.add.sprite(100, 200, 'blueButton1').setInteractive();
        this.centerButton(this.solutionButton, -3.5);

        this.solutionText = this.add.text(0, 0, 'Solution', { fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.solutionText, this.solutionButton);

        this.solutionButton.on('pointerdown', function (pointer) {
        console.log("Pressed");
          this.showSolution();
        }.bind(this));
      this.showSolution();
        this.newPuzzle = this.add.sprite(100, 200, 'blueButton1').setInteractive();
        this.centerButton(this.newPuzzle, -4.2 );
      
      
      
        this.newPuzzleText = this.add.text(0, 0, 'New Puzzle', { fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.newPuzzleText, this.newPuzzle);

        this.newPuzzle.on('pointerdown', function (pointer) {
            
          this.scene.start('Game',this.data);
        }.bind(this));
      

//        this.input.on('pointerover', function (event, gameObjects) {
//          gameObjects[0].setTexture('blueButton2');
//        });
//
//        this.input.on('pointerout', function (event, gameObjects) {
//          gameObjects[0].setTexture('blueButton1');
//        });  
  }
    
    
setUpBoard(size) {
        
        var width = 213;
        var height = 214;
        
        this.position = [];
        
        var boxWidth = (config.width/size);
        var boxHeight = (0.8*config.height/size);
    
        for(var j = 0; j < size; j++){
            for(var i = 0; i < size; i++) {
                var index = size*j+i;
                if( Math.random()*10 < 5){
                    this.buttons[index] = this.add.sprite(i*boxWidth, 0+j*boxHeight,"buttons3",1);
                   this.buttons[index].frameSpot = 1;
                    
                    
                }
                else {
                    this.buttons[index] = this.add.sprite(i*boxWidth, 0+j*boxHeight,"buttons3",0);
                    this.buttons[index].frameSpot = 0;
                    
                }
                
                this.position[index] = this.buttons[index].frameSpot;
                
                this.buttons[index].row = j;
                this.buttons[index].column = i;
                    
                
                if(j == 0){
                    this.buttons[index].UP = false;
                }
                else {
                    this.buttons[index].UP = true;
                }
                if(i == 0){
                    this.buttons[index].LEFT = false;
                }
                else{
                    this.buttons[index].LEFT = true;
                }
                if(i == (size-1)){
                    this.buttons[index].RIGHT = false;
                }
                else {
                    this.buttons[index].RIGHT = true;
                }
                if(j == (size-1)){
                    this.buttons[index].DOWN = false;
                }
                else {
                    this.buttons[index].DOWN = true;
                }
                
                this.buttons[index].setScale(3/size);
                this.buttons[index].location = size*j+i;
                this.buttons[index].setOrigin(0,0);
                this.buttons[index].setInteractive();
                
                
                
            }
        }
         //   this.solution = new Solution(this.data.size,this.position);
    
            
       // this.calculateSolution();
        //console.log(this.position);
        
 
    }
    
    buttonClick(pointer, gameObject) {
        
        if(this.data.sound === true){
            this.popSound.play();
        }
        
        if(gameObject.frameSpot == 1 || gameObject.frameSpot == 2){
            gameObject.setFrame(0);
            gameObject.frameSpot = 0;
        }
        else {
            gameObject.setFrame(1);
            gameObject.frameSpot = 1;
        }
        this.position[gameObject.location] = gameObject.frameSpot;

       // console.log(gameObject.location, gameObject.row, gameObject.column);
        this.changeButtons(gameObject.location);
        
        
    }
    

    
    changeButtons(i) {
        
        var maxBoxes = (this.size * this.size) - 1;
        
        
            // change UP?
            if(this.buttons[i].UP == true) {
                var j = i-this.size;
                this.switch(j);
                //console.log("UP");
            }
            if(this.buttons[i].DOWN == true){
                var j = i+this.size;
                this.switch(j);
                //console.log("DOWN");
            }
            if(this.buttons[i].LEFT == true){
                var j = i-1;
                this.switch(j);
                //console.log("LEFT");
            }
            if(this.buttons[i].RIGHT == true){
                var j = i+1;
                this.switch(j);
                //console.log("RIGHT");
            }
            
            
          
       // console.log(this.position);
       // this.calculateSolution();
        this.checkforWin();
        
    }
    
 
    
    switch(j){
        if(this.buttons[j].frameSpot == 1){
            this.buttons[j].setFrame(0);
            this.buttons[j].frameSpot = 0;  
        }
        else if(this.buttons[j].frameSpot == 2){
                this.buttons[j].setFrame(3);
                this.buttons[j].frameSpot = 3;
        }
        else if(this.buttons[j].frameSpot == 0){
            this.buttons[j].setFrame(1);
            this.buttons[j].frameSpot = 1;
        }
        else if(this.buttons[j].frameSpot == 3){
            this.buttons[j].frameSpot = 2;
            this.buttons[j].setFrame(2);
        }
        this.position[j] = this.buttons[j].frameSpot;
    }
    
    checkforWin(){
        var maxBoxes = (this.size*this.size);
        for(var i = 0; i < maxBoxes; i++){
            if(this.buttons[i].frameSpot == 0){
                this.win = true;
            }
            else {
                this.win = false;
                break;
            }
        }
        if(this.win == true){
            //console.log("Win");
            
        }
        else {
            //console.log("Keep Playing");
        }
    }    
    
centerButton (gameObject, offset = 0){
    Phaser.Display.Align.In.Center(
        gameObject,
        this.add.zone(config.width/2, config.height/2-offset*100, config.width, config.height)
    );
}  
    
centerButtonText (gameText, gameButton) {
  Phaser.Display.Align.In.Center(
    gameText,
    gameButton
  );
}

showSolution() {
    console.log("calculting");
    var size = this.data.size;
    this.matrix = [];
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
                
                this.matrix[index][size*size]=this.position[index];
                
            }         
    
        }   
        
        //console.log(this.matrix);
        this.rowReduce();
}
rowReduce(currentState){
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
    
        // reorder matrix 
        var rowCounter = 0;
        this.rref = [];
        var pivot = [];
        for(var i = 0; i < this.size*this.size; i++){
            pivot[i] = false;
        }
    //console.log(pivot);
    
        for(var col = 0; col < this.size*this.size; col++){
            for(var row = 0; row < this.size*this.size; row++){
                if(this.matrix[row][col] == 1 && pivot[row] === false){
                    this.rref[rowCounter] = [];
                    for(var k = 0; k < this.size*this.size+1;k++){
                       this.rref[rowCounter][k] = this.matrix[row][k];
                    
                    }
                    //console.log("Row",rowCounter,"is from Row", row);
                    pivot[row] = true;
                    rowCounter++;
                    break;    
                }
               
            }
        }
    
        // add remaining rows to rref (if rank is not size^2)
        console.log("There are ",this.size*this.size-rowCounter, "free variables");
        if(rowCounter != this.size*this.size){
            for(var i = rowCounter; i < this.size*this.size; i++){
                this.rref[i] = [];
                for(var k = 0; k < this.size*this.size+1;k++){
                    this.rref[i][k] = this.matrix[i][k];
                    if(this.rref[i][k] == 1){
                        //console.log("NO SOLUTION");
                        this.data.solution = false;
                        
                    }
                }
            }  
        }
        
        
    
        var solution = [];
        var i = 0;
        for(var col = 0; col < this.size*this.size; col++){

            for(var row = col; row < this.size*this.size; row++){

                if( (this.rref[row][col] == 1) && (this.rref[row][this.size*this.size] == 1) ){
                    //console.log(col);
                    solution[i] = col;
                    if(this.buttons[col].frameSpot == 1){
                       this.buttons[col].setFrame(2);
                       this.buttons[col].frameSpot = 2;
                    }
                    else if(this.buttons[col].frameSpot == 0){
                        this.buttons[col].setFrame(3);
                        this.buttons[col].frameSpot = 3;
                    }
                    
                    i++;
                }
            }

        }
        console.log(this.rref);
        if(this.data.solution == true){
            console.log(solution);
        }
        else {
            console.log("NO SOLUTION");
        }
    
    }
    

    
};
