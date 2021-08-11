'use strict';

Ttt.Game = function (game) {
  
    this.gameover = false;
    this.restart = false;
    
    // add the player array
    this.player = [];
    
    // add the board
    this.board = null;
    
    this.currentPlayer = 0;
    
    this.playerText = null;
    
    this.activeSquare = null;
    
    // this refers to the small boxes.  Boxes 0-80 
    this.smallBoxes = [];
    
    // this refers to the large boxes.  Boxes 0-8
    this.largeBoxes = [];
    
    this.offSetX = 25;
    this.offSetY = 50;
    
    this.columnX = [35, 95, 155, 235, 295, 355, 435, 495, 555];
    this.rowY  = [40, 100, 160, 240, 300, 360, 440, 500, 560];
    
    this.largeX = [0, 200, 400];
    this.largeY = [0, 200, 400];
    
    // if a player can choose a free box, this.anyBox is set to true
    this.anyBox = true;
};

function Player(n) {
  
    this.name = n;
    this.smallCells = []; // [largeBox] = [0, 0, 1, 0, 0, 1, 0, 0 , 0]
    this.largeCells = []; // ex. [0, 0, 0, 1, 1, 0, 0, 0, 0]
    
    this.setSmallCellsToZero = function () {
        for (var i = 0; i < 9; i++) {
            this.smallCells[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0];   
        }
    };
    
    this.setLargeCellsToZero = function () {
        this.largeCells = [0, 0, 0, 0, 0, 0, 0, 0, 0];  
    };
    
    this.addBox = function (sr, sc, lr, lc) {
        
        // finds the current large box clicked
        var largeBox = this.determineBox(lr, lc);
        
        var smallBox = this.determineBox(sr, sc);
        
        // change box to 1.  Indicates the player owns this box
        this.smallCells[largeBox][smallBox] = 1;
    };
    
    this.removeBox = function (sr, sc, lr, lc) {
        
        // finds the current large box clicked. 0-8
        var largeBox = this.determineBox(lr, lc);
        
        // finds the small box clicked. 0-8
        var smallBox = this.determineBox(sr, sc);
        
        // change box to 1.  Indicates the player owns this box
        this.smallCells[largeBox][smallBox] = 0;
    };
    
    this.addWinningBox = function (row, col, game) {
        // add box to player
        this.largeCells[3*row + col] = 1;
        
        // lock this box
        game.largeBoxes[3*row + col] = 1;
        
        game.add.sprite(game.largeX[col] + game.offSetX - 5, game.largeY[row] + game.offSetY - 3, 'xo_overall', this.name);
         
        
    };
    
    this.determineBox = function (row, col) {
        return 3*row + col;  
    };
    
};


