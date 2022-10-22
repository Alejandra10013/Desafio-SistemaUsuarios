const http = require("http")
const url = require("url")
const fs = require("fs")
const { insertar, consultar, validar } = require("./consultas")

http.createServer(async (req, res) => {

    if (req.url == "/" && req.method == "GET") {
        res.setHeader("content-type", "text/html")
        res.end(fs.readFileSync("index.html", "utf8"))
    }

    if ((req.url == "/usuarios" && req.method == "GET")) {
        const respuesta = await consultar()
        res.end(JSON.stringify(respuesta))
    }

    if ((req.url == "/usuario" && req.method == "POST")) {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk
        })

        req.on("end", async () => {
            try {
                const datos = Object.values(JSON.parse(body))
                const respuesta = await insertar(datos)
                res.end(JSON.stringify(respuesta))
            } catch (error) {
                res.end(JSON.stringify({
                    code: error.code,
                    message: "Error inesperado. Contacte al administrador.",
                }));
            }
        })
    }

    if ((req.url == "/login" && req.method == "POST")) {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk
        })
        req.on("end", async () => {
            try {
                const datos = Object.values(JSON.parse(body))
                const respuesta = await validar((datos))
                if (respuesta.rowCount == 0) {
                    res.writeHead(404, "Email o contraseña incorrecta.")
                    res.end()
                } else {
                    res.end(JSON.stringify(respuesta))
                }
            } catch (error) {
                res.end(JSON.stringify({
                    code: error.code,
                    message: "Error inesperado. Contacte al administrador.",
                }))
            }
        })
    }

}).listen(3000, () => console.log("Server ON! http://localhost:3000"))