document.querySelector('#login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const emailEl = document.querySelector('#login-email');
    const passwordEl = document.querySelector('#login-password');
  
    let isEmailValid = emailEl.value.trim() !== '';
    let isPasswordValid = passwordEl.value.trim() !== '';
  
    if (!isEmailValid) {
      emailEl.classList.add('is-invalid');
    } else {
      emailEl.classList.remove('is-invalid');
      emailEl.classList.add('is-valid');
    }
  
    if (!isPasswordValid) {
      passwordEl.classList.add('is-invalid');
    } else {
      passwordEl.classList.remove('is-invalid');
      passwordEl.classList.add('is-valid');
    }
  
    if (isEmailValid && isPasswordValid) {
      fetch('http://localhost:3000/users')
        .then((response) => response.json())
        .then((users) => {
          const user = users.find(
            (user) =>
              user.email === emailEl.value.trim() && user.password === passwordEl.value.trim()
          );
  
          if (user) {
            alert('¡Has iniciado sesion!');
          } else {
            alert('Correo electrónico o contraseña incorrectos.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Error al iniciar sesión.');
        });
    }
  });
  