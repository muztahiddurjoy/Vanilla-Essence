const http = require('http')
const fs = require('fs')
const path = require('path')

const port = 3001
const host = 'localhost'

const server = http.createServer((req, res) => {
    switch(req.url){
        case '/':
            handleHomeRequest(req,res)
            break;
        case '/about':
            handleAboutRequest(req,res)
            break;
        case '/todo':
            getTodoPage(req,res)
            break;
        case '/todo/api':
            handleToDoRequest(req,res)
            break;
        case '/todo/api/new':
            handleToDoPostRequest(req,res)
            break;
    }
})



const handleHomeRequest = (req,res)=>{
    switch(req.method){
        case "GET":
            res.statusCode = 200
            res.setHeader('Content-Type','text/html')
            const file = fs.readFileSync(path.join(__dirname,'../views/index.html')).toString()
            res.end(file)
            break;
        default:    
            res.statusCode = 404
            res.setHeader('Content-Type','application/json')
            res.end(JSON.stringify({
                status:404,
                message:`No route exists for ${req.url} method ${req.method}`
            }))
            break;
    }
}

const handleToDoRequest = (req,res)=>{
    switch(req.method){
        case "GET":
            res.statusCode = 200
            res.setHeader('Content-Type','application/json')
            const result = fs.readFileSync(path.join(__dirname,'../db/todo.json'))
            res.end(result)
            break;
        default:    
            res.statusCode = 404
            res.setHeader('Content-Type','application/json')
            res.end(JSON.stringify({
                status:404,
                message:`No route exists for ${req.url} method ${req.method}`
            }))
            break;
    }
}
const handleToDoPostRequest = (req,res)=>{
    switch(req.method){
        case "POST":
            try{
                res.statusCode = 200
                res.setHeader('Content-Type','application/json')
                const result = fs.readFileSync(path.join(__dirname,'../db/todo.json'))
                let data = JSON.parse(result)
                
                res.end(JSON.stringify({
                    status:200,
                    message:'Todo added successfully'
                }))
            }
            catch(err){
                res.end(JSON.stringify({
                    status:500,
                    message:String(err)
                }))
            }
           
            break;
        default:    
            res.statusCode = 404
            res.setHeader('Content-Type','application/json')
            res.end(JSON.stringify({
                status:404,
                message:`No route exists for ${req.url} method ${req.method}`
            }))
            break;
    }
}

const handleAboutRequest = (req,res)=>{
    switch(req.method){
        case "GET":
            res.statusCode = 200
            res.setHeader('Content-Type','text/html')
            const file = fs.readFileSync(path.join(__dirname,'../views/about.html')).toString()
            res.end(file)
            break;
        default:    
            res.statusCode = 404
            res.setHeader('Content-Type','application/json')
            res.end(JSON.stringify({
                status:404,
                message:`No route exists for ${req.url} method ${req.method}`
            }))
            break;
    }
}

const getTodoPage = (req,res)=>{
    switch(req.method){
        case "GET":
            res.statusCode = 200
            res.setHeader('Content-Type','text/html')
            const file = fs.readFileSync(path.join(__dirname,'../views/todo.html')).toString()
            res.end(file)
            break;
        default:    
            res.statusCode = 404
            res.setHeader('Content-Type','application/json')
            res.end(JSON.stringify({
                status:404,
                message:`No route exists for ${req.url} method ${req.method}`
            }))
            break;
    }
}


server.listen(port,host,()=>{
    console.log('Server is running on port:',port)
})
