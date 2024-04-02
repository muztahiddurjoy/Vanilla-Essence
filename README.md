# Project 1.0 - Vanilla Essence
a todo list app built using nodejs
### Run Command
`node index.js` if you have nodemon installed `nodemon index.js`
### Modules Used
[http], [path], [fs]
### Pages
home, about, todo

### Folder Structure

```
├── db   
│   ├── todo.json  
├── views   
│   ├── index.html   
│   ├── about.html
│   └── todo.html 
├── index.js   
├── package.json   
└── README.md  
```

## API Endpoints
The following API Endpoints are available.  


GET `/` : It returns the home html webpage as response  

GET `/about` : It returns the about html webpage as response    

GET `/todo` : It returns the todo html webpage as response  

GET `/todo/api` : It returns the list of todos in json format.  

Example Response: 
```
[ 
    {  
        "id":1,  
        "title":"finish Vanilla Essence",  
        "completed":false,  
        "date":"2024-04-02T00:34:26.467Z"  
    }  
  ]
```

POST `/todo/api/new` : Add todo to the list

Example Request:

```
    {
        "title":"finish Vanilla Essence",  
        "completed":false,  
        "date":"2024-04-02T00:34:26.467Z"  
    }  
```
PUT `/todo/api` : It updates a completed task to incomplete and incomplete task to complete

Example Request:

```
    {
        "id":1
    }  
```


[http]: https://nodejs.org/api/http.html
[path]: https://nodejs.org/api/path.html
[fs]: https://nodejs.org/api/fs.html