import throttle from 'lodash.throttle';


const refs = {
    form: document.querySelector('.feedback-form'),
    email: document.querySelector('[name="email"]'),
    message: document.querySelector('[name="message"]'),
};

const STORAGE_INPUT_KEY = 'feedback-form-state';


refs.form.addEventListener('input', throttle(onFormFieldInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

populateFormInputs();


function onFormFieldInput(e) {
    const inputData = {
        [e.target.name]: e.target.value
    };

    const savedInput = retrieveInputValues();
    
    if (!savedInput) {
        saveInputValues(inputData);
    } else {
        const overrideInput = { ...savedInput, ...inputData };
        saveInputValues(overrideInput);
    }
}

function onFormSubmit(e) {
    e.preventDefault();

    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_INPUT_KEY);
}

function retrieveInputValues() {
    return JSON.parse(localStorage.getItem(STORAGE_INPUT_KEY));
}

function saveInputValues(data) {
    const dataJSON = JSON.stringify(data);
    localStorage.setItem(STORAGE_INPUT_KEY, dataJSON);
}

function populateFormInputs() {
    const savedInput = retrieveInputValues();

    if (savedInput) {
        refs.email.value = savedInput.email;
        refs.message.value = savedInput.message;
    }
}
