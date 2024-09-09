const express = require('express')
const router = new express.Router()

//p recuperar a request, response- para usuario e o next p tratar
//ponto de acesso de get
//http://localhost:3000/
//Retornar status 200 OK
router.get('/', (req, res, next)=>{
    res.status(200).send(
        {
            "nome" : "Ellen"
        }
    )
})

//401 Unauthorized - p acessar precisa de autorização = token.
//Postman Get
//http://localhost:3000/privada
//Headers - key= authoriation - Value= minhaSenha
router.get('/privada', (req, res) => {

    //key
    const token = req.headers['authorization'];

    //value é minhaSenha
    if(!token || token  !== 'minhaSenha'){
        return res.status(401).send('Sem autorização!')
    }

    res.send('Area acessada com sucesso!').status(200)
})

const tokenExemplos = {
    'tokenAdmin' : {role: 'admin'},
    'tokenUser' : {role: 'user'},
    'tokenConvidado' : {role: 'convidado'}
}

//403 Forbbiden
//Get - Headers - key= authorization value= tokenAdmin
router.get('/admin', (req, res)=>{
    const token = req.headers["authorization"]

    //se n tiver token
    if(!token){
        return res.status(401).send('Sem autorização')
    }

    //validar se usuário é ok
    const user = tokenExemplos[token]

    if(!user){
        return res.status(401).send('Token inválido')
    }

    //se n for admin
    if (user.role != 'admin'){
        return res.status(403).send('Você não tem permissão para acessar aqui')
    }

    //se for admin
    //por padrão retorna 200
    return res.send('Acesso liberado').status(200)
})

//400 Bad Request
//Post /submit 
//body - raw json
// json c nome e email
router.post('/submit', (req, res) => {
    const {nome, email} = req.body;

    if(!nome || !email){
        return res.status(400).send('Bad request... Favor enviar nome e e-mail')
    }

    //status 201 created
    res.status(201).send('Dado criado com sucesso!');
})

//404 Not Found
//get - items/id que será pesquisado
//base de dados fake
let items=[
    {id: 1, nome: "item1"},
    {id: 2, nome: "item2"},
    {id: 3, nome: "item3"},
]

router.get("/items/:id", (req, res) => {
    const id = parseInt(req.params.id)

    const item = items.find(item => item.id == id)
    if(item){
        return res.status(200).send(item)
    } else {
        return res.status(404).send('Item não encontrado')
    }
})


//429 Too Many Requests
module.exports = router;
