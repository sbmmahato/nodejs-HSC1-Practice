/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module

  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files

  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt

    - For any other route not defined in the server return 404

    Testing the server - run `npm run test-fileServer` command in terminal
 */
    const express = require('express');
    const fs = require('fs');
    const path = require('path');
    const app = express();
    
    // const fs=require('fs');
    
    app.listen(3000,()=>{
      console.log("running");
    })
    
    // function fn(res){
    //   let list=fs.readdir(path.join(__dirname + '/files/'),);
    //   let obj={list}
    //   // for(let i=0;i<list.length;i++){
    //   //   obj[i].filename=list[i];
    //   // }
      
    //   res.status(200).send(obj)
    // }
    
    app.get('/files', (req,res)=>{
      fs.readdir(path.join(__dirname+'/files/'), (err,data)=>{
        if(err){
          res.status(400).send(err);
        }else{
          res.status(200).json(data);
        }
      })
    })
    
    ///////////////////////////////////////////////////
    
    
    app.get('/files/:filename', (req,res)=>{
      let pathfile=path.join(__dirname + '/files/' + req.params.filename);
    
      fs.readFile(pathfile,'utf-8', (err,data)=>{
        if(err){
          res.status(404).send(" file not found");
        }else{
          res.status(200).send(data);
        }
      })
    })
    
    module.exports = app;
    