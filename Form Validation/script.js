const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const cPassword = document.getElementById("password2");
const form = document.getElementById("form");

function showError(input, message) {
    const parent = input.parentElement;
    parent.className = "form-control error";
    parent.querySelector("small").innerText = message;
}

function showSuccess(input) {
    const parent = input.parentElement;
    parent.className = "form-control success";
}

function checkEmail(email) {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(pattern.test(email.value.trim())){
        showSuccess(email);
    }
    else{
        if(email.value.length){
            showError(email, `${getFieldName(email)} is not valid !`);
        }
        else{
            showError(email, `${getFieldName(email)} is must not be empty !`);
        }
    }  
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkInput(inputArr) {
    inputArr.forEach(function (input) {
        if (input.value.trim() === "") {
            showError(input, `${getFieldName(input)} is required !`);
        }
        else {
            showSuccess(input)
        }
    })
}

function checkLength(input, min, max) {

    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be atleast ${min} characters !`);
    }
    else if(input.value.length > max){
        showError(input, `${getFieldName(input)} must be less than ${max} characters !`);
    }
    else {
        showSuccess(input)
    }

}

function checkConfirmPassword(input1, input2) {
    if(input1.value === input2.value){
        if(input1.value.length === 0){
            showError(input2, `Passwords cant be empty !`);    
        }
        else{
        showSuccess(input2);
        }
    }
    else{
        showError(input2, `Passwords do not match !`);
    }
}

function checkPassword(input) {
    let pattern = /(?=.*[!@#\$%\^&\*])/;
    if(input.value.trim().length < 6){
        showError(input, `${getFieldName(input)} must be alteast six !`);
    }
    else{
        if(pattern.test(input.value.trim())){
            showSuccess(input);
        }
        else{
            showError(input, `${getFieldName(input)} must contain a special character!`);
        }
    }
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    // if (username.value.trim() === "") {
    //     showError(username, "username is required !");
    // }
    // else {
    //     showSuccess(username);
    // }
    // if (email.value.trim() === "") {
    //     showError(email, "email is required !");
    // }
    // else if (!isValidEmail(email.value)) {
    //     showError(email, "email is not valid !");
    // }
    // else {
    //     showSuccess(email);
    // }
    // if (password.value.trim() === "") {
    //     showError(password, "password is required !");
    // }
    // else {
    //     showSuccess(password);
    // }
    // if (cPassword.value.trim() === "") {
    //     showError(cPassword, "passwords do not match !");
    // }
    // else {
    //     showSuccess(cPassword);
    // }
    checkInput([username, email, password, cPassword]);
    checkLength(username, 3, 15);
    checkEmail(email);
    checkPassword(password);
    checkConfirmPassword(password, cPassword);
})