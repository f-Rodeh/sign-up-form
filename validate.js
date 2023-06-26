// generic validation
const inputs = document.querySelectorAll('form input');

inputs.forEach((input) => {
  addFeedback(input);
  input.addEventListener('focusout', e => {
    if( isRequired(input) ){
      addValidationClass(input);
    }
  })
});

function addFeedback( input ){
  let validationFeedback = document.createElement('span');
  input.parentElement.append( validationFeedback );
}

function addValidationClass( input ){
  if( !isValidable(input) ){
    input.classList.add('validate');
  }
}

function isValidable( input ){
  return input.classList.contains('validate');
}

function isRequired( input ){
  return 'required' in input.attributes;
}

// pwd match validation
const pwd = document.querySelector('#pwd');
const confirmPwd = document.querySelector('#confirm-pwd');
confirmPwd.setAttribute('title', 'Password does not match');

pwd.addEventListener('focusout', () => {
  const pwdValid = ( pwd.validity.valid === true );

  if( pwdValid ){
    confirmPwd.setAttribute('pattern', pwd.value);
    showMismatchError(true);
  } else {
    confirmPwd.setAttribute('pattern', ''); // impossible to match ( value is required )
    showMismatchError(false);
  }
})

function showMismatchError( bool ) {
  const opacity = bool ? '1' : '0';
  document.documentElement.style.setProperty('--confirm-pwd-error-opacity', opacity);
}