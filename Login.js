const form = document.getElementById('login-form')
const adminName = document.getElementById('admin-name')
const password = document.getElementById('admin-password')
const data = { usernames: adminNameValue, password: passwordValue };
fetch('http://localhost:5000/api/login', {
    // fetch('https://localhost:5000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((resp) => {
      console.log(resp.data.email);
      if (resp.data) {
        localStorage.setItem('token', resp.token);
        localStorage.setItem('logedIn', resp.data.email);
        //  console.log(resp.data.username)
        location.href = './dashboard.html';
        // location.href =
        //   'https://majestic-melomakarona-d7b4f4.netlify.app/2-Admin-Panel%20/admin.html';
      } else {
        console.log(resp.message);
        // alert(resp.message)
      }
      return resp;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});

//Show Password Function
function showPassword() {
  var show = document.getElementById('password');
  if (show.type == 'password') {
    show.type = 'text';
  } else {
    show.type = 'password';
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
}

const validateInputs = () => {
    const adminNameValue = adminName.value.trim();
    const passwordValue = password.value.trim();


    if(adminNameValue === '') {
       setError(adminName, 'name is required') ;
    } else if (adminNameValue.length <= 5) {
       setError(adminName, 'Username contains more than 5 characters') ;
    } else {
        setSuccess(adminName);
    }

    if(passwordValue === '') {
        setError(password, 'Incorrect password');
    } else if(passwordValue.length < 8) {
        setError(password, 'Password has atleast 8 characters');
    }else {
        setSuccess(password);
    }

    // if(adminnameValue && passwordValue){
    //     return true;
    // } else {
    //     return false;
    // }

};

var state= false;

function toggle(){
    if (state) {
        document.getElementById('admin-password').setAttribute('type','password');
        state = false 
    }else{
        document.getElementById('admin-password').setAttribute('type','text');
        state = true

    }
}