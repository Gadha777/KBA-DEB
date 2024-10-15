const filesystem=require('fs');
filesystem.readFile('example.text','utf-8',(err,data)=>
{
if (err) throw err ;
console.log(data);
})