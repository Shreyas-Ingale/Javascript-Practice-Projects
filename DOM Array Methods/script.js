// Get Elements from DOM
const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleMoneyBtn = document.getElementById("double-money");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortRichestBtn = document.getElementById("sort");
const totalWealthBtn = document.getElementById("calculate-wealth");
let users = [];
// Functions
// format money to be using ,s plus add $ at front
function formatMoney(money) {
    return '$' + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
// append users to DOM
function addUserToDOM(newUser) {
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';
    users.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("person");
        div.innerHTML = `<span>${item.name}</span><span>${formatMoney(item.money)}</span>`;
        main.appendChild(div);
    });
}
// get a user and add it to users array 
async function getUser() {
    const response = await fetch("https://randomuser.me/api");
    const data = await response.json();
    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    users.push(newUser);
    addUserToDOM();
}

// double the money of each user
function doubleMoney() {
    users = users.map(user => {
        return {...user, money: user.money*2};
    });
    addUserToDOM();
}

// filter to show only millionaries
function showMillionaires(){
    users = users.filter((user) => user.money > 1000000);
    addUserToDOM();
}

// sort in descending order of richness
function sortRichest(){
    users.sort((a, b) => b.money - a.money);
    addUserToDOM();
}

// calculate total wealth using reduce and append the result to DOM
function totalWealth(){
    const total = users.reduce((acc, user) => (
        acc += user.money 
    ), 0);
    const totalEl = document.createElement("div");
    totalEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(total)}</strong></h3>`;
    main.appendChild(totalEl);
}

// Add EventListeners
addUserBtn.addEventListener('click', getUser);
doubleMoneyBtn.addEventListener('click', doubleMoney)
showMillionairesBtn.addEventListener('click', showMillionaires);
sortRichestBtn.addEventListener('click', sortRichest);
totalWealthBtn.addEventListener('click', totalWealth);

getUser();
getUser();
getUser();