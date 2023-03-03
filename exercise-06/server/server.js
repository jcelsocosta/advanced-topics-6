const express = require("express")
const uuid = require('uuid')
const app = express()
const PORT = 3000

app.use(express.json())

app.get('/getTeamByID', (req, res) => {
    if (!req.body.ID) return res.status(202).send('Identifier cannot be empty')

    const obj = teams.find((el) => el.ID === req.body.ID)

    if (obj) return res.status(200).send(obj)

    if (!obj) return res.status(204).send()
})

app.get(`/listTeams`, (req, res) => {
    console.log(teams)
    if (teams) return res.status(200).send(teams)

    if (!teams) return res.status(204).send()
})

app.post('/createTeam', (req, res) => {
    if (!req.body.fullTeamName) {
        return res.status(202).send("Full Team Name cannot be empty")
    }

    if (!req.body.powerUnit) {
        return res.status(202).send("Power Unit cannot be empty")
    }

    if (!req.body.base) {
        return res.status(202).send("Bas cannot be empty")
    }

    if (!req.body.chassis) {
        return res.status(202).send("Chassi cannot be empty")
    }

    const obj = {
        ID: uuid.v4(),
        fullTeamName: req.body.fullTeamName,
        powerUnit: req.body.powerUnit,
        base: req.body.base,
        chassis: req.body.chassis

    }

    teams.push(obj)

    const contain = teams.find((el) => el.ID === obj.ID)

    if (contain) return res.status(201).send(teams)
})

app.put('/updateTeam', (req, res) => {
    if (!req.body.ID) {
        return res.status(202).send("Identifier cannot be empty")
    }

    if (!req.body.fullTeamName) {
        return res.status(202).send("Full Team Name cannot be empty")
    }

    if (!req.body.powerUnit) {
        return res.status(202).send("Power Unit cannot be empty")
    }

    if (!req.body.base) {
        return res.status(202).send("Bas cannot be empty")
    }

    if (!req.body.chassis) {
        return res.status(202).send("Chassi cannot be empty")
    }

    const obj = teams.find((el) => el.ID === req.body.ID)

    if (obj) {
        const index = teams.findIndex((el) => el.ID === obj.ID)

        if (index !== -1) {
            teams[index].fullTeamName = req.body.fullTeamName
            teams[index].powerUnit = req.body.powerUnit
            teams[index].base = req.body.base
            teams[index].chassis = req.body.chassis
        }
    }

    return res.status(200).send(teams)
})

app.delete('/deleteTeam', (req, res) => {
    if (!req.body.ID) return res.status(202).send('Identifier cannot be empty')

    const index = teams.findIndex((el) => el.ID === req.body.ID)

    if (index !== 1) teams.splice(index, 1)

    return res.status(200).send()
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})


const teams = [
    {
        ID: "d70a4704-32fc-4109-8322-9dbd2c25f311",
        fullTeamName: "Mercedes-AMG PETRONAS Formula One",
        powerUnit: "Mercedes",
        base: "Brackley, United Kingdom",
        chassis: "W14"
    },
    {
        ID: "d70a4704-32fc-4109-8322-9dbd2c25f317",
        fullTeamName: "BWT Alpine F1 Team",
        powerUnit: "Renault",
        base: "Enstone, United Kingdom",
        chassis: "A523"
    },
    {
        ID: "d70a4704-32fc-4109-8322-9dbd2c25f355",
        fullTeamName: "MoneyGram Haas F1 Team",
        powerUnit: "Ferrari",
        base: "Kannapolis, United States",
        chassis: "VF-23"
    },
    {
        ID: "d70a4704-32fc-4109-8322-9dbd2c25f544",
        fullTeamName: "McLaren Formula 1 Team",
        powerUnit: "Mercedes",
        base: "Woking, United Kingdom",
        chassis: "MCL60"
    },
    {
        ID: "d70a4704-32fc-4109-8322-9dbd2c25f321",
        fullTeamName: "Oracle Red Bull Racing",
        powerUnit: "Honda RBPT",
        base: "Milton Keynes, United Kingdom",
        chassis: "RB19"
    },
    {
        ID: "d70a4704-32fc-4109-8322-9dbd2c25f319",
        fullTeamName: "Scuderia Ferrari",
        powerUnit: "Ferrari",
        base: "Maranello, Italy",
        chassis: "SF-23"
    }
]


// const teams = undefined