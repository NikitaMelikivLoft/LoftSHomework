const path = require("path");
const util = require("util");
const fs = require("fs");

const readdir = util.promisify(fs.readdir);

const config = {
  typeDirs: [
    { type: ".txt", directory: "" },
  ]
};



const directory = process.argv[2];
const directoryout = process.argv[3];



if (!fs.existsSync(directoryout)) {
  fs.mkdirSync(directoryout);
}
if (!directory) {
  console.log("Specify target directory");
  return;
}

function createDir(src, cb){
  //проверка есть ли папка
  if(!fs.existsSync(src)){
      fs.mkdir(src,(err)=>{
     
         if(err)  throw err


         cb()
      })
  }else{
     cb()
  }
}

[...config.typeDirs, { directory: "" }].map(d => {
  const dirname = `${directory}/${d.directory}`;
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname);
  }
});

// Move files
(async () => {
  const files = await readdir(directory);

  files.forEach(file => {
    const fLetter = file.charAt(0).toLowerCase();
    if (!fLetter) {
      return;
    }

 
  
    const oldPath = path.join(__dirname, directory, file);
    const newPath = path.join(__dirname,directoryout, fLetter, file);
console.log(newPath);
    // Moving files using rename

    createDir(directoryout, ()=>{
      const innerPath=path.resolve(directoryout, file.charAt(0).toLowerCase())
     createDir(innerPath,()=>{
         fs.copyFile(oldPath, newPath,(err)=>{
             if(err)  throw err
         })
     })
}) 
   
  });
})(); 