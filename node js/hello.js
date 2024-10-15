console.log('hello.......');
const newname='Node.js';
console.log('hello...',`${newname}`)

if(newname==="Node.js")
{
    console.log('running on node.js environment !');
}

const lodash=require('lodash');
for(let i=0;i<5;i++){
    console.log(i+1);
}
let array=[1,2,3,4,5];
console.log(lodash.reverse(array));
console.log(lodash.capitalize('hello world'));