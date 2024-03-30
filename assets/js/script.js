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
        this.moved = false;
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
    generateLegalMoves() {
        return []
    }
    file() {
        return Number(this.position.charAt(0));
    }
    row() {
        return Number(this.position.charAt(1));
    }
    legalMoves() {
        let legalMoves = this.generateLegalMoves();
        let legalMovesLoop = [];
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
    enPassant() {
    }
    casteling() {

    }
    move(newPosition) {
        let legalMoves = this.legalMoves();
        if (legalMoves.includes(newPosition)) {
            if (document.getElementById(newPosition).children.length !== 0) {
                let capturedPiece = document.getElementById(newPosition).children[0];
                piecesOnBoard[capturedPiece.id].isCaptured();
            }
            this.enPassant(newPosition);
            this.casteling(newPosition);
            this.remove();
            this.position = newPosition;
            this.place();
            this.moved = true;
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
        movesSinceCapture = 0;
        this.remove();
        capturedPieces[this.pieceName] = piecesOnBoard[this.pieceName];
        delete piecesOnBoard[this.pieceName];
    }
    highlight() {
        let legalMoves = this.legalMoves();
        for(let i of legalMoves) {
            let legalsquare = document.getElementById(i);
            legalsquare.classList.add('legal');
            legalsquare.setAttribute('legal-piece', this.pieceName);
        }
    }
}

class Pawn extends Piece {
    constructor(pieceName, color, startingPosition) {
        super(pieceName, 'pawn', color, startingPosition);
        this.url = 'assets/images/' + this.color + '-pawn.svg';
    }

    generateLegalMoves() {
        let legalMoves = [];
        let file = this.file();
        let row = this.row();
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
        return legalMoves;
    }

    enPassant(newPosition) {
        if (enPassant !== '') {
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

    promote (piece) {
        let name = this.color + 'Promoted' + piece;
        switch (piece) {
            case 'knight':
                piecesOnBoard[name] = new Knight(name, this.color, this.position);
                break;
            case 'bishop':
                piecesOnBoard[name] = new Bishop(name, this.color, this.position);
                break;
            case 'rook':
                piecesOnBoard[name] = new Rook(name, this.color, this.position);
                break;
            case 'queen':
                piecesOnBoard[name] = new Queen(name, this.color, this.position);
                break;
        }
        this.remove();
        piecesOnBoard[name].place();
    }
}

class Knight extends Piece {
    constructor(pieceName, color, startingPosition) {
        super(pieceName, 'knight', color, startingPosition);
        this.url = 'assets/images/' + this.color + '-knight.svg';
    }

    generateLegalMoves() {
        let legalMoves = [];
        let file = this.file();
        let row = this.row();
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
        return legalMoves;
    }
}

class Bishop extends Piece {
    constructor(pieceName, color, startingPosition) {
        super(pieceName, 'bishop', color, startingPosition);
        this.url = 'assets/images/' + this.color + '-bishop.svg';
    }

    generateLegalMoves() {
        let legalMoves = [];
        let file = this.file();
        let row = this.row();
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
        return legalMoves;
    }
}

class Rook extends Piece {
    constructor(pieceName, color, startingPosition) {
        super(pieceName, 'rook', color, startingPosition);
        this.url = 'assets/images/' + this.color + '-rook.svg';
    }

    generateLegalMoves() {
        let legalMoves = [];
        let file = this.file();
        let row = this.row();
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
        return legalMoves;
    }
}

class Queen extends Piece {
    constructor(pieceName, color, startingPosition) {
        super(pieceName, 'queen', color, startingPosition);
        this.url = 'assets/images/' + this.color + '-queen.svg';
    }
    
    generateLegalMoves() {
        let legalMoves = [];
        let file = this.file();
        let row = this.row();
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
        return legalMoves;
    }
}

class King extends Piece {
    constructor(pieceName, color, startingPosition) {
        super(pieceName, 'king', color, startingPosition);
        this.url = 'assets/images/' + this.color + '-king.svg';
    }

    generateLegalMoves() {
        let legalMoves = [];
        let file = this.file();
        let row = this.row();
        if (!this.moved) {
            if (!isCheck(this.color, (file + 1).toString() + row.toString())) {
                let fileK = file;
                while (fileK + 1 <= 8) {
                    
                    if (document.getElementById((fileK + 1).toString() + row.toString()).children.length !== 0) {
                        let piece = document.getElementById((fileK + 1).toString() + row.toString()).children[0].id;
                        if (piecesOnBoard[piece].piece === 'rook' && !piecesOnBoard[piece].moved) {
                            legalMoves.push((file + 2).toString() + row.toString())
                        }
                        break;
                    }
                    fileK++;
                }
            }
            if (!isCheck(this.color, (file - 1).toString() + row.toString())) {
                let fileK = file;
                while (fileK - 1 > 0) {
                    if (document.getElementById((fileK - 1).toString() + row.toString()).children.length !== 0) {
                        let piece = document.getElementById((fileK - 1).toString() + row.toString()).children[0].id;
                        if (piecesOnBoard[piece].piece === 'rook' && !piecesOnBoard[piece].moved) {
                            legalMoves.push((file - 2).toString() + row.toString())
                        }
                        break;
                    }
                    fileK--;
                }
            }
            
        }
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
        return legalMoves;
    }

    casteling(newPosition) {
        if (newPosition === (Number(this.position.charAt(0)) + 2).toString() + this.position.charAt(1)) {
            let rook = document.getElementById('8' + this.position.charAt(1)).children[0].id;
            piecesOnBoard[rook].move('6' + this.position.charAt(1))
        } else if (newPosition === (Number(this.position.charAt(0)) - 2).toString() + this.position.charAt(1)) {
            let rook = document.getElementById('1' + this.position.charAt(1)).children[0].id;
            piecesOnBoard[rook].move('4' + this.position.charAt(1))
        }
    }
}

function startingSetup() {
    let pieceCollection = {}
    for (let color of ['black', 'white']) {
        /* pawns */
        let col = 1;
        for(let column of ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']) {
            let thisPiece = color + column + 'Pawn';
            let row = color === 'white' ? '2' : '7';
            pieceCollection[thisPiece] = new Pawn(thisPiece, color, col.toString() + row);
            pieceCollection[thisPiece].place();
            col++;
        }
        /* knights */
        for(let i of [2, 7]) {
            let thisPiece = color + i + 'Knight';
            let row = color === 'white' ? '1' : '8';
            pieceCollection[thisPiece] = new Knight(thisPiece, color, i.toString() + row);
            pieceCollection[thisPiece].place();
        }
        /* bishops */
        for(let i of [3, 6]) {
            let thisPiece = color + i + 'Bishop';
            let row = color === 'white' ? '1' : '8';
            pieceCollection[thisPiece] = new Bishop(thisPiece, color, i.toString() + row);
            pieceCollection[thisPiece].place();
        }
        /* rooks */
        for(let i of [1, 8]) {
            let thisPiece = color + i + 'Rook';
            let row = color === 'white' ? '1' : '8';
            pieceCollection[thisPiece] = new Rook(thisPiece, color, i.toString() + row);
            pieceCollection[thisPiece].place();
        }
        /* queen */
        let thisPiece = color + 'Queen';
        let row = color === 'white' ? '1' : '8';
        pieceCollection[thisPiece] = new Queen(thisPiece, color, '4' + row);
        pieceCollection[thisPiece].place();
        /* king */
        thisPiece = color + 'King';
        pieceCollection[thisPiece] = new King(thisPiece, color, '5' + row);
        pieceCollection[thisPiece].place();
    }
    return (pieceCollection)
}

function boardState() {
    let board = [];
    for (let r = 1; r <= 8; r++) {
        for(let f = 1; f <= 8; f++) {
            let square = document.getElementById(f.toString() + r.toString());
            if (square.children.length !== 0) {
                let pieceName = square.children[0].id;
                board.push(piecesOnBoard[pieceName].color + piecesOnBoard[pieceName].piece);
            } else {
                board.push('');
            }
        }
    }
    return board;
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
    let rowB = row;
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

function searchArray(arr1, arr2) {
    let contains = false;
    for (let i of arr1) {
        if (i.toString() === arr2.toString()) {
            contains = true;
        }
    }
    
    return contains;
}

function moveToClicked(event) {
    let clicked;
    let piece;
    let enPassantable = false;
    movesSinceCapture++;
    if (!interval) {
        timer();
    }
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
    let board = boardState();
    if (searchArray(previousPositions, board)) {
        repeatedPositions.push(board);
        previousPositions.push(board);
    } else {
        previousPositions.push(board);
    }
    piecesOnBoard[piece].move(clicked);
    promotionOverlay(piece, clicked);
    if (!enPassantable) {
        enPassant = '';
    }
    removeListeners();
    removeHighlight();
    if (document.getElementsByClassName('check').length !== 0) {
        document.getElementsByClassName('check')[0].classList.remove('check');
    }
    turn = turn === 'white' ? 'black' : 'white';
    flipBoard();
    addIncrement();
    
    if (isCheck(turn, document.getElementById(turn + 'King').parentNode.id)) {
        document.getElementById(turn + 'King').parentNode.classList.add('check');
    }
    checkEndConditions();
    addListeners();
}

function promotionOverlay(piece, clicked) {
    if (piecesOnBoard[piece].piece === 'pawn') {
        if (clicked.charAt(1) === '8' || clicked.charAt(1) === '1') {
            let overlayDiv = document.createElement('div');
            let messageField = document.createElement('div');
            overlayDiv.setAttribute('id', 'overlay');
            messageField.setAttribute('id', 'messagefield');
            for (let i of ['knight', 'bishop', 'rook', 'queen']) {
                let possiblePiece = document.createElement('img');
                possiblePiece.setAttribute('class', 'promotionimage');
                possiblePiece.setAttribute('id', i);
                possiblePiece.setAttribute('name', piece);
                possiblePiece.setAttribute('src', 'assets/images/' + turn + '-' + i + '.svg');
                possiblePiece.setAttribute('alt', i);
                possiblePiece.addEventListener('click', promotePawn);
                messageField.appendChild(possiblePiece);
            }
            overlayDiv.appendChild(messageField);
            document.getElementById('board').appendChild(overlayDiv);
        }
    }
}

function addIncrement() {
    if (turn === 'white') {
        moveCount++;
        turn = 'black';
        blackSecondsLeft = blackSecondsLeft + 1 + increment;
        countdown();
        turn = 'white';
    } else {
        turn = 'white';
        whiteSecondsLeft = whiteSecondsLeft + 1 + increment;
        countdown();
        turn = 'black';
    }
}

function checkEndConditions() {
    let movesLeft = false;
    for (let i in piecesOnBoard) {
        if(piecesOnBoard[i].color === turn) {
            let legalMoves = piecesOnBoard[i].legalMoves();
            if (legalMoves.length !== 0) {
                movesLeft = true;
            }
        }    
    }
    if (!movesLeft) {
        console.log('end')
        if (isCheck(turn, document.getElementById(turn + 'King').parentNode.id)) {
            gameEnding('Checkmate!!!!');
        } else {
            gameEnding('Stalemate!!!!');
        }
    }
    if (movesSinceCapture >= 100) {
        gameEnding('50 moves since last capture');
    }

    if (searchArray(repeatedPositions, boardState())) {
        gameEnding('3 time repetition');
    }
}

function promotePawn(event) {
    movesSinceCapture = 0;
    let promote = event.target.id;
    let pawn = event.target.name;
    for (let i = 0; i < document.getElementsByClassName('promotionimage').length; i++) {
        if (document.getElementsByClassName('promotionimage')[i] !== promote) {
            document.getElementsByClassName('promotionimage')[i].removeEventListener('click', promotePawn);
        }
    }
    document.getElementById('promote').remove();
    piecesOnBoard[pawn].promote(promote);
    delete piecesOnBoard[pawn];
    if (isCheck(turn, document.getElementById(turn + 'King').parentNode.id)) {
        document.getElementById(turn + 'King').parentNode.classList.add('check');
    }
}

function gameEnding(message) {
    removeListeners();
    clearInterval(intervalID);
    let overlayDiv = document.createElement('div');
    let messageField = document.createElement('div');
    overlayDiv.setAttribute('id', 'overlay');
    messageField.setAttribute('id', 'messagefield');
    messageField.innerHTML = `<h1>${message}</h1>`;
    overlayDiv.appendChild(messageField);
    document.getElementById('board').appendChild(overlayDiv);
    overlayDiv.addEventListener('click', () => {document.getElementById('messagefield').remove()})
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

function startingtimes() {
    turn = 'white';
    countdown();
    turn = 'black';
    countdown();
    turn = 'white';
}

function countdown () {
    let minutes = document.getElementById(turn + '-minutes');
    let seconds = document.getElementById(turn + '-seconds');
    if (turn === 'white') {
        minutes.innerHTML = Math.floor(whiteSecondsLeft / 60).toString().padStart(2, '0');
        seconds.innerHTML = (whiteSecondsLeft % 60).toString().padStart(2, '0');
        if (whiteSecondsLeft === 0) {
            gameEnding('White ran out of time');
        }
        whiteSecondsLeft--;
        
    } else {
        minutes.innerHTML = Math.floor(blackSecondsLeft / 60).toString().padStart(2, '0');
        seconds.innerHTML = (blackSecondsLeft % 60).toString().padStart(2, '0');
        if (blackSecondsLeft === 0) {
            gameEnding('Black ran out of time');
        }
        blackSecondsLeft--;
    }
}

function timer() {
    intervalID = setInterval(countdown, 1000);
    interval = true;
}

function flipBoard() {
    if (flip) {
        if (turn === 'black') {
            document.getElementById('board').classList.add('reverse')
        } else {
            document.getElementById('board').classList.remove('reverse')
        }
    }
}

function numberInputs() {
    let fields = document.getElementsByClassName('num-input');
    console.log(fields);
    console.log(fields.length);
    for (let i = 0; i < fields.length; i++) {
        fields[i].getElementsByClassName('num-up')[0].addEventListener('click', numUp);
        fields[i].getElementsByClassName('num-down')[0].addEventListener('click', numDown);
    }
    console.log('test')
}

function numUp(event) {
    let num = event.target.parentNode.getElementsByClassName('number')[0];
    num.value = parseInt(num.value) + 1;
}

function numDown(event) {
    let num = event.target.parentNode.getElementsByClassName('number')[0];
    if (parseInt(num.value) > 0) {
        num.value = parseInt(num.value) - 1;
    }
}

function applySettings(event) {
    event.preventDefault();
    timeControl = parseInt(document.getElementById('time-minutes').value) * 60;
    let player1Name = document.getElementById('player1-name').value;
    let player2Name = document.getElementById('player2-name').value;
    document.getElementById('name1').innerHTML = player1Name;
    document.getElementById('name2').innerHTML = player2Name;
    increment = parseInt(document.getElementById('increment').value);
    whiteSecondsLeft = timeControl;
    blackSecondsLeft = timeControl;
    if (document.getElementById('flip').checked) {
        flip = true;
    }
    document.getElementById('setting-container').remove();
    startingtimes();
    addListeners();
}

function settings() {
    let overlay = document.createElement('div');
    overlay.setAttribute('class', 'overlay');
    overlay.setAttribute('id', 'setting-container')
    overlay.innerHTML = 
        `<div id="settings">
            <h1>Game Settings</h1>
            <form action="post" id="settings-form">
                <label for="player1-name">Player 1 Name:</label>
                <input type="text" name="player1" id="player1-name" value="Player 1">
                <label for="player2-name">Player 2 Name:</label>
                <input type="text" name="player2" id="player2-name" value="Player 2">
                <div class="input-container">
                    <label for="time-minutes">Time control (minutes)</label>
                    <div class="num-input">
                        <p class="num-up">^</p>
                        <input type="number" name="minutes" id="time-minutes" value="10" class="number">
                        <p class="num-down">^</p>
                    </div>
                </div>
                <div class="input-container">
                    <label for="increment">Increment</label>
                    <div class="num-input">
                        <p class="num-up">^</p>
                        <input type="number" name="increment" id="increment" value="0" class="number">
                        <p class="num-down">^</p>
                    </div>
                </div>
                <div class="input-container">
                    <label for="flip">Flip board</label>
                    <input type="checkbox" name="flip" id="flip">
                </div>
                <input type="button" value="Start Game" id="start-game">
            </form>
        </div>`;
    document.getElementById('main-content').appendChild(overlay);
    numberInputs();
    document.getElementById('start-game').addEventListener('click', applySettings)
}

function reset() {
    let square = document.getElementsByClassName('square');
    console.log(square.length);
    for (let i = 0; i < square.length; i++) {
        if (square[i].children.length !== 0) {
            square[i].removeChild(square[i].children[0]);
        }
    }
    clearInterval(intervalID);
    piecesOnBoard = startingSetup();
    previousPositions = [];
    repeatedPositions = [];
    capturedPieces = {};
    enPassant = '';
    moveCount = 1;
    movesSinceCapture = 0;
    turn = 'white';
    interval = false;
    whiteSecondsLeft = timeControl;
    blackSecondsLeft = timeControl;
    startingtimes();
    addListeners();
}


createBoard();
let piecesOnBoard = startingSetup();
let previousPositions = [];
let repeatedPositions = [];
let capturedPieces = {};
let enPassant = '';
let moveCount = 1;
let movesSinceCapture = 0;
let turn = 'white';
let intervalID;
let interval = false;
let timeControl;
let whiteSecondsLeft;
let blackSecondsLeft;
let increment;
let flip = false;

document.addEventListener("DOMContentLoaded", settings);
document.getElementById('nav-settings').addEventListener('click', settings);
document.getElementById('nav-reset').addEventListener('click', reset);
console.log(piecesOnBoard);


