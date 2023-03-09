const form = document.getElementById('contact-form')
const username = document.getElementById('name')
const email= document.getElementById('viewer-email')
const message = document.getElementById('viewer-message')

const userFeedback = JSON.parse(localStorage.getItem('userFeedback')) ?? [];

let isGenuine = localStorage.getItem('genuineUser', 'true');

//! Contact Me Form INTEGRATED
form.addEventListener('submit', async (event) => {
  const username = document.querySelector('#form-name').value;
  const email = document.querySelector('#form-email').value;
  const subject = document.querySelector('#form-subject').value;
  const formMessage = document.querySelector('#message-1').value;
  //   const password2 = document.querySelector('#password2').value;
  event.preventDefault();

  // fetch(`${api}/api/register`, {
  //   fetch('https://repulsive-frog-jacket.cyclic.app/api/register', {
  fetch('http://127.0.0.1:7000/api/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ username, email, subject, message: formMessage }),
  })
    .then((response) => {
      return response.json();
    })
    .then((resp) => {
      alert(resp.message);
      console.log(resp);
      (document.querySelector('#form-name').value = ''),
        (document.querySelector('#form-email').value = ''),
        (document.querySelector('#form-subject').value = ''),
        (document.querySelector('#message-1').value = '');

    });
});

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