const { Pool } = require("pg")

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "12345",
    database: "softlife",
    port: "5432",
    max: 20,
    idleTimeoutMillis: 4000,
    connectionTimeoutMillis: 0
})


const insertar = async (datos) => {
    const consulta = {
        text: "insert into usuarios (email, password) values ($1, $2)",
        values: datos
    }
    try {
        const resultado = await pool.query(consulta)
        return resultado
    } catch (e) {
        console.log(e.code);
        return e
    }
}

const consultar = async () => {
    try {
        const resultado = await pool.query("select * from usuarios")
        return resultado
    } catch (e) {
        console.log(e.code);
        return e
    }
}

const validar = async (datos) => {
    const consulta = {
        text: "select * from usuarios where email = $1 and password = $2",
        values: datos
    }
    try {
        const resultado = await pool.query(consulta)
        return resultado
    } catch (e) {
        console.log(e.code);
        return e
    }
}



module.exports = { insertar, consultar, validar }