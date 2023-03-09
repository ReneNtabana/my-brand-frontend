const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('user-email');
const password = document.getElementById('user-password');
const password2 = document.getElementById('user-password2');
const signup = document.getElementById('sign-up-btn');

form.addEventListener('submit', async (event) => {
    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    //   const password2 = document.querySelector('#password2').value;
    event.preventDefault();
  
    fetch('https://repulsive-frog-jacket.cyclic.app/api/register', {
      // fetch('http://127.0.0.1:5000/api/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        console.log(resp);
        if (resp.data) {
          // location.href =
        } else {
          alert(resp.message);
        }
        return resp;
      });
  });
  
  //Show Password Function
  function showPassword() {
    var show = document.getElementById('password');
    var show2 = document.getElementById('password2');
  
    if (show.type == 'password') {
      show.type = 'text';
    } else {
      show.type = 'password';
    }
  
    if (show2.type == 'password') {
      show2.type = 'text';
    } else {
      show2.type = 'password';
    }
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
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if(usernameValue === '') {
        setError(username, 'Username is required');
    } else if(usernameValue.length <= 5){
        setError(username, 'Username too short');
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

    if(passwordValue === '') {
        setError(password, 'Password is required');
    } else if (passwordValue.length < 8 ) {
        setError(password, 'Password must be at least 8 character.');
    } else {
        setSuccess(password);
    }

    if(password2Value === '') {
        setError(password2, 'Please confirm your password');
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords doesn't match");
    } else {
        setSuccess(password2);
    }

 // If the form is valid, store the user's information in local storage
      const user = { username,email, password };
      localStorage.setItem("user", JSON.stringify(user));
  
      // Redirect to the dashboard
      window.location.href = "./dashboard.html";
}
  

     