const express = require("express")

const app=express()

const limitTime=process.env.EXT || 20;
const Delay= process.env.INT || 1000;
const PORT = process.env.PORT || 3000;

let connect=[];

app.get("/date",(req,res,next)=>{
  res.setHeader("Content-Type","text/html; charset=utf-8");
  res.setHeader("Transfer-Encoding","chunked")
  connect.push(res)
  setTimeout(run,Delay);

});


let tick=0;
function run(){
    const date = new Date().toUTCString();
    console.log(date);
   
    if(++tick>limitTime){
          connect.map(res=>{
          res.write("END\n");
          res.end();
      })
      connect=[];
      tick=0;
      const date = new Date().toUTCString();
     
    }
  
    connect.map((res,i)=>{
      res.write(`Hello ${i} person! Date: ${date}.\n`);
    })
    setTimeout(run,Delay);
  

  } 
  
 

app.listen(PORT, ()=>{
    console.log(`Server is runnung on port ${PORT}`);
    console.log(`Server delay ${Delay}`);
    console.log(`Время работы сервера ${limitTime} секунд`);
});