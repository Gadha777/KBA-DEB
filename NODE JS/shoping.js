const { toLower } = require('lodash');
const readline=require('readline');
const rl =readline.createInterface(
    {
        input:process.stdin,
        output:process.stdout
    });
const shopping=new Map();

function askCommand(){
    console.log('welcomee shopping cart system');
    console.log('available commands: add , remove, update, summary , checkout, exit');
    rl.question('\enter a command :',function(command){
        switch(command.trim().toLowerCase())
        {
            case 'add ':
                additemprompt();
                break ;
            case'remove':
                removeitemprompt();
                break;
            case 'update':
                updateitemprompt();
                break;
            case 'search':
                searchitemprompt();
                break; 
            case 'summary':
                printsummary();
                askCommand();
                break;
            case 'checkout':
                askCommand();
                break;
            case 'exit':
            rl.close();
            break;
         default:
            console.log('invalid command : please enter a valid command');
            askCommand();
            break;
        }
    })
}
function additemprompt(){
    rl.question('enter the product id ',function(id){
        rl.question('enter the product name ',function(name){
            rl.question('enter the product price ',function(name){
                rl.question('enter the product quanity ',function(quanity){
                    additem(id,name,parseFloat(price),parseInt(quanity));
                });
            });
        });
    });
}
function additem(id,name,price,quanity)
{
    if (shopping.has(id))
    {
        console.log(`error product with id ${id} already exists `);
    }
    else
    {
        shopping.set(id,{name, price, quanity});
        console.log(`product with id ${id} add to shopping`);
    }
}
function removeitemprompt(){
    rl.question('entr the product to remove ',function(id){
        removeitem(id);
        askCommand();
    });
}
function removeitem(id){
    if(shopping.has(id)){
        shopping.delete(id);
        console.log(`error : product with ${id} is found `);
    }
}

function searchitemprompt(){
    rl.question('enter the term ',function(searchterm){
        searchitems(searchterm);
        askCommand();
    })
}
function searchitems(searchterm){
    const result=[];
    for(const[id,item] of shopping){
        if(id.includes(searchterm)||item.name.includes(searchterm)||item.price.includes(searchterm)||item.quanity.includes(searchterm)){
            result.push({id,...additem});
        }
    }
}
function updateitemprompt(){
    rl.question('enter the product id ',function(id){
        rl.question('enter product name ',function(newname){
            rl.question('enter product price ',function(newPrice){
                rl.question('enter product quanity ',function(newQuantity){
                    updateitem(id,newname,newPrice ? parseFloat(newPrice):undefined ,newQuantity? parseInt(newQuantity):undefined);
                    askCommand();
                });
            });
        });
    });
}
function updateitem(id,newname,newPrice,newQuantity){
    if (shopping.has(id)){
        const item=shopping.get(id);
        item.name=newname||item.name;
        item.price=newPrice!==undefined ? newPrice :item.price;
        item.quanity=newQuantity!==undefined ? newQuantity :item.quanity;
        shopping.set(id,item);
        console.log(`product with id ${id} updated `)
    }
    else{
        console.log(`product with id ${id} not found `)
    }
}