const yargs = require('yargs')
const path =require('path')
const fs= require('fs')
const{ mkdir, reafdir, stats,copyFile}=require('./modules/fs')



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

async function sorter2(src){
    const files=await reafdir(src)

    for (const file of files) {
      const currPath=path.resolve(src, file);
      const stat= await stats(currPath)
      if(stat.isDirectory()){
        await sorter2(currPath)
    }
    else{
     const innerPath=path.resolve(config.dist, file.charAt(0).toLowerCase())
    
     await mkdir(config.dist)
     await mkdir(innerPath)
     await copyFile(currPath, path.resolve(innerPath,file) )
     console.log(currPath)
    }

}
}

(async function(){
try{
  await sorter2(config.entry)
  console.log('end')
} catch(error){
  console.log(error)
}
}())


