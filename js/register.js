// Funciones de validación
const isRequired = value => value.trim() !== ''; 
const isEmailValid = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); 
const isBetween = (length, min, max) => length >= min && length <= max; 
const isPasswordSecure = password => /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*]).{8,}/.test(password); 

// Muestra un mensaje de error
const showError = (input, message) => {
    const formControl = input;
    formControl.classList.remove('is-valid');
    formControl.classList.add('is-invalid');
    formControl.nextElementSibling.textContent = message;
  };
  

const showSuccess = input => {
  const formControl = input;
  formControl.classList.remove('is-invalid');
  formControl.classList.add('is-valid');
};

const checkUsername = () => {
  const usernameField = document.querySelector('#username');
  let valid = false;
  const min = 3, max = 25;
  const username = usernameField.value.trim();

  if (!isRequired(username)) {
    showError(usernameField, 'El nombre de usuario no puede estar vacío.');
  } else if (!isBetween(username.length, min, max)) {
    showError(usernameField, `El nombre de usuario debe tener entre ${min} y ${max} caracteres.`);
  } else {
    showSuccess(usernameField);
    valid = true;
  }
  return valid;
};

const checkEmail = () => {
  const emailField = document.querySelector('#email');
  let valid = false;
  const email = emailField.value.trim();

  if (!isRequired(email)) {
    showError(emailField, 'El correo electrónico no puede estar vacío.');
  } else if (!isEmailValid(email)) {
    showError(emailField, 'El correo electrónico no es válido.');
  } else {
    showSuccess(emailField);
    valid = true;
  }
  return valid;
};

const checkPassword = () => {
  const passwordField = document.querySelector('#password');
  let valid = false;
  const password = passwordField.value.trim();

  if (!isRequired(password)) {
    showError(passwordField, 'La contraseña no puede estar vacía.');
  } else if (!isPasswordSecure(password)) {
    showError(passwordField, 'La contraseña debe tener al menos 8 caracteres e incluir: 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial.');
  } else {
    showSuccess(passwordField);
    valid = true;
  }
  return valid;
};

const checkConfirmPassword = () => {
  const confirmPasswordField = document.querySelector('#confirm-password');
  const passwordField = document.querySelector('#password');
  let valid = false;
  const confirmPassword = confirmPasswordField.value.trim();
  const password = passwordField.value.trim();

  if (!isRequired(confirmPassword)) {
    showError(confirmPasswordField, 'Debe confirmar la contraseña.');
  } else if (password !== confirmPassword) {
    showError(confirmPasswordField, 'Las contraseñas no coinciden.');
  } else {
    showSuccess(confirmPasswordField);
    valid = true;
  }
  return valid;
};

const checkAge = () => {
  const ageField = document.querySelector('#age');
  let valid = false;
  const age = ageField.value.trim();

  if (!isRequired(age)) {
    showError(ageField, 'La edad no puede estar vacía.');
  } else if (isNaN(age) || age < 1) {
    showError(ageField, 'La edad debe ser un número mayor que 0.');
  } else {
    showSuccess(ageField);
    valid = true;
  }
  return valid;
};

const checkDateBorn = () => {
  const DateBornField = document.querySelector('#DateBorn');
  let valid = false;
  const DateBorn = DateBornField.value.trim();

  if (!isRequired(DateBorn)) {
    showError(DateBornField, 'La fecha de nacimiento no puede estar vacía.');
  } else {
    showSuccess(DateBornField);
    valid = true;
  }
  return valid;
};

const checkPostalCode = () => {
    const postalCodeEl = document.querySelector('#postal-code');
    let valid = false;
    const postalCode = postalCodeEl.value.trim();
  
    if (!isRequired(postalCode)) {
      showError(postalCodeEl, 'El código postal no puede estar vacío.');
    } else if (!/^\d+$/.test(postalCode)) {
      showError(postalCodeEl, 'El código postal solo puede contener números.');
    } else {
      showSuccess(postalCodeEl);
      valid = true;
    }
    return valid;
  };
  

const checkProvince = () => {
  const provinceField = document.querySelector('#province');
  let valid = false;
  const province = provinceField.value.trim();

  if (!isRequired(province)) {
    showError(provinceField, 'La provincia no puede estar vacía.');
  } else {
    showSuccess(provinceField);
    valid = true;
  }
  return valid;
};

const checkLocality = () => {
  const localityField = document.querySelector('#locality');
  let valid = false;
  const locality = localityField.value.trim();

  if (!isRequired(locality)) {
    showError(localityField, 'La localidad no puede estar vacía.');
  } else {
    showSuccess(localityField);
    valid = true;
  }
  return valid;
};

// envio del formulario
document.querySelector('#register-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const isUsernameValid = checkUsername(),
          isEmailValid = checkEmail(),
          isPasswordValid = checkPassword(),
          isConfirmPasswordValid = checkConfirmPassword(),
          isAgeValid = checkAge(),
          isDateBornValid = checkDateBorn(),
          isPostalCodeValid = checkPostalCode(),
          isProvinceValid = checkProvince(),
          isLocalityValid = checkLocality();
  
    const isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid &&
                        isAgeValid && isDateBornValid && isPostalCodeValid && isProvinceValid && isLocalityValid;
  
    if (isFormValid) {
      const userData = {
        username: document.querySelector('#username').value.trim(),
        email: document.querySelector('#email').value.trim(),
        password: document.querySelector('#password').value.trim(),
        age: document.querySelector('#age').value.trim(),
        DateBorn: document.querySelector('#DateBorn').value.trim(),
        postalCode: document.querySelector('#postal-code').value.trim(),
        province: document.querySelector('#province').value.trim(),
        locality: document.querySelector('#locality').value.trim()
      };
  
      fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
        .then(response => {
          if (response.ok) {
            alert('¡Registro exitoso! Los datos se han guardado correctamente.');
            document.querySelector('#register-form').reset();
            document.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
          } else {
            alert('Hubo un error al guardar los datos.');
          }
        })
        .catch(error => console.error('Error:', error));
    }
  });
  

// Validación en tiempo real
document.querySelector('#register-form').addEventListener('input', function (e) {
  switch (e.target.id) {
    case 'username':
      checkUsername();
      break;
    case 'email':
      checkEmail();
      break;
    case 'password':
      checkPassword();
      break;
    case 'confirm-password':
      checkConfirmPassword();
      break;
    case 'age':
      checkAge();
      break;
    case 'DateBorn':
      checkDateBorn();
      break;
    case 'postal-code':
      checkPostalCode();
      break;
    case 'province':
      checkProvince();
      break;
    case 'locality':
      checkLocality();
      break;
  }
});
