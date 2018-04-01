class Game {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    }
    playMove(rowIndex, columnIndex) {
        this._board.flipTile(rowIndex, columnIndex);
        if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
            console.log('Game over');
            this._board.print();
        } else if (!this._board.hasSafeTiles()) {
            console.log('You won the game');
        } else {
            console.log('Current Board\n');
            this._board.print();
        }

    }
}


class Board {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = numberOfRows * numberOfColumns;
        this._playerBoard = this.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = this.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }
    get playerBoard() {
        return this._playerBoard;
    }

    flipTile(rowIndex, columnIndex) {
        if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
            console.log('This tile has already been flipped');
            return;
        } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
            this._playerBoard[rowIndex][columnIndex] = 'B';
        } else {
            this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
        }
        this._numberOfTiles--;
    }

    getNumberOfNeighborBombs(rowIndex, columnIndex) {
        const neighborOffsets = [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, -1],
            [0, 1],
            [1, -1],
            [1, 0],
            [1, 1]
        ];
        const numberOfRows = this._bombBoard.length;
        const numberOfColumns = this._bombBoard[0].length;
        let numberOfBombs = 0;
        neighborOffsets.forEach((offset) => {
            const neighborRowIndex = rowIndex + offset[0];
            const neighborColumnIndex = columnIndex + offset[1];
            if ((neighborRowIndex >= 0) && (neighborRowIndex < numberOfRows) && (neighborColumnIndex >= 0) && (neighborColumnIndex < numberOfColumns)) {
                if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
                    numberOfBombs++;
                }
            }
        });
        return numberOfBombs;
    }
    hasSafeTiles() {
        return this._numberOfTiles !== this._numberOfBombs;
    }

    print() {
        console.log(this.playerBoard.map(row => row.join(' | ')).join('\n'));
    }

    generatePlayerBoard(numberOfRows, numberOfColumns) {
        const gameBoard = [];
        for (let i = 0; i < numberOfRows; i++) {
            gameBoard[i] = [];
            for (let j = 0; j < numberOfColumns; j++) {
                gameBoard[i][j] = ' ';
            }
        }
        return gameBoard;
    }

    generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {

        const gameBoard = [];
        for (let i = 0; i < numberOfRows; i++) {
            gameBoard[i] = [];
            for (let j = 0; j < numberOfColumns; j++) {
                gameBoard[i][j] = null;
            }
        }
        let numberOfBombsPlaced = 0;
        while (numberOfBombsPlaced < numberOfBombs) {
            /*The code in your while loop has the potential to place bombs on top of already existing bombs. This will be fixed when you learn about control flow.*/
            let randomRowIndex = Math.floor(Math.random() * numberOfRows);
            let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
            if (gameBoard[randomRowIndex][randomColumnIndex] !== 'B') {
                gameBoard[randomRowIndex][randomColumnIndex] = 'B';
                numberOfBombsPlaced++;
            }
        }
        return gameBoard;

    }
}

const g = new Game(3, 3, 3);
g.playMove(0, 0);