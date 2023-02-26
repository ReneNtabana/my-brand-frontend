const form = document.getElementById('login-form')
const adminName = document.getElementById('admin-name')
const password = document.getElementById('admin-password')

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