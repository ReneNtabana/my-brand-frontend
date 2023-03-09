const form = document.getElementById('contact-form')
const username = document.getElementById('name')
const email= document.getElementById('viewer-email')
const message = document.getElementById('viewer-message')

const userMessage = JSON.parse(localStorage.getItem("userMessage")) ?? []

let isGenuine = localStorage.getItem("genuineUser", "true");



function addMessage() {
  currentData  = {
    username: username.value,
    email: email.value,
    userMessage: message.value,
  }
  userMessage.push(currentData);
  localStorage.setItem('userMessage', JSON.stringify('userMessage'));
}

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const messageValue = message.value.trim();

    if(usernameValue === '') {
        setError(username, 'name is required') ;
     } else {
         setSuccess(username);
     }

     
     if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }  
    
    if(messageValue === '') {
        setError(message, 'Input message');
    } else {
        setSuccess(message);
    }

    if (usernameValue && emailValue && messageValue) {
        return true;
        // localStorage.setItem(usernameValue, emailValue, messageValue);
        // location.reload();
      } else{
        return false;
      }
}