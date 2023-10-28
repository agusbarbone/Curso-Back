import express from "express"

const PORT = 8080

const app = express()
app.use(express.urlencoded({ extended: true }))

app.get('/saludo', (req, res) => {
    res.send(`Hola desde Express, desde el puerto ${PORT}`)
})

app.get('/user', (req, res) => {
    const user = {
        userName: "Agustin",
        lastName: "Barbone",
        age: 32
    }
    res.send(user)
})

app.listen(PORT, () => {
    console.log(`Servidor de Express activo en el puerto ${PORT}`)
})