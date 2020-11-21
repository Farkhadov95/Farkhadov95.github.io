var currencyEl_one = document.querySelector('#currency-one');
var amountEl_one = document.querySelector('#amount-one');
var currencyEl_two = document.querySelector('#currency-two');
var amountEl_two = document.querySelector('#amount-two');
var rateEl = document.querySelector('#rate');
var swap = document.querySelector('#swap');


//Fetch exchange rates and update the DOM
function calculate() {
    var currency_one = currencyEl_one.value;
    var currency_two = currencyEl_two.value;
    
    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            var rate = data.rates[currency_two];
            rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
            amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
        });
}


// Event Listeners
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('change', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('change', calculate);

swap.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
})
calculate();