class GameScene extends Phaser.Scene {
    constructor (){
        super('Game');
    }
    
    preload() {
        
    }
    
    create(data) {
        this.cameras.main.fadeFrom(1000);
        // save the global data 
        this.data = data;
        this.size = this.data.size;
        this.solution = true;
        this.solutionPressed = false;
        
        
        // create lights
        this.createLights();
        
        this.input.on('gameobjectdown', this.hi, this);
        
        this.aGrid = new AlignGrid({scene:this,rows:15, cols:11});
        //this.aGrid.showNumbers();
      
        // add munu button
        this.menuButton = this.add.sprite(0,0,'blueButton1').setInteractive();
        this.menuButton.setOrigin(.5,.5);
        this.aGrid.placeAtIndex(148,this.menuButton);
        
        // add menu text
        this.menuText = this.add.bitmapText(0,0,'mister-2','Home',38);
        this.centerButtonText(this.menuText, this.menuButton);
        
        this.menuButton.on('pointerdown', function (pointer) {
            this.scene.start('Title',this.data);
        }.bind(this));

        
        // add Solution button -----------------------------------------
        this.solutionButton = this.add.sprite(0,0,'blueButton1').setInteractive();
        this.solutionButton.setOrigin(.5,.5);
        this.aGrid.placeAtIndex(137,this.solutionButton);
        
        // add solution text
        this.solutionText = this.add.bitmapText(0,0,'mister-2','Solution',38);
        this.centerButtonText(this.solutionText, this.solutionButton);
        
        this.solutionButton.on('pointerdown', function (pointer) {
            this.calculateSolution();
        }.bind(this));
        
        // add new puzzle button ------------------------------------------
        this.newButton = this.add.sprite(0,0,'blueButton1').setInteractive();
        this.newButton.setOrigin(.5,.5);
        this.aGrid.placeAtIndex(126,this.newButton);
        
        // add solution text
        this.newText = this.add.bitmapText(0,0,'mister-2','New',38);
        this.centerButtonText(this.newText, this.newButton);
        
        this.newButton.on('pointerdown', function (pointer) {
            this.scene.start('Game',this.data);
        }.bind(this));
        
        this.pop = this.sound.add('pop', {
            volume: 0.5, 
            loop: false
        });
    }
    
    update() {
        
    }
    
    calculateSolution() {
        
        
        this.resetSolution();
        // variables
        this.matrix = [];
        var size = this.data.size;
        var s2 = size*size;
        this.solutionPressed = true;
        
        for(var index = 0; index < s2; index++){
         // create matrix to rref. Start by assigning all zeros
            this.matrix[index] = [];
            for(var col = 0; col < s2; col++){
                this.matrix[index][col] = 0;
            }   
        }
        
        for(var index = 0; index < s2; index++){
            
           // what row is index?
            var indexRow = Math.floor(index/size);
            for(var j = 0; j < s2; j++){
                // what row is ;?
                var jRow = Math.floor(j/size);
                
                if(index == j){
                    this.matrix[index][j] = 1;
                }
                if(j == (index-1) && (jRow == indexRow)){
                    this.matrix[index][j] = 1;
                }
                
                if(j == (index+1) && (jRow == indexRow)){
                    this.matrix[index][j] = 1;
                }
                
                if(j == (index-size)){
                    this.matrix[index][j] = 1;
                }
                
                if(j == (index+size)){
                    this.matrix[index][j] = 1;
                }
                
                // add the lights from variant
                if(this.data.mode == 'variant'){
                   if(j==(index+size-1) && jRow == indexRow){
                        this.matrix[index][j] = 1;
                    }
                    if(j == (index-size+1) && jRow == indexRow){
                        this.matrix[index][j] = 1;
                    }
                    if(index+size>=s2){
                        if (j == (index+size-s2)){
                            this.matrix[index][j] = 1;
                        }
                    }
                    if(index-size<0){
                        if(j == (index-size+s2)){
                            this.matrix[index][j] = 1;
                        }
                    }
                 
                }
            }
        
        
            
        }
        
        
       
        
        var temp = [];
        for(var i = 0; i < size; i++){
            temp[i] = [];
            for(var j = 0; j < size; j++){
                temp[i][j] = this.position[i][j];
                if(temp[i][j] == 2){
                    temp[i][j] = 1;
                }
                if(temp[i][j]==3){
                    temp[i][j] = 0;
                }
            }
        }  
        //console.log(temp);
        // adjoin the current state to matrix
        for(var i = 0; i < size; i++){
            for(var j = 0; j < size; j++){
                this.matrix[i*size+j][s2] = temp[i][j];
            }
        }
        //console.log(this.matrix);
        
         var e = [];
        for(var i = 0; i < s2; i++){
            e[i] = [];
            for(var j = 0; j < s2+1; j++){
                e[i][j] = this.matrix[i][j];
            }
        }  
            //console.log(e);
           
        this.rowReduce();
        
    }

    rowReduce(){
        var size = this.data.size;
        var s2 = size*size;
        
         // reorder matrix 
        var rowCounter = 0;
        this.rref = [];
        
        // will keep track of which rows are completed (pivoted)
        this.pivot = [];
        for(var i = 0; i < s2; i++){
            this.pivot[i] = 0;
        }
        
        for(var column = 0; column < s2; column++){
            for(var row = 0; row < s2; row++){
            
                if(this.matrix[row][column] == 1 && this.pivot[row] == 0){
                    // pivot
                    for(var k = 0; k<s2; k++){
                        if(this.matrix[k][column] == 1 && k !== row){
                            for(var scan = column; scan<s2+1; scan++){
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
        var row = 0;
        var col = 0;
        for(var i = 0; i < this.size*this.size; i++){
            pivot[i] = false;
        }
        for(var col = 0; col < s2; col++){
            for(var row = 0; row < s2; row++){
                if(this.matrix[row][col] == 1 && pivot[row] === false){
                    this.rref[rowCounter] = [];
                    for(var k = 0; k < s2+1;k++){
                       this.rref[rowCounter][k] = this.matrix[row][k];
                    }
                    pivot[row] = true;
                    rowCounter++;
                    break;    
                }
               
            }
        
            
        
        }
        
        var e = [];
        for(var i = 0; i < rowCounter; i++){
            e[i] = [];
            for(var j = 0; j < s2+1; j++){
                e[i][j] = this.rref[i][j];
            }
        }  
            console.log(e);
        
      
        
        var solution = [];
        var row = 0;
        var col = 0;
        console.log(rowCounter);
        for(var i = 0; i < rowCounter; i++){
            
            for(var j = 0; j < s2; j++){
                if(this.rref[i][j]==1){
                    // found leading one
                    if(this.rref[i][s2] == 1){
                        // add blue dot
                        row = Math.floor(j/size);
                        col = j%size;
                        if(this.lights[row][col].frameSpot == 1){
                            this.lights[row][col].setFrame(2);
                            this.lights[row][col].frameSpot = 2;
                        }
                        else if(this.lights[row][col].frameSpot == 0){
                            this.lights[row][col].setFrame(3);
                            this.lights[row][col].frameSpot = 3;
                       }
                        
                    }
                    break;
                }
              
                
            }
        }
        
//        for(var i = 0; i < size; i++){
//            for(var j = 0; j < size; j++){
//               row = i*size+j ;
//                col = i*size+j;
//                if(this.rref[row][col] == 1 && this.rref[row][s2] == 1){
//                    solution[row] = {row: i, col: j};
//                    if(this.lights[i][j].frameSpot == 1){
//                        this.lights[i][j].setFrame(2);
//                        this.lights[i][j].frameSpot = 2;
//                    }
//                    else if(this.lights[i][j].frameSpot == 0){
//                        this.lights[i][j].setFrame(3);
//                        this.lights[i][j].frameSpot = 3;
//                   }
//                }
//            }
//        }
        console.log(solution, this.rref);
      
//        for(var col = 0; col < s2; col++){
//
//            for(var row = col; row < s2; row++){
//
//                if( (this.rref[row][col] == 1) && (this.rref[row][s2] == 1) ){
//                    //console.log(col);
//                    solution[i] = col;
//                    if(this.lights[][].frameSpot == 1){
//                       this.lights[col].setFrame(2);
//                       this.lights[col].frameSpot = 2;
//                    }
//                    else if(this.lights[col].frameSpot == 0){
//                        this.lights[col].setFrame(3);
//                        this.lights[col].frameSpot = 3;
//                    }
//                    
//                    i++;
//                }
//            }
//
//        }
        
    }
    
    createLights() {
        var size = this.size;
        
        // light size
        var lightWidth = config.width/size;
        var lightHeight = 0.7*config.height/size;
        
        // press random lights to generate initial position
        this.lights = [];
        this.generatePosition();
        
        for(var row = 0; row<size; row++){
            this.lights[row] = [];
            for(var col = 0; col<size; col++){
                this.lights[row][col] = this.add.sprite(
                    col*lightWidth,
                    row*lightHeight,
                    'buttons3', this.position[row][col]
                );
                this.lights[row][col].setOrigin(0,0);
                this.lights[row][col].setScale(3/size);
                this.lights[row][col].setInteractive();
                this.lights[row][col].row = row;
                this.lights[row][col].col = col;
                this.lights[row][col].frameSpot = this.position[row][col];
                
                
            }
        }
        this.data.setUp = true;
    }
    
    generatePosition() {
        
        var size = this.size;
        // which buttons to press
        var press = [];
        // initial position of lights (set to all off)
        this.position = [];
        for(var i = 0; i < size; i++){
            press[i] = [];
            this.position[i] = [];
            for(var k = 0; k < size; k++){
                this.position[i][k] = 0;
                if( Math.random()*10 < 5){
                    press[i][k] = 1;
                }
                else {
                    press[i][k] = 0;
                }
            }
        }
        
        // press lights, keep track of position
        
        for(var i = 0; i < size; i++){
            for(var k = 0; k < size; k++){
                if(press[i][k] == 1){
                    this.switch(i,k, this.position);
                }
            }
        }
        
        console.log(press,this.position);
    }

    hi(pointer, gameObject){
        if(this.data.sound == true){
            this.pop.play();
        }
       // console.log(this.position);
        this.switchLights(gameObject.row, gameObject.col, this.lights);
   
    }
    
    resetSolution(){
        var size = this.data.size;
        
        for(var row = 0; row < size; row++){
            for(var col = 0; col < size; col++){
                if(this.lights[row][col].frameSpot == 2){
                    this.lights[row][col].frameSpot = 1;
                    this.lights[row][col].setFrame(1);
                    this.position[row][col] = 1;
                }
                else if(this.lights[row][col].frameSpot == 3){
                    this.lights[row][col].frameSpot = 0;
                    this.lights[row][col].setFrame(0);
                    this.position[row][col] = 0;
                }
            }
        }
    }
    
    flip(row, col,frameSpot,pressed){
        //console.log(pressed);

        // if pressed is true but isn't a part of solution
        // make sure you add the blue dot
        
        if(frameSpot == 0){
            this.lights[row][col].frameSpot = 1;
            this.lights[row][col].setFrame(1);
            if(pressed==true && (this.solutionPressed == true)){
                this.lights[row][col].frameSpot = 2;
                this.lights[row][col].setFrame(2);
            }
        }
        else if(frameSpot == 1) {
            this.lights[row][col].frameSpot = 0;
            this.lights[row][col].setFrame(0);
            if(pressed == true && this.solutionPressed == true){
                this.lights[row][col].frameSpot = 3;
                this.lights[row][col].setFrame(3);
            }
        }
        else if(frameSpot == 2){
            this.lights[row][col].frameSpot = 3;
            this.lights[row][col].setFrame(3);
            if(pressed === true){
                this.lights[row][col].frameSpot = 0;
                this.lights[row][col].setFrame(0); 
            }
        }
        else if(frameSpot == 3){
            this.lights[row][col].frameSpot = 2;
            this.lights[row][col].setFrame(2);
            if(pressed){
                this.lights[row][col].frameSpot = 1;
                this.lights[row][col].setFrame(1);
            }
        }
        this.position[row][col] = this.lights[row][col].frameSpot;
        
        if((frameSpot == 0 && pressed == true) || (frameSpot == 1 && pressed == true)){
            // pressed a button they shouldn't
           // reset 
          // this.resetSolution();
        }
    }
    switchLights (row, col,matrix) {
        if(!this.data.setUp){
            return;
        }else {
            //var matrix = this.position;
            var size = this.size;
        

            
            // switch the button pressed
            this.flip(row,col,this.lights[row][col].frameSpot,true);


            // switch right (if available)
            if( (col+1)<size ){
                this.flip(row,col+1,this.lights[row][col+1].frameSpot,false);
            }
            if( col+1>= size && this.data.mode == 'variant'){
                this.flip(row,0,this.lights[row][0].frameSpot,false);
            }

            // switch left
            if( (col-1)>=0 ){
                this.flip(row,col-1,this.lights[row][col-1].frameSpot,false);
            }    
            
            if( col-1< 0 && this.data.mode == 'variant'){
                this.flip(row,size-1,this.lights[row][size-1].frameSpot,false);
            }

            // switch above
            if( (row-1) >= 0 ){
                this.flip(row-1,col,this.lights[row-1][col].frameSpot,false);
            }
            
            if( row-1<0 && this.data.mode == 'variant'){
                this.flip(size-1,col,this.lights[size-1][col].frameSpot,false);
            }
            
            // switch below
            if( (row+1) < size ){
                this.flip(row+1,col,this.lights[row+1][col].frameSpot,false);
            }
            
            if( (row+1) >= size && this.data.mode == 'variant'){
                
                this.flip(0,col,this.lights[0][col].frameSpot,false);
                
            }
        }
        
        // check if user won
        this.check();
    
    }
    
    check(){
        // check to see if any lights are still on
        var size = this.data.size;
        for(var row = 0; row < size; row++){
            for(var col = 0; col < size; col++){
                if(this.lights[row][col].frameSpot == 1 || this.lights[row][col].frameSpot == 2){
                    // found light on
                    return;
                }
            }
        }
        // user wins
        
        var winText = this.add.bitmapText(0,0,'mister','You Win! \nCongrats',140);
        winText.setOrigin(0.5,0.5);
        this.aGrid.placeAtIndex(60,winText);
        this.aGrid.placeAtIndex(104, this.add.bitmapText(0,0,'mister-2','Try a bigger game size?',50).setOrigin(0.5));
        
    }
    
    
    switch(row,col,matrix){
        var size = this.size;
        
        // switch the button pressed
        if(matrix[row][col] == 1){
            matrix[row][col] = 0;
        }
        else {
            matrix[row][col] = 1;
        }
        
        // switch right (if available)
        if( (col+1)<size ){
            if(matrix[row][col+1] == 1){
                matrix[row][col+1] = 0;
            }
            else {
                matrix[row][col+1] = 1;
            }
        }
        
        if( col+1 >= size && this.data.mode == 'variant'){
            if(matrix[row][0] == 1){
                matrix[row][0] = 0;
            }
            else {
                matrix[row][0] = 1;
            }
        }
        
        // switch left
        if( (col-1)>=0 ){
            if(matrix[row][col-1] == 1){
                matrix[row][col-1] = 0;
            }
            else {
                matrix[row][col-1] = 1;
            }
        }     
        
        if( (col-1)<0 && this.data.mode == 'variant'){
            if(matrix[row][size-1] == 1){
                matrix[row][size-1] = 0;
            }
            else {
                matrix[row][size-1] = 1;
            }
        }
        
        // switch above
        if( (row-1) >= 0 ){
            if(matrix[row-1][col] == 1){
                matrix[row-1][col] = 0;
            }
            else {
                matrix[row-1][col] = 1;
            }
        }
        
        if( (row-1)<0 && this.data.mode == 'variant'){
            if(matrix[size-1][col] == 1){
                matrix[size][col] = 0;
            }
            else {
                matrix[size-1][col] = 1;
            }
        }
        
        // switch below
        if( (row+1) < size ){
            if(matrix[row+1][col] == 1){
                matrix[row+1][col] = 0;
            }
            else {
                matrix[row+1][col] = 1;
            }
        }
        
        if( row+1 >= size && this.data.mode == 'variant'){
           if(matrix[0][col] == 1){
                matrix[0][col] = 0;
            }
            else {
                matrix[0][col] = 1;
            } 
        }
    
    }
    
    centerButtonText (gameText, gameButton) {
        Phaser.Display.Align.In.Center(gameText, gameButton);
}
};
