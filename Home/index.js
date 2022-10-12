const yargs = require('yargs')
const path =require('path')
const fs= require('fs')
const util = require('util');
const { resolveAny } = require('dns');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


const args = yargs
.usage('Usage: node $0 [options]')
.help('help')
.alias('help','h')
.version('0.0.1')
.alias('version','v')
.option('entry', {
  alias: 'e',
  describe: 'Указывает путь к читаемой директории',
  demandOption: true
})
.option('dist', {
   alias:'d',
   describe:'Путь куда выложить',
   default: './dist'
})
.option('delete',{
    alias: 'D',
    describe: 'Будет ли удалять?',
    default: false,
    boolean: true
})
.argv

const config= {
 entry: path.normalize(path.resolve(__dirname, args.entry)),
 dist: path.normalize(path.resolve(__dirname, args.dist)),
 isDelete: args.delete
}


const copy = async (sourceDir, destDir, file) => {
  destDir = path.join(destDir, file.charAt(0).toLowerCase());
  const destFile = path.join(destDir, file);
  const sourceFile = path.join(sourceDir, file);

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
  }
  let prochit;
  prochit =  fs.readFileSync(sourceFile);
config.log

    fs.writeFileSync(destFile, prochit);
  

  return true;
};


function sorter(source){

  return new Promise((resolve, reject) => {
 try{
      fs.readdirSync(source).forEach(file => {
        const state = fs.statSync(path.join(source, file));
        const curPath=path.resolve(source, file);

        console.log(curPath)
      if(state.isDirectory()){
      sorter(curPath)

throw(err)
      }  
      else
      {
        
        if (!fs.existsSync(config.dist)) {
          fs.mkdirSync(config.dist);
        }
        
       copy(source,config.dist,file)
      }
    });
    resolve(true);
  }
  catch(err) {
  
  }

}
)}
sorter(config.entry)