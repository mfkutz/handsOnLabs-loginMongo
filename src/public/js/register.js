document.addEventListener('DOMContentLoaded', function () {
    // Obtener el formulario de registro
    const registerForm = document.querySelector('form');

    // Agregar un evento de escucha para enviar el formulario cuando se envíe
    registerForm.addEventListener('submit', async function (event) {
        // Evitar que el formulario se envíe automáticamente
        event.preventDefault();

        // Obtener los valores del formulario
        const firstName = registerForm.querySelector('#first_name').value;
        const lastName = registerForm.querySelector('#last_name').value;
        const email = registerForm.querySelector('#email').value;
        const age = registerForm.querySelector('#age').value;
        const password = registerForm.querySelector('#password').value;
        const confirmPassword = registerForm.querySelector('#confirm_password').value;

        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        // Crear un objeto con los datos del formulario
        const formData = {
            first_name: firstName,
            last_name: lastName,
            email,
            age,
            password
        };

        try {
            // Enviar los datos del formulario al servidor
            const response = await fetch('/api/sessions/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // Verificar si la solicitud fue exitosa
            if (response.ok) {
                // Redirigir a la página de inicio de sesión
                window.location.href = '/';
            } else {
                // Mostrar un mensaje de error si la solicitud no fue exitosa
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            // Capturar cualquier error y mostrarlo en la consola
            console.error('Error:', error);
        }
    });
});
