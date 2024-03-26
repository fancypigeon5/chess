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
                this.url = 'assets/images/' + this.color + '-pawn.svg';
                break;
            case 'knight':
                this.url = 'assets/images/' + this.color + '-knight.svg';
                break;
            case 'bishop':
                this.url = 'assets/images/' + this.color + '-bishop.svg';
                break;
            case 'rook':
                this.url = 'assets/images/' + this.color + '-rook.svg';
                break;
            case 'queen':
                this.url = 'assets/images/' + this.color + '-queen.svg';
                break;
            case 'king':
                this.url = 'assets/images/' + this.color + '-king.svg';
                break;
        }
    }
    place() {
        let parentSquare = document.getElementById(this.position);
        let pieceDisplayed = document.createElement('img');
        pieceDisplayed.setAttribute('class', 'piece ' + this.color + ' ' + this.piece);
        pieceDisplayed.setAttribute('id', this.pieceName);
        pieceDisplayed.setAttribute('src', this.url)
        pieceDisplayed.setAttribute('alt', this.color + this.piece)
        parentSquare.appendChild(pieceDisplayed);
    }
    isLegal() {
        let legalMoves = [];
        let legalMovesLoop = [];
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
                        if (enPassant.length !== 0) {
                            if ((file + 1).toString() + (row).toString() === enPassant) {
                                legalMoves.push((file + 1).toString() + (row + 1).toString())
                            }
                        }
                    } else {
                        if (document.getElementById((file + 1).toString() + (row - 1).toString()).children.length !== 0) {
                            if (!document.getElementById((file + 1).toString() + (row - 1).toString()).children[0].classList.contains(this.color)) {
                                legalMoves.push((file + 1).toString() + (row - 1).toString());
                            }
                        }
                        if (enPassant.length !== 0) {
                            if ((file + 1).toString() + (row).toString() === enPassant) {
                                legalMoves.push((file + 1).toString() + (row - 1).toString())
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
                        if (enPassant.length !== 0) {
                            if ((file - 1).toString() + (row).toString() === enPassant) {
                                legalMoves.push((file - 1).toString() + (row + 1).toString())
                            }
                        }
                    } else {
                        if (document.getElementById((file - 1).toString() + (row - 1).toString()).children.length !== 0) {
                            if (!document.getElementById((file - 1).toString() + (row - 1).toString()).children[0].classList.contains(this.color)) {
                                legalMoves.push((file - 1).toString() + (row - 1).toString());
                            }
                        }
                        if (enPassant.length !== 0) {
                            if ((file - 1).toString() + (row).toString() === enPassant) {
                                legalMoves.push((file - 1).toString() + (row - 1).toString())
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
        for (let i of legalMoves) {
            let isOccupied = document.getElementById(i).children.length !== 0;
            if (isOccupied) {
                let occupiedBy = !document.getElementById(i).children[0].classList.contains(this.color);
                if (occupiedBy) {
                    legalMovesLoop.push(i);
                }
            } else {
                legalMovesLoop.push(i);
            }
        }
        legalMoves = this.moveCheck(legalMovesLoop);
        return(legalMoves);
    }
    move(newPosition) {
        let legalMoves = this.isLegal();
        if (legalMoves.includes(newPosition)) {
            if (document.getElementById(newPosition).children.length !== 0) {
                let capturedPiece = document.getElementById(newPosition).children[0];
                piecesOnBoard[capturedPiece.id].isCaptured();
            }
            if (enPassant !== '') {
                if (this.piece === 'pawn') {
                    if (this.color === 'white') {
                        if (newPosition === enPassant.charAt(0) + (Number(enPassant.charAt(1)) + 1).toString()) {
                            let capturedPiece = document.getElementById(enPassant).children[0];
                            piecesOnBoard[capturedPiece.id].isCaptured();
                        } 
                    } else {
                        if (newPosition === enPassant.charAt(0) + (Number(enPassant.charAt(1)) - 1).toString()) {
                            let capturedPiece = document.getElementById(enPassant).children[0];
                            piecesOnBoard[capturedPiece.id].isCaptured();
                        } 
                    }
                }
            }
            this.remove();
            this.position = newPosition;
            this.place();
        } else {
            alert('Illegal move!');
        }
    }
    moveCheck(moveList) {
        let notCheckMoves = [];
        let tempCapture = '';
        let position = this.position;
        for (let i of moveList) {
            if (document.getElementById(i).children.length !== 0) {
                tempCapture = piecesOnBoard[document.getElementById(i).children[0].id].tempCaptured();
                this.remove();
                this.position = i;
                this.place();
                if (!isCheck(this.color, document.getElementById(this.color + 'King').parentNode.id)) {
                    notCheckMoves.push(i);
                }
                this.remove();
                this.position = position;
                this.place();
                piecesOnBoard[tempCapture].place();
            } else {
                this.remove();
                this.position = i;
                this.place();
                if (!isCheck(this.color, document.getElementById(this.color + 'King').parentNode.id)) {
                    notCheckMoves.push(i);
                }
                this.remove();
                this.position = position;
                this.place();
            }
        }
        return (notCheckMoves);
    }
    tempCaptured() {
        this.remove();
        return (this.pieceName)
    }
    remove() {
        let parentSquare = document.getElementById(this.position);
        let piece = parentSquare.children[0];
        parentSquare.removeChild(piece);
    }
    isCaptured() {
        this.remove();
        capturedPieces[this.pieceName] = piecesOnBoard[this.pieceName];
        delete piecesOnBoard[this.pieceName];
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

function isCheck(color, square) {
    let inCheck = false;
    let file = Number(square.charAt(0));
    let row = Number(square.charAt(1));
    /* pawn */
    let pawnSquares = [];
    if (file + 1 <= 8) {
        if(color === 'white') {
            if (row + 1 <= 8) {
                pawnSquares.push((file + 1).toString() + (row + 1).toString());
            }
        } else {
            if (row - 1 > 0) {
                pawnSquares.push((file + 1).toString() + (row - 1).toString());
            }
        } 
    }
    if (file - 1 > 0) {
        if(this.color === 'white') {
            if(row + 1 <= 8) {
                pawnSquares.push((file - 1).toString() + (row + 1).toString());
            }
            
        } else {
            if (row - 1 > 0) {
                pawnSquares.push((file - 1).toString() + (row - 1).toString());
            }
        }  
    }
    /* Bishop */
    let bishopSquares = [];
    let fileB = file;
    let rowB = file;
    while (fileB + 1 <= 8 && rowB + 1 <= 8) {
        bishopSquares.push((fileB + 1).toString() + (rowB + 1).toString());
        if (document.getElementById((fileB + 1).toString() + (rowB + 1).toString()).children.length !== 0) {
            break;
        }
        fileB++;
        rowB++;
    }
    fileB = file;
    rowB = row;
    while (fileB + 1 <= 8 && rowB - 1 > 0) {
        bishopSquares.push((fileB + 1).toString() + (rowB - 1).toString());
        if (document.getElementById((fileB + 1).toString() + (rowB - 1).toString()).children.length !== 0) {
            break;
        }
        fileB++;
        rowB--;
    }
    fileB = file;
    rowB = row;
    while (fileB - 1 > 0 && rowB + 1 <= 8) {
        bishopSquares.push((fileB - 1).toString() + (rowB + 1).toString());
        if (document.getElementById((fileB - 1).toString() + (rowB + 1).toString()).children.length !== 0) {
            break;
        }
        fileB--;
        rowB++;
    }
    fileB = file;
    rowB = row;
    while (fileB - 1 > 0 && rowB - 1 > 0) {
        bishopSquares.push((fileB - 1).toString() + (rowB - 1).toString());
        if (document.getElementById((fileB - 1).toString() + (rowB - 1).toString()).children.length !== 0) {
            break;
        }
        fileB--;
        rowB--;
    }
    /* Rook */
    let rookSquares = [];
    let fileR = file;
    let rowR = row;
    while (fileR + 1 <= 8) {
        rookSquares.push((fileR + 1).toString() + rowR.toString());
        if (document.getElementById((fileR + 1).toString() + rowR.toString()).children.length !== 0) {
            break;
        }
        fileR++;
    }
    fileR = file;
    rowR = row;
    while (fileR - 1 > 0) {
        rookSquares.push((fileR - 1).toString() + rowR.toString());
        if (document.getElementById((fileR - 1).toString() + rowR.toString()).children.length !== 0) {
            break;
        }
        fileR--;
    }
    fileR = file;
    rowR = row;
    while (rowR + 1 <= 8) {
        rookSquares.push(fileR .toString() + (rowR + 1).toString());
        if (document.getElementById(fileR.toString() + (rowR + 1).toString()).children.length !== 0) {
            break;
        }
        rowR++;
    }
    fileR = file;
    rowR = row;
    while (rowR - 1 > 0) {
        rookSquares.push(fileR .toString() + (rowR - 1).toString());
        if (document.getElementById(fileR.toString() + (rowR - 1).toString()).children.length !== 0) {
            break;
        }
        rowR--;
    }
    /* Knight */
    let knightSquares = [];
    if (file + 2 <= 8) {
        if (row + 1 <= 8) {
            knightSquares.push((file + 2).toString() + (row + 1).toString());
        }
        if (row - 1 > 0) {
            knightSquares.push((file + 2).toString() + (row - 1).toString());
        }
    }
    if (file - 2 > 0) {
        if (row + 1 <= 8) {
            knightSquares.push((file - 2).toString() + (row + 1).toString());                        
        }
        if (row - 1 > 0) {
            knightSquares.push((file - 2).toString() + (row - 1).toString());
        }
    }
    if (row + 2 <= 8) {
        if (file + 1 <= 8) {
            knightSquares.push((file + 1).toString() + (row + 2).toString());
        }
        if (file - 1 > 0) {
            knightSquares.push((file - 1).toString() + (row + 2).toString());
        }
    }
    if (row - 2 > 0) {
        if (file + 1 <= 8) {
            knightSquares.push((file + 1).toString() + (row - 2).toString());
        }
        if (file - 1 > 0) {
            knightSquares.push((file - 1).toString() + (row - 2).toString());
        }
    }

    /* testing */
    for (let i of pawnSquares) {
        let square = document.getElementById(i);
        if (square.children.length !== 0) {
            if (square.children[0].classList.contains('pawn') && !square.children[0].classList.contains(color)) {
                inCheck = true;
            }
        }
    }
    for (let i of knightSquares) {
        let square = document.getElementById(i);
        if (square.children.length !== 0) {
            if (square.children[0].classList.contains('knight') && !square.children[0].classList.contains(color)) {
                inCheck = true;
            }
        }
    }
    for (let i of bishopSquares) {
        let square = document.getElementById(i);
        if (square.children.length !== 0) {
            if (square.children[0].classList.contains('bishop') && !square.children[0].classList.contains(color)) {
                inCheck = true;
            } else if (square.children[0].classList.contains('queen') && !square.children[0].classList.contains(color)) {
                inCheck = true;
            }
        }
    }
    for (let i of rookSquares) {
        let square = document.getElementById(i);
        if (square.children.length !== 0) {
            if (square.children[0].classList.contains('rook') && !square.children[0].classList.contains(color)) {
                inCheck = true;
            } else if (square.children[0].classList.contains('queen') && !square.children[0].classList.contains(color)) {
                inCheck = true;
            }
        }
    }
    return(inCheck);
}

function moveToClicked(event) {
    let clicked;
    let piece;
    let enPassantable = false;
    if (event.target.classList.contains('square')) {
        clicked = event.target.id;
        piece = event.target.getAttribute('legal-piece');
    } else {
        clicked = event.target.parentNode.id;
        piece = event.target.parentNode.getAttribute('legal-piece');
    }
    if (piecesOnBoard[piece].piece === 'pawn' && Math.abs(Number(piecesOnBoard[piece].position.charAt(1)) - Number(clicked.charAt(1))) === 2) {
        enPassant = clicked;
        enPassantable = true;

    }
    piecesOnBoard[piece].move(clicked);
    if (!enPassantable) {
        enPassant = '';
    }
    removeListeners();
    removeHighlight();
    if (document.getElementsByClassName('check').length !== 0) {
        document.getElementsByClassName('check')[0].classList.remove('check');
    }
    turn = turn === 'white' ? 'black' : 'white';
    addListeners();
    if (isCheck(turn, document.getElementById(turn + 'King').parentNode.id)) {
        document.getElementById(turn + 'King').parentNode.classList.add('check');
    }
}

function highlight(event) {
    removeHighlight();
    addListeners();
    let piece = event.target.id;
    event.target.parentNode.classList.add('to-move');
    piecesOnBoard[piece].highlight();
    let possibleMoves = document.getElementsByClassName('legal');
    for (let i = 0; i < possibleMoves.length; i++) {
        if(possibleMoves[i].children.length === 0) {
            possibleMoves[i].addEventListener('click', moveToClicked)
        } else {
            possibleMoves[i].children[0].addEventListener('click', moveToClicked)
        }  
    }
}

function removeHighlight() {
    let squares = document.getElementsByClassName('square');
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].classList.contains('legal')) {
            squares[i].classList.remove('legal');
            squares[i].setAttribute('legal-piece', '')
        } else if (squares[i].classList.contains('to-move')) {
            squares[i].classList.remove('to-move');
        }
        let possibleMoves = document.getElementsByClassName('legal');
        for (let i = 0; i < possibleMoves.length; i++) {
            possibleMoves[i].removeEventListener('click', moveToClicked)
        }
    }
}

function removeListeners() {
    let pieces = document.getElementsByClassName('piece');
    for (let i = 0; i < pieces.length; i++) {
        if (pieces[i].classList.contains(turn)) {
            pieces[i].removeEventListener('click', highlight);
        }
    }
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
let capturedPieces = {};
let enPassant = '';
let turn = 'white';
console.log(piecesOnBoard);
addListeners();