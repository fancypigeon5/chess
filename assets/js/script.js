function createBoard() {
    let board = document.getElementById('board');
    for (let c = 8; c > 0; c--) {
        for (let r = 1; r < 9; r++) {
            let square = document.createElement('div');
            let color = (r + c) % 2 === 0 ? 'black' : 'white';
            square.setAttribute('id', `${r}${c}`);
            square.setAttribute('class', color + ' square');
            board.appendChild(square);
        }
    }
}

class Piece {
    constructor(pieceName, piece, color, startingPosition) {
        this.pieceName = pieceName;
        this.piece = piece;
        this.color = color;
        this.position = startingPosition;
        switch(piece) {
            case 'pawn':
                this.display = 'P';
                break;
            case 'knight':
                this.display = 'N';
                break;
            case 'bishop':
                this.display = 'B';
                break;
            case 'rook':
                this.display = 'R';
                break;
            case 'queen':
                this.display = 'Q';
                break;
            case 'king':
                this.display = 'K';
                break;
        }
    }
    place() {
        let parentSquare = document.getElementById(this.position);
        let pieceDisplayed = document.createElement('h1');
        pieceDisplayed.setAttribute('class', 'piece ' + this.color + ' ' + this.piece);
        pieceDisplayed.setAttribute('id', this.pieceName);
        pieceDisplayed.innerHTML = this.display;
        parentSquare.appendChild(pieceDisplayed);
    }
    isLegal() {
        let legalMoves = [];
        let file = Number(this.position.charAt(0));
        let row = Number(this.position.charAt(1));
        switch(this.piece) {
            case 'pawn':
                let startingRow = this.color === 'white' ? 2 : 7;
                if(this.color === 'white') {
                    if (document.getElementById(file.toString() + (row + 1).toString()).children.length === 0) {
                        legalMoves.push(file.toString() + (row + 1).toString());
                    }
                } else {
                    if (document.getElementById(file.toString() + (row - 1).toString()).children.length === 0) {
                        legalMoves.push(file.toString() + (row - 1).toString());
                    }
                }
                if (row === startingRow) {
                    if(this.color === 'white') {
                        if (document.getElementById(file.toString() + (row + 1).toString()).children.length === 0 && document.getElementById(file.toString() + (row + 2).toString()).children.length === 0) {
                            legalMoves.push(file.toString() + (row + 2).toString());
                        }
                    } else {
                        if (document.getElementById(file.toString() + (row - 1).toString()).children.length === 0 && document.getElementById(file.toString() + (row - 2).toString()).children.length === 0) {
                            legalMoves.push(file.toString() + (row - 2).toString());
                        }
                    }
                    
                }
                if (file + 1 <= 8) {
                    if(this.color === 'white') {
                        if (document.getElementById((file + 1).toString() + (row + 1).toString()).children.length !== 0) {
                            if (!document.getElementById((file + 1).toString() + (row + 1).toString()).children[0].classList.contains(this.color)) {
                                legalMoves.push((file + 1).toString() + (row + 1).toString());
                            }
                        }
                    } else {
                        if (document.getElementById((file + 1).toString() + (row - 1).toString()).children.length !== 0) {
                            if (!document.getElementById((file + 1).toString() + (row - 1).toString()).children[0].classList.contains(this.color)) {
                                legalMoves.push((file + 1).toString() + (row - 1).toString());
                            }
                        }
                    }  
                }
                if (file - 1 > 0) {
                    if(this.color === 'white') {
                        if (document.getElementById((file - 1).toString() + (row + 1).toString()).children.length !== 0) {
                            if (!document.getElementById((file - 1).toString() + (row + 1).toString()).children[0].classList.contains(this.color)) {
                                legalMoves.push((file - 1).toString() + (row + 1).toString());
                            }
                        }
                    } else {
                        if (document.getElementById((file - 1).toString() + (row - 1).toString()).children.length !== 0) {
                            if (!document.getElementById((file - 1).toString() + (row - 1).toString()).children[0].classList.contains(this.color)) {
                                legalMoves.push((file - 1).toString() + (row - 1).toString());
                            }
                        }
                    }  
                }
                break;
            case 'knight':
                if (file + 2 <= 8) {
                    if (row + 1 <= 8) {
                        legalMoves.push((file + 2).toString() + (row + 1).toString());
                    }
                    if (row - 1 > 0) {
                        legalMoves.push((file + 2).toString() + (row - 1).toString());
                    }
                }
                if (file - 2 > 0) {
                    if (row + 1 <= 8) {
                        legalMoves.push((file - 2).toString() + (row + 1).toString());                        
                    }
                    if (row - 1 > 0) {
                        legalMoves.push((file - 2).toString() + (row - 1).toString());
                    }
                }
                if (row + 2 <= 8) {
                    if (file + 1 <= 8) {
                        legalMoves.push((file + 1).toString() + (row + 2).toString());
                    }
                    if (file - 1 > 0) {
                        legalMoves.push((file - 1).toString() + (row + 2).toString());
                    }
                }
                if (row - 2 > 0) {
                    if (file + 1 <= 8) {
                        legalMoves.push((file + 1).toString() + (row - 2).toString());
                    }
                    if (file - 1 > 0) {
                        legalMoves.push((file - 1).toString() + (row - 2).toString());
                    }
                }
                break;
            case 'bishop':
                let fileB = file;
                let rowB = row;
                while (fileB + 1 <= 8 && rowB + 1 <= 8) {
                    legalMoves.push((fileB + 1).toString() + (rowB + 1).toString());
                    if (document.getElementById((fileB + 1).toString() + (rowB + 1).toString()).children.length !== 0) {
                        break;
                    }
                    fileB++;
                    rowB++;
                }
                fileB = file;
                rowB = row;
                while (fileB + 1 <= 8 && rowB - 1 > 0) {
                    legalMoves.push((fileB + 1).toString() + (rowB - 1).toString());
                    if (document.getElementById((fileB + 1).toString() + (rowB - 1).toString()).children.length !== 0) {
                        break;
                    }
                    fileB++;
                    rowB--;
                }
                fileB = file;
                rowB = row;
                while (fileB - 1 > 0 && rowB + 1 <= 8) {
                    legalMoves.push((fileB - 1).toString() + (rowB + 1).toString());
                    if (document.getElementById((fileB - 1).toString() + (rowB + 1).toString()).children.length !== 0) {
                        break;
                    }
                    fileB--;
                    rowB++;
                }
                fileB = file;
                rowB = row;
                while (fileB - 1 > 0 && rowB - 1 > 0) {
                    legalMoves.push((fileB - 1).toString() + (rowB - 1).toString());
                    if (document.getElementById((fileB - 1).toString() + (rowB - 1).toString()).children.length !== 0) {
                        break;
                    }
                    fileB--;
                    rowB--;
                }
                break;
            case 'rook':
                let fileR = file;
                let rowR = row;
                while (fileR + 1 <= 8) {
                    legalMoves.push((fileR + 1).toString() + rowR.toString());
                    if (document.getElementById((fileR + 1).toString() + rowR.toString()).children.length !== 0) {
                        break;
                    }
                    fileR++;
                }
                fileR = file;
                rowR = row;
                while (fileR - 1 > 0) {
                    legalMoves.push((fileR - 1).toString() + rowR.toString());
                    if (document.getElementById((fileR - 1).toString() + rowR.toString()).children.length !== 0) {
                        break;
                    }
                    fileR--;
                }
                fileR = file;
                rowR = row;
                while (rowR + 1 <= 8) {
                    legalMoves.push(fileR .toString() + (rowR + 1).toString());
                    if (document.getElementById(fileR.toString() + (rowR + 1).toString()).children.length !== 0) {
                        break;
                    }
                    rowR++;
                }
                fileR = file;
                rowR = row;
                while (rowR - 1 > 0) {
                    legalMoves.push(fileR .toString() + (rowR - 1).toString());
                    if (document.getElementById(fileR.toString() + (rowR - 1).toString()).children.length !== 0) {
                        break;
                    }
                    rowR--;
                }
                break;
            case 'queen':
                let fileQ = file;
                let rowQ = row;
                while (fileQ + 1 <= 8 && rowQ + 1 <= 8) {
                    legalMoves.push((fileQ + 1).toString() + (rowQ + 1).toString());
                    if (document.getElementById((fileQ + 1).toString() + (rowQ + 1).toString()).children.length !== 0) {
                        break;
                    }
                    fileQ++;
                    rowQ++;
                }
                fileQ = file;
                rowQ = row;
                while (fileQ + 1 <= 8 && rowQ - 1 > 0) {
                    legalMoves.push((fileQ + 1).toString() + (rowQ - 1).toString());
                    if (document.getElementById((fileQ + 1).toString() + (rowQ - 1).toString()).children.length !== 0) {
                        break;
                    }
                    fileQ++;
                    rowQ--;
                }
                fileQ = file;
                rowQ = row;
                while (fileQ - 1 > 0 && rowQ + 1 <= 8) {
                    legalMoves.push((fileQ - 1).toString() + (rowQ + 1).toString());
                    if (document.getElementById((fileQ - 1).toString() + (rowQ + 1).toString()).children.length !== 0) {
                        break;
                    }
                    fileQ--;
                    rowQ++;
                }
                fileQ = file;
                rowQ = row;
                while (fileQ - 1 > 0 && rowQ - 1 > 0) {
                    legalMoves.push((fileQ - 1).toString() + (rowQ - 1).toString());
                    if (document.getElementById((fileQ - 1).toString() + (rowQ - 1).toString()).children.length !== 0) {
                        break;
                    }
                    fileQ--;
                    rowQ--;
                }
                fileQ = file;
                rowQ = row;
                while (fileQ + 1 <= 8) {
                    legalMoves.push((fileQ + 1).toString() + rowQ.toString());
                    if (document.getElementById((fileQ + 1).toString() + rowQ.toString()).children.length !== 0) {
                        break;
                    }
                    fileQ++;
                }
                fileQ = file;
                rowQ = row;
                while (fileQ - 1 > 0) {
                    legalMoves.push((fileQ - 1).toString() + rowQ.toString());
                    if (document.getElementById((fileQ - 1).toString() + rowQ.toString()).children.length !== 0) {
                        break;
                    }
                    fileQ--;
                }
                fileQ = file;
                rowQ = row;
                while (rowQ + 1 <= 8) {
                    legalMoves.push(fileQ .toString() + (rowQ + 1).toString());
                    if (document.getElementById(fileQ.toString() + (rowQ + 1).toString()).children.length !== 0) {
                        break;
                    }
                    rowQ++;
                }
                fileQ = file;
                rowQ = row;
                while (rowQ - 1 > 0) {
                    legalMoves.push(fileQ .toString() + (rowQ - 1).toString());
                    if (document.getElementById(fileQ.toString() + (rowQ - 1).toString()).children.length !== 0) {
                        break;
                    }
                    rowQ--;
                }
                break;
            case 'king':
                if (file + 1 <= 8 && row + 1 <= 8) {
                    legalMoves.push((file + 1).toString() + (row + 1).toString());
                }
                if (file + 1 <= 8 && row - 1 > 0) {
                    legalMoves.push((file + 1).toString() + (row - 1).toString());
                }
                if (file - 1 > 0 && row + 1 <= 8) {
                    legalMoves.push((file - 1).toString() + (row + 1).toString());
                }
                if (file - 1 > 0 && row - 1 > 0) {
                    legalMoves.push((file - 1).toString() + (row - 1).toString());
                }
                if (file + 1 <= 8) {
                    legalMoves.push((file + 1).toString() + row.toString());   
                }
                if (file - 1 > 0) {
                    legalMoves.push((file - 1).toString() + row.toString());
                }
                if (row + 1 <= 8) {
                    legalMoves.push(file.toString() + (row + 1).toString());
                }
                if (row - 1 > 0) {
                    legalMoves.push(file.toString() + (row - 1).toString());
                }
                break;
        }
        return(legalMoves);
    }
    highlight() {
        let legalMoves = this.isLegal();
        for(let i of legalMoves) {
            let legalsquare = document.getElementById(i);
            legalsquare.classList.add('legal');
            legalsquare.setAttribute('legal-piece', this.pieceName);
        }
    }
}

function startingSetup() {
    let pieces = {};
    let pieceCollection = {}
    
    for(let color of ['black', 'white']) {
        let col = 1;
        
        for(let column of ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']) {
            let thisPiece = color + column + 'Pawn';
            let row = color === 'white' ? '2' : '7';
            pieces[thisPiece] = {
                name: thisPiece,
                piece: 'pawn',
                color: color,
                startingPosition: col.toString() + row
            }
            col++;
        }
        for(let i of [2, 7]) {
            let thisPiece = color + i + 'Knight';
            let row = color === 'white' ? '1' : '8';
            pieces[thisPiece] = {
                name: thisPiece,
                piece: 'knight',
                color: color,
                startingPosition: i.toString() + row
            }
        }
        for(let i of [3, 6]) {
            let thisPiece = color + i + 'Bishop';
            let row = color === 'white' ? '1' : '8';
            pieces[thisPiece] = {
                name: thisPiece,
                piece: 'bishop',
                color: color,
                startingPosition: i.toString() + row
            }
        }
        for(let i of [1, 8]) {
            let thisPiece = color + i + 'Rook';
            let row = color === 'white' ? '1' : '8';
            pieces[thisPiece] = {
                name: thisPiece,
                piece: 'rook',
                color: color,
                startingPosition: i.toString() + row
            }
        }
        let thisPiece = color + 'Queen';
        let row = color === 'white' ? '1' : '8';
        pieces[thisPiece] = {
            name: thisPiece,
            piece: 'queen',
            color: color,
            startingPosition: '4' + row
        }
        thisPiece = color + 'King';
        pieces[thisPiece] = {
            name: thisPiece,
            piece: 'king',
            color: color,
            startingPosition: '5' + row
        }
    }
    for(let p in pieces) {
        let newPiece = new Piece(pieces[p].name, pieces[p].piece, pieces[p].color, pieces[p].startingPosition);
        newPiece.place();
        pieceCollection[p] = newPiece;
    }
    return (pieceCollection)
}

function highlight(event) {
    let piece = event.target.id;
    piecesOnBoard[piece].highlight();
}

function addListeners() {
    for (let i in piecesOnBoard) {
        if (document.getElementById(i).classList.contains(turn)) {
            document.getElementById(i).addEventListener('click', highlight);
        }
    }
}

createBoard();
let piecesOnBoard = startingSetup();
let turn = 'white';
console.log(piecesOnBoard);
addListeners();