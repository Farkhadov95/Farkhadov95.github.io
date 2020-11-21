var inputContainer = document.querySelector('.input-container');
var buttonSet = document.querySelectorAll('.percentage-button')
var moderatedButton = document.querySelector('.moderated-btn');
var standartButton = document.querySelector('.standart-btn');
var agressiveButton = document.querySelector('.agressive-btn');
var depositRange = inputContainer.querySelector('#deposit-range');
var depositValue = document.querySelector('.deposit__value');
var incomePerMonth = document.querySelector('.income__per-month');
var incomePerYear = document.querySelector('.income__per-year');
var percent = 9;

function updateDeposit() {
    depositValue.innerText = '$' + depositRange.value;
}

function calculateIncomePerMonth() {
    if (moderatedButton.classList.contains('active')) {
        percent = 9;
    } else if (standartButton.classList.contains('active')) {
        percent = 16;
    } else if (agressiveButton.classList.contains('active')){
        percent = 30;
    }
    incomePerMonth.innerText = '$' + depositRange.value/100 * percent;
    return percent;
}

function calculateIncomePerYear() {
    incomePerYear.innerText = '$' + (depositRange.value/100 * percent)* 12;
}


function activateButton(evt) {
    var targetButton = evt.target;
    for(var j = 0; j < buttonSet.length; j++) {
        if(buttonSet[j].classList.contains('active')) {
            buttonSet[j].classList.remove('active');
        }
    }
    targetButton.classList.toggle('active');
    calculateIncomePerMonth();
    calculateIncomePerYear();
}


function statusHandler() {
    for(var i = 0; i < buttonSet.length; i++) {
        buttonSet[i].addEventListener('click', activateButton);
    }
}

statusHandler();
depositRange.addEventListener('input', updateDeposit);
depositRange.addEventListener('input', calculateIncomePerMonth);
depositRange.addEventListener('input', calculateIncomePerYear);