Ttt.Game.prototype = {
  
    create: function () {
        
        
        this.buildBoard();
    
    },
    
    buildBoard: function () {
        
        // add players
        for( var i = 0; i < 2; i++) {
            this.player[i] = new Player(i);
            this.player[i].setLargeCellsToZero();
            this.player[i].setSmallCellsToZero();
        }
        
        // reset all small squares to open (i.e., = 0)
        for(var i = 0; i < 81; i++) {
            this.smallBoxes[i] = 0;   
        }
        
        // reset all large square to open (i.e,. = 0)
        this.largeBoxes = [0, 0, 0, 0, 0, 0, 0, 0];
        
        
        // add the board
        var board = this.add.image(this.world.width / 2, this.world.height / 2 - 10, 'board');
        board.anchor.setTo(0.5, 0.5);
        
        
        
        // add player text
        this.playerText = this.add.bitmapText(this.offSetX + 10, this.world.height - 70, 'gamefont', 'Player X', 50);
        
        // add restart button
        this.restart = this.add.bitmapText(this.offSetX + 400, this.world.height - 70, 'gamefont', 'Restart', 50);
        this.restart.inputEnabled = true;
        this.restart.events.onInputDown.add(this.restartGame, this);
        
        // add the free play indicator
        this.freePlayText = this.add.bitmapText(this.world.centerX - 40,  20, 'gamefont', 'Choose Any Open Box', 30);
        
        this.buildSquares();
        this.startActiveSquare();
    },

    startActiveSquare: function () {
       
        this.activeSquare = this.add.sprite( this.offSetX, this.offSetY, 'outline');
        this.activeSquare.row = 0;
        this.activeSquare.col = 0;
        this.activeSquare.box = 0;
        this.activeSquare.x = this.largeX[0] + this.offSetX - 5;
        this.activeSquare.y = this.largeY[0] + this.offSetY - 3;
    },
    
    buildSquares: function () {
        
        this.squareGroup = this.add.group();
        this.squareGroup.enableBody = true;
        this.squareRange = 30;
        
        var counter = 0;
        
        for(var j = 0; j < 9; j++) {
         
            for(var i = 0; i < 9; i++) {
                
                // add little boxes to board
                var square = this.squareGroup.create(this.columnX[i] + this.offSetX, this.rowY[j] + this.offSetY, 'boxes', 0);
                square.anchor.setTo(0.5, 0.5);
                square.inputEnabled = true;
                
                // add this event for when a player clicks a box
                square.events.onInputDown.add(this.clicked, this);
                
                square.col = i;
                square.row = j;
                square.locked = false;
                square.member = counter;
                counter++;
            }
        }
    },
    
    clicked: function (square) {
        
        // find the current large box clicked
        var playersLargeRow = Math.floor(square.row / 3);
        var playersLargeCol = Math.floor(square.col / 3);
        
        // finds the small box clicked.  Also indicates the next large box 
        var playersSmallRow = Math.floor(square.row % 3);
        var playersSmallCol = Math.floor(square.col % 3);
        
        // if box is locked (chosen already) then return false
        if (square.locked == true) {
            return false;   
        }
     
        // at this point, the player choose an unlocked box (may not be valid though)
        if ( (playersLargeRow == this.activeSquare.row && playersLargeCol == this.activeSquare.col) || this.anyBox == true){
            
            // player has chosen the correct large box
            
            // switch small square image.  Blank to X or Blank to Y
            square.frame = this.currentPlayer + 1;
            
            // lock the square
            square.locked = true;
            
            // turn off free box mode
            this.anyBox = false;
            this.freePlayText.text = '';
            
            
            // add box to players list
            this.player[this.currentPlayer].addBox(playersSmallRow, playersSmallCol, playersLargeRow, playersLargeCol);
           
            //console.log(this.player[this.currentPlayer].smallCells[3*playersLargeRow + playersLargeCol]);
            
            // did player win box
            if (this.checkIfWinner(this.currentPlayer, playersLargeRow, playersLargeCol, 'small') == true) {
                
                // add box 
                this.player[this.currentPlayer].addWinningBox(playersLargeRow, playersLargeCol, this);
            }
            
            // did player win overall game
            this.checkIfWinner(this.currentPlayer, playersLargeRow, playersLargeCol, 'large');
            
            // move activeSquare
            this.moveActiveSquare(playersSmallRow, playersSmallCol, playersLargeRow, playersLargeCol, this);
            
            
            this.changePlayer();
            
            // is there an AI?  If so, computer players turn
            if (BasicGame.players == 1) {
                
                
                // do they have a free pick
                if( this.anyBox == true) {
                    for( var i = 0; i < 9; i++) {
                        if( this.largeBoxes[i] == 0 ){
                            // next box is i
                            break;   
                        }
                    }
                    
                    var row = Math.floor(i/3);
                    var col = i%3;
                    
                }
                else {
                    var row = this.activeSquare.row;
                    var col = this.activeSquare.col;
                }
                
                var validBoxes = [];
                console.clear();
                var counter = 0;
                var smallSquare = 0;
                for (var i = 0; i < 3; i++) {
                    for (var j = 0; j < 3; j++) {
                        
                        smallSquare = 9*(3*row + i) + (3*col + j);
                        
                        if (this.squareGroup.children[smallSquare].locked == false) {
                            // ai has chosen a valid open square  
                            
                            this.player[this.currentPlayer].addBox(i, j, row, col);
                            
                            if (this.checkIfWinner(this.currentPlayer, row, col, 'small') == true ){
                                validBoxes[counter] = [i, j, smallSquare, 3];
                                counter++;
                               
                            
                            }
                            else if (this.blockOpponent(this.currentPlayer,i, j, row, col) == true){
                                validBoxes[counter] = [i, j, smallSquare, 2];
                                counter++;  
                            
                            }
                            else if (this.checkWinningIndex(this.currentPlayer, row, col) == true){
                                validBoxes[counter] = [i, j, smallSquare, 1];
                                counter++;
                               
                            }
                            
                            else {
                                validBoxes[counter] = [i, j, smallSquare, 0]; 
                                counter++;
                            }
                            
                            this.player[this.currentPlayer].removeBox(i, j, row, col);
                            
                            
                        }
                    
                       
                    }
                    
                }
                
                 console.log(validBoxes);
               
                var needRandomBox = true;
                for (var j = 0; j < counter; j++) {
                    if (validBoxes[j][3] == 3) {
                        // this box would win the square
                        var newRow = validBoxes[j][0];
                        var newCol = validBoxes[j][1];
                        var newSmallSquare = validBoxes[j][2];
                        
                        needRandomBox = false;
                        break;
                    }
                
                }
                for (var j = 0; j < counter; j++) {
                    if (validBoxes[j][3] == 2 && needRandomBox == true) {
                        // this box would win the square
                        var newRow = validBoxes[j][0];
                        var newCol = validBoxes[j][1];
                        var newSmallSquare = validBoxes[j][2];
                        
                        needRandomBox = false;
                        break;
                    }
                
                }
                for (var j = 0; j < counter; j++) {
                    if (validBoxes[j][3] == 1 && needRandomBox == true) {
                        // this box would win the square
                        var newRow = validBoxes[j][0];
                        var newCol = validBoxes[j][1];
                        var newSmallSquare = validBoxes[j][2];
                        
                        needRandomBox = false;
                        break;
                    }
                
                }
                if (needRandomBox == true) {
                    var randomBox = this.rnd.integerInRange(0,counter-1);
                    var newRow = validBoxes[randomBox][0];
                    var newCol = validBoxes[randomBox][1];
                    var newSmallSquare = validBoxes[randomBox][2];  
                }
                
                this.player[this.currentPlayer].addBox(newRow, newCol, row, col);
               
                
                this.squareGroup.children[newSmallSquare].frame = (this.squareGroup.children[newSmallSquare].frame + 1 + this.currentPlayer)%3;
                
                this.squareGroup.children[newSmallSquare].locked = true;
                
                if (this.checkIfWinner(this.currentPlayer, playersSmallRow, playersSmallCol, 'small') == true) {
                
                    // add box 
                    this.player[this.currentPlayer].addWinningBox(playersSmallRow, playersSmallCol, this);
                }

                // did player win overall game
                this.checkIfWinner(this.currentPlayer, playersSmallRow, playersSmallCol, 'large');

                // move activeSquare
                this.moveActiveSquare(newRow, newCol, playersSmallRow, playersSmallCol, this);


                this.changePlayer();
            }
        }
        
        
        
        
        
        
    },
    
    checkIfWinner: function (p, row, col, size) {
        
        if (size == 'small') {
            var player = this.player[p].smallCells[3*row + col];   
        }
        else {
            var player = this.player[p].largeCells;   
            
        }
        var winner = 0;
        //console.log(player);    
        // check rows
        
        var sumRow = [0,0,0];
        for (var k = 0; k < 3; k++) {
            for (i = 0; i < 3; i++) {
                sumRow[k] = sumRow[k] + player[3*k+i];
            }
            if( sumRow[k] == 3 ) {
                winner = 1;   
            }
            
        }
        
        var sumCol = [0, 0, 0];
        for (var k = 0; k < 3; k++) {
            for (var i = 0; i < 3; i++){
                sumCol[k] = sumCol[k] + player[k+3*i]; 
            }
            if( sumCol[k] == 3 ) {
                winner = 1; 
            }
        }
        
        var sumDLR = player[0] + player[4] + player[8];
        var sumULR = player[6] + player[4] + player[2];
        
        if( sumDLR == 3 || sumULR == 3 ) {
                winner = 1;   
            }
        
        if(winner == 1 && size == 'small') {
            
            return true;
            
            
        }
        
        if(winner == 1 && size != 'small'){
            this.gameOver(this.currentPlayer);   
        }
        
        return false;
        
    },
    
    
    blockOpponent: function (p, i, j, row, col) {
    
        var opponent = 0;
        this.player[opponent].addBox(i, j, row, col);
        
        if( this.checkIfWinner(opponent, row, col, 'small') == true){
            this.player[opponent].removeBox(i, j, row, col);
            return true;   
        }
        
        this.player[opponent].removeBox(i, j, row, col);
        return false;
        
    }, 
    
    checkWinningIndex: function (p, row, col) {
      
        var player = this.player[p].smallCells[3*row + col];   
        
        var index = [];
        var counter = 0;
        //console.log(player);    
        // check rows
        
        var sumRow = [0,0,0];
        for (var k = 0; k < 3; k++) {
            for (i = 0; i < 3; i++) {
                sumRow[k] = sumRow[k] + player[3*k+i];
            }
            if( sumRow[k] == 2 ) {
                return true;   
            }
            
        }
        
        var sumCol = [0, 0, 0];
        for (var k = 0; k < 3; k++) {
            for (var i = 0; i < 3; i++){
                sumCol[k] = sumCol[k] + player[k+3*i]; 
            }
            if( sumCol[k] == 2 ) {
                true
            }
        }
        
        var sumDLR = player[0] + player[4] + player[8];
        var sumULR = player[6] + player[4] + player[2];
        
        if( sumDLR == 2 || sumULR == 2 ) {
                  return true;
            }
        
        
        
        return false;
        
   
    },
    
    changePlayer: function () {
                
        if(this.playerText.text == "Player X"){
            this.playerText.text="Player O";
        }
        else {
            this.playerText.text = "Player X";   
        }     
        
        this.currentPlayer = (this.currentPlayer+1)%2;
    },
    
    isBlocked: function (square, size) {
        //console.log(square.box);
         if (this.largeBoxes[square.box] == 1 ) {
                
                return true;
            }
            else {
                return false;   
            }
    },
    
    moveActiveSquare: function (row, col, largeRow, largeCol, game) {
            
        // will move the active square outlin
        
        // sets the new row and col of the new active square outline
        
        var box = 3*row + col;
        
        
        // sets up the tween
        var tween = this.add.tween(this.activeSquare);
        
        // check to see if the new box is active.  if not, next player gets a free play
        // active square turns invisibile
        if (this.largeBoxes[box] == 1) {
            this.anyBox = true;
            tween.to({alpha:0}, 50, Phaser.Easing.Linear.None, true, 0);
            this.freePlayText.text = 'Choose Any Open Box';
        }
        
        else {
            tween.to({alpha:1}, 50, Phaser.Easing.Linear.None, true, 0);   
        }
        
        tween.to( {x: this.largeX[col] + this.offSetX - 5, y: this.largeY[row] + this.offSetY - 3} , 1000, Phaser.Easing.Quadratic.InOut, true, 0);
        
        tween.start();
        
        this.activeSquare.row = row;
        this.activeSquare.col = col;
        this.activeSquare.box = 3*row + col;
              
    },
    
    gameOver: function (player) {
        
        var text = this.add.bitmapText(this.world.centerX-270, this.world.centerY-150, 'gamefont', 'Game Over!\n Click to \n play again.', 80);
        text.inputEnabled = true;
        
        //this.restartGame();
        text.events.onInputDown.add(this.restartGame, this);

    },
    
    restartGame: function (pointer) {
        this.anyBox = true;
        this.state.restart();
    },
    
};