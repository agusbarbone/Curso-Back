import http from "http"

const app = http.createServer((req, res) => {
    res.end("hola desde el back")
})

app.listen(8080, () => {
    console.log("primer backend activo")
})