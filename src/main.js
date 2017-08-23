//listeners
$(document).ready(function(){
    $('.number, .operator').on('click', dispInpt);
    $('.clear').on('click', clearDisplay);
    $('#equals').on('click', doEquation);
    $(document).on('keyup', keyPressed);

});

//handlers
function dispInpt(){
    var value = getBtnVal();
    var dispArr = dispToArr();
    if(value === '='){
        doEquation();
    } else {
        if(dispArr[0] === ''){
            dispArr[0] = value;
        }
        else {
            dispArr.push(value);
        }
        displayKeyPressed(dispArr);
    }
} 

function clearDisplay() {
    return $('.output').val('');
}

function doEquation() {
    var userInpt = $('.output').val();
    var answer = eval(userInpt).toString();
    return answer;
}

function keyPressed() {
    var currKeyCode = event.keyCode;
    var newArray;
    if(currKeyCode === 13){
        newArray = doEquation();
    } 
    else if(/(4[8-9]|5[0-7])/.test(currKeyCode)) {
        newArray = numberKeys(48, currKeyCode, dispToArr());
    }
    else if(/(9[6-9]|1[0][0-5])/.test(currKeyCode)){
        newArray = numberKeys(96, currKeyCode, dispToArr());
    }
    //backspace/delete key
    else if(currKeyCode === 8) {
       newArray = backspace();
    }
    else if(currKeyCode === 189){
        newArray = keyChar('-');
    }
    else if(currKeyCode === 187){
        if(event.shiftKey === true){
            newArray = keyChar('+');
        }
        else {
            newArray = doEquation();
        }
    }
    else if(currKeyCode === 191){
        newArray = keyChar('/');
    }
    else if(currKeyCode === 88){
        newArray = keyChar('x');
    }
    displayKeyPressed(newArray);
}



//utility
function dispToArr(){
    var dispArr = $('.output').val().split(''); 
    return dispArr;
}

function getBtnVal(){
    return $(document.activeElement).text();
}

function keyChar(character){
    var dispArr = dispToArr();
    dispArr.push(character);
    return dispArr;
}

function numberKeys(number, currKeyCode, dispArr){
    var num = (currKeyCode - number).toString();
    if(dispArr[0] === ''){
        dispArr[0] = num;
    }
    else {
        dispArr.push(num);
    }
    return dispArr;
}

function displayKeyPressed(array){
    var dispTxt = array.join('');
    $('.output').val(dispTxt);
}

function backspace() {
    var dispStr = $('.output').val();
    var dispTxt = dispStr.slice(0,-1);
    return dispTxt.split('');
}


