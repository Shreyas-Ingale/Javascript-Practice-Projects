// get elements from DOM
const currency1El = document.getElementById("currency-one");
const currency2El = document.getElementById("currency-two");
const currency1Amt = document.getElementById("amount-one");
const currency2Amt = document.getElementById("amount-two");
const swapBtn = document.getElementById("swap");
const rateEl = document.getElementById("rate");

// fetch exchange rate and update DOM
async function calculateExchange() {
    let currency1 = currency1El.value;
    let currency2 = currency2El.value;
    await fetch(`https://v6.exchangerate-api.com/v6/aaa8d44b5cb8abdf9d5acb1d/latest/${currency1}`)
    .then(res => res.json())
    .then(data => {
        const rate = data.conversion_rates[currency2];
        rateEl.innerText = `1 ${currency1} = ${rate} ${currency2}`;
        currency2Amt.value = (currency1Amt.value * rate).toFixed(2);
    });
}

// event listners
currency1El.addEventListener("change",calculateExchange);
currency2El.addEventListener("change",calculateExchange);
currency1Amt.addEventListener("input",calculateExchange);
currency2Amt.addEventListener("input",calculateExchange);
swapBtn.addEventListener("click", () => {
    const temp = currency1El.value;
    currency1El.value = currency2El.value;
    currency2El.value = temp;
    calculateExchange();
})
calculateExchange();