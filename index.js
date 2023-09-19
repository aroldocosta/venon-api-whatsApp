const express = require('express')
const cors = require('cors')
const venom = require('venom-bot');

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))


const client = venom
    .create({
        session: 'arquitetoolZapVenom',
        multidevice: false
    })

app.get('/', (request, response) => {
    response.send("Welcome Venom 🕷 Api")
})

app.post('/send', (request, response) => {
    const req = request.body
    try {
        client.then((client) => {
            client.sendText(req.phone + '@c.us', req.message).then((result) => {
                response.send(result)
            }).catch((err) => {
                console.error(err)
            })
        }).catch((err) => {
            console.error(err)
        })
    } catch (error) {
        console.log(error)
    }
})

app.listen(5000, () => {
    console.log("Servidor rodando na porta: " + process.env.PORT)
})