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
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs)=>{
    const gameBoard = [];
    for (let i = 0; i < numberOfRows; i++) {
        gameBoard[i] = [];
        for (let j = 0; j < numberOfColumns; j++) {
            gameBoard[i][j] = null;
        }
    }
    let numberOfBombsPlaced = 0;

    while (numberOfBombsPlaced <= numberOfBombs) {
        /*The code in your while loop has the potential to place bombs on top of already existing bombs. This will be fixed when you learn about control flow.*/
        let randomRowIndex = Math.floor(Math.random() * numberOfRows);
        console.log(randomRowIndex);
        let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        gameBoard[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
    }
    return gameBoard;
};
const printBoard = (board) => {
    console.log(board.map(row => row.join(' | ')).join('\n'));
};
let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board: ');
printBoard(playerBoard);

console.log('Bomb board: ');
printBoard(bombBoard);