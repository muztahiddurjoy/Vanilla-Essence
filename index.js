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
            const file = fs.readFileSync(path.join(__dirname,'./views/index.html')).toString()
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
            const result = fs.readFileSync(path.join(__dirname,'./db/todo.json'))
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
                const result = fs.readFileSync(path.join(__dirname,'./db/todo.json'))
                let data = JSON.parse(result)
                let newData = ''
                req.on('data',(chunk)=>{
                    newData += String(chunk)
                })
                req.on('end',()=>{
                    const {title,date} = JSON.parse(newData)
                    data.push({
                        id:data.length+1,
                        title,
                        completed:false,
                        date
                    })
                    fs.writeFileSync(path.join(__dirname,'./db/todo.json'),JSON.stringify(data))
                    res.end(JSON.stringify({
                        status:200,
                        message:'Todo added successfully'
                    }))
                })
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
            const file = fs.readFileSync(path.join(__dirname,'./views/about.html')).toString()
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
            let tasksHTML = ""
            const file = fs.readFileSync(path.join(__dirname,'./views/todo.html')).toString()
            const todos = fs.readFileSync(path.join(__dirname,'./db/todo.json')).toString()
            JSON.parse(todos).splice(0).reverse().forEach((todo)=>{
                tasksHTML += `<li class="todo__taskcontainer">
                <input type="checkbox" id="${todo.id}" class="todo__taskcheck">
                <div class="">
                    <label class="todo__tasktext" ${todo.completed&&'style="text-decoration: line-through;"'} for="${todo.id}">${todo.title}</label>
                    <p class="todo__taskdate">${new Date(todo.date).toLocaleDateString()}</p>
                </div>               
                </li> `
            })
            res.end(file.replace('<!--LIST-->',tasksHTML))
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
 