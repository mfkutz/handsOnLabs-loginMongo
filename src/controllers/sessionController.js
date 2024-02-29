import { usersModel } from "../models/users.models.js"

async function registerUser(req, res) {
    const { first_name, last_name, email, age, password } = req.body

    try {
        const existingUser = await usersModel.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: "El usuario ya existe" })
        }

        const newUser = new usersModel({
            first_name,
            last_name,
            email,
            age,
            password
        })

        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
            newUser.role = "admin"
        }

        await newUser.save()
        res.status(201).send('Usuario registrado')

    } catch (error) {
        console.error('Error al registrar usuario:', error)
        res.status(500).json({ message: "Error al registrar usuario" })
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        const user = await usersModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        if (password !== user.password) {
            return res.status(401).json({ message: "Contraseña incorrecta." });
        }

        req.session.user = user;

        /* res.status(200).json({ message: "Inicio de sesión exitoso.", user }) */
        res.redirect('/profile')
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ message: "Error al iniciar sesión." });
    }
}


async function logout(req, res) {
    req.session.destroy(err => {
        if (!err) res.send('logout ok')
        else res.send({ status: 'Logout ERROR', body: err })
    })
}

export { registerUser, loginUser, logout }