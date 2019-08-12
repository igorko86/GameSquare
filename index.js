class Field {
    constructor(width, height, node, classElement) {
        this.width = width
        this.height = height
        this.node = node
        this.classElement = classElement
    }

    createElement() {
        let element = document.createElement('div');

        element.style.width = this.width + 'px';
        element.style.height = this.height + 'px';
        element.className = this.classElement;

        return element;
    }

    createField() {
        let element = this.createElement();

        this.node.appendChild(element);
    }

}

Field.FIELD_WIDTH = 200;
Field.FIELD_HEIGHT = 200;

let field = new Field(Field.FIELD_WIDTH, Field.FIELD_HEIGHT, document.body, 'field');
field.createField()

class Square extends Field {

    constructor(width, height, color, node, classElement) {
        super(width, height, node, classElement);
        this.color = color;
        let nodes = document.querySelectorAll(".square");
    }

    createGoodSquare() {
        let element = super.createElement(),
            { coordinateX, coordinateY } = this._createCoordinates();

        element.style.background = this.color;
        element.style.top = coordinateY + "px";
        element.style.left = coordinateX + "px";
        this.node.appendChild(element);

        return element;
    }

    _createCoordinates() {
        let y = this.randomNumber(9),
            x = this.randomNumber(9);

        y > 0 ? y *= this.height : 0;
        x > 0 ? x *= this.width : 0;

        while (this._checkCoordinates(y, x)) {
            y = this.randomNumber(9);
            x = this.randomNumber(9);
            y > 0 ? y *= this.height : 0;
            x > 0 ? x *= this.width : 0;
        }

        return { coordinateX: x, coordinateY: y };
    }

    _checkCoordinates(y, x) {
        let nodes = document.querySelectorAll(".square");

        return [...nodes].some(el => (el.offsetTop === y && el.offsetLeft === x));
    }


    moveSquare(element) {
        let number,
            moveNumber,
            changedNumber = null;

        this.timer = setInterval(() => {
            moveNumber = this.randomNumber(4);

            while (moveNumber !== changedNumber) {
                switch (moveNumber) {
                    case 0:
                        number = element.offsetTop - this.height;

                        if (!this.isCheckEndField(number) && !this._checkCoordinates(number, element.offsetLeft)) {
                            element.style.top = number + 'px';
                            changedNumber = moveNumber;
                        } else {
                            changedNumber = moveNumber++;
                            //this.stopSquare();
                        }

                        break;
                    case 1:
                        number = element.offsetLeft + this.width;

                        if (!this.isCheckEndField(number) && !this._checkCoordinates(element.offsetTop, number)) {
                            element.style.left = number + 'px';
                            changedNumber = moveNumber;
                        } else {
                            changedNumber = moveNumber++;
                            // this.stopSquare();
                        }

                        break;
                    case 2:
                        number = element.offsetTop + this.height;

                        if (!this.isCheckEndField(number) && !this._checkCoordinates(number, element.offsetLeft)) {
                            element.style.top = number + 'px';
                            changedNumber = moveNumber;
                        } else {
                            changedNumber = moveNumber++;
                            //this.stopSquare();
                        }

                        break;
                    case 3:
                        number = element.offsetLeft - this.width;

                        if (!this.isCheckEndField(number) && !this._checkCoordinates(element.offsetTop, number)) {
                            element.style.left = number + 'px';
                            changedNumber = moveNumber;
                        } else {
                            moveNumber = 0;
                            // this.stopSquare();
                        }

                        break;
                }
            }

        }, 1000)
    }
    _ckeckPositionSquares(square) {
        return this._checkCoordinates(square.offsetLeft, square.offsetTop);
    }

    stopSquare() {
        clearInterval(this.timer)
        console.log(stop);
    }

    randomNumber(number) {
        return Math.floor(Math.random() * number)
    }

    isCheckEndField(number) {
        return (number < 0 || number >= field.width || number >= field.height)
    }
}

function createSquares(number) {

    for (let i = 0; i < number; i++) {
        let object = new Square(20, 20, createColor(i), document.querySelector('.field'), 'square');
        let square = object.createGoodSquare();
        object.moveSquare(square);

    }
}

function createColor(i) {
    let colorsArray = ["red", "orange", "green", "blue", "purple"];

    return colorsArray[i];
}
createSquares(5);