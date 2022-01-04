


class Calculator {
    constructor(previousOperandTextElement, currentOperanTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperanTextElement = currentOperanTextElement;
        this.clear()
    }

     clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
     }
     delete(){
         this.currentOperand = this.currentOperand.toString().slice(0,-1);
     }

     appendNumber(number){
         if(number === '.' && this.currentOperand.includes('.')) return;
          this.currentOperand = this.currentOperand.toString() + number.toString();

     }

     chooseOperation(operation){
         if(this.currentOperand === '') return;
         if(this.previousOperand !== ''){
             this.compute()
         };
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
    }

    compute(){
        let computation;
        let current = parseFloat(this.currentOperand);
        let prev = parseFloat(this.previousOperand);
        if(isNaN(current) || isNaN(prev)) return;

        switch(this.operation){
            case '×':
                computation = current * prev;
                break;
            case '-' :
                computation = prev - current;
                break;
            case '+':
                computation = prev + current;
                break;
            case '÷' :
                computation = prev / current ;
                break;
            default :
            return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }
    getDisplayNumber(number){
           const stringNumber = number.toString();
           const integerDigit = parseFloat(stringNumber.split('.')[0]);
           const decimalDigit = stringNumber.split('.')[1];
           let integerDisplay ;
           if(isNaN(integerDigit)){
               integerDisplay = ' ';
           } else {
               integerDisplay = integerDigit.toLocaleString('en',{
                   maximumFractionDigits : 0
               })
           }
           if(decimalDigit != null){
               return `${integerDisplay}.${decimalDigit}`
           } else{
               return integerDisplay;
           }
    }

     updateDisplay(){
         this.currentOperanTextElement.innerText =this.getDisplayNumber(this.currentOperand);
         if(this.previousOperand != ''){
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
         } else {
             this.previousOperandTextElement.innerText = '';
         }

     }

}




let buttons = document.querySelectorAll(".calcButton");
let operationBtn = document.querySelectorAll('.operation');
let deleteBtn = document.querySelector('.delete');
let clearBtn = document.querySelector('.double');
let equalTo = document.querySelector('.equalTo');
let currentOperanTextElement = document.querySelector('.currentOperand');
let previousOperandTextElement = document.querySelector('.previousOperand');

const calculator = new Calculator(previousOperandTextElement, currentOperanTextElement);

buttons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay()
    })
})
operationBtn.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay()
    })
})

equalTo.addEventListener('click', () =>{
    calculator.compute();
    calculator.updateDisplay();
})

clearBtn.addEventListener('click', () =>{
    calculator.clear();
    calculator.updateDisplay();
});

deleteBtn.addEventListener('click', () =>{
    calculator.delete();
    calculator.updateDisplay();
});
