 
 let buffer = ''; 
 //holds user input before calculation happens

 let lastOperation = ''; 
 //holds operational buttons: +, -, x, /
 //also holds z, if a calculation executed

 let lastCalculation = ''; 
 //array that holds previous calculation result
 //['inputA', 'inputB', 'symbol']
 //index 0 updates with the result, when lastOperation holds z

 let result = ''; 
 //holds the current calculation result

 let display = $('#display'); 
 //calculator number display, shows the result


//click button function
 $('button').click(function() {
    if (this.value) {
            //if the buffer ends with an operation symbol
            //and the lastOperation is not blank,
            //and the buffer length is greater than 1
            //display the value (numbers) the user input
        if (buffer.endsWith(lastOperation) && lastOperation != '' && buffer.length > 1) {
            display.val(this.value);
        } else {
            display.val(display.val() + this.value);
        }

        if (lastOperation == 'z') {
            buffer = lastOperation = '';
            display.val(this.value);
            //if lastOperation holds an executed calculation value
                //clear buffer and lastOperation
                //and show the calculation value on the display
        }

        buffer = buffer + this.value;

    } else {

        let buttonSymbol = $(this).text();
            //when the symbol buttons are clicked, it will take the text value of that button
            
        if (buttonSymbol === '=') {
            calculate();
            //if = button is pressed, run the calculate function

        } else if (buttonSymbol === 'C') {
            //if C button is pressed, clear display, buffer, and lastOperation
            buffer = lastOperation = '';
            display.val('');

        } else {
            if (buffer.endsWith(lastOperation) && lastOperation != '') {
                buffer = buffer.slice(0, -1) 
                //if buffer ends with an operation symbol
                //start at 0 index, and remove the last character (symbol) in the buffer array
            }

            if (buttonSymbol == 'x') {
                buttonSymbol = '*'
                // this just swaps the letter x of button to * multiply symbol for calculations
            }
            
            //if there are two operands and the user inputs another operation symbol
            //calculate the first two operands
            let operands = buffer.split(lastOperation);
            if (operands.length == 2 && lastOperation != '') {
                calculate();
            }

            lastOperation = buttonSymbol;
            //after clicking a button, save the last operation symbol
            buffer = buffer + buttonSymbol;
            //add the last operation symbol to the buffer
        }
    }
 });



 //calculate function
 function calculate() {

    if(lastOperation == 'z') {

        result = 
            (result + lastCalculation[lastCalculation.length - 1]) 
            +
            (lastCalculation[lastCalculation.length - 2]);
                //when there is a result, lastOperation will show a z
                //to continue calculations on top of the result
                //it will take the value of index 0 and index 1 (using index 2 symbol)
                    //which should be the current result
                //and then calculate index 1 (using index 2 symbol) on top of that, which should be
                    //the latest value in the buffer before pressing the = button
                //after pressing the = button, index 1 of lastCalculation will update
        
        result = (new Function('return ' + result)());
            //removes the math expressions held in the buffer, then displays the result
        display.val(result);
            //after execution, sets lastOperation to z
        lastOperation = 'z';
            //then sets buffer to result + next user input
        buffer = result + '';

    } else {
            //if the buffer does not end with lastOperation
        if (!(buffer.endsWith(lastOperation))) {
            //removes the math expressions held in the buffer, then displays the result
            result = (new Function('return ' + buffer)());

            if (lastOperation == '/') {
                result = result.toFixed(2); //rounds to 2 decimal places
            }
                //this will split the buffer values
                //and put them into an array called lastCalculation
            lastCalculation = buffer.split(lastOperation);
                //then the last index(2) of the array will be the operation symbol
            lastCalculation[lastCalculation.length] = lastOperation;

            if (isNaN(result)) {
                buffer = lastOperation = '';
                //if the result is not a number, clear the buffer and lastOperation

            } else {
                    //set the display showing the result
                display.val(result);
                    //set lastOperation to z to show it executed the calculation
                lastOperation ='z';
                    //then sets buffer to result + next user input
                buffer = result + '';

            }
        }
    }
}