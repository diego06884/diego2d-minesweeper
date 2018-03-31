class Board {
    constructor (numberOfRows, numberOfColumns, numberOfBombs) {
        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = numberOfRows * numberOfColumns;
        this._playerBoard = generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = generateBombBoard(numberOfRows, numberOfColumns,  numberOfBombs);
    }
    get playerBoard() {
        return this._playerBoard;
    }

    flipTile (rowIndex, columnIndex) {
        if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
            console.log('This tile has already been flipped');
            return;
        } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
            this._playerBoard[rowIndex][columnIndex] = 'B';
        } else {
            this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
        }
        this._numberOfTiles --;
    }

    getNumberOfNeighborBombs  (rowIndex, columnIndex) {
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
        
    }
}




const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
    const gameBoard = [];
    for (let i = 0; i < numberOfRows; i++) {
        gameBoard[i] = [];
        for (let j = 0; j < numberOfColumns; j++) {
            gameBoard[i][j] = ' ';
        }
    }
    return gameBoard;
};
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
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
};





const printBoard = (board) => {
    console.log(board.map(row => row.join(' | ')).join('\n'));
};
let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 3);

console.log('Player Board: ');
printBoard(playerBoard);

console.log('Bomb board: ');
printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board:');
printBoard(playerBoard);