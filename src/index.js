const express = require('express')
const cors = require('cors')
const venom = require('venom-bot');

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

const venonClient = venom
    .create({
        session: 'arquitetoolZapVenom',
        multidevice: false
    })

app.get('/', (request, response) => {
    response.send("Welcome Venom 🕷 Api")
})

app.post('/sendMessage', (request, response) => {
    const content = request.body
    try {
        venonClient.then((client) => {
            client.sendText(content.phone + '@c.us', content.text).then((result) => {
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