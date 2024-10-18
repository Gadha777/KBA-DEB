const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

const shoppingcart = new Map();

function askCommand(){
    console.log("Welcome to shopping cart system!");
    console.log("Available commands: add, remove, search, update, summary, checkout, exit");
    rl.question("\Enter a command: ", function (command){   //(command)=FETCHED STANDARD INPUT
        switch(command.trim().toLowerCase()){
            case 'add':
                addItemPrompt();
                break;
            case 'remove':
                removeItemPrompt();
                break; 
            case 'search':
                searchItemPrompt();
                break; 
            case 'update':
                updateItemPrompt();
                break; 
            case 'summary':
                printSummary();
                askCommand();  //recurssion
                break;
            case 'checkout':
                checkout();
                askCommand(); 
            case 'exit':
                rl.close();
                break;
            default:
                console.log('Invalid command: enter a valid choice!');
                askCommand();
                 break;
        }
    });
}
//function to add an item
function addItemPrompt(){                          //nested functions
    rl.question("Enter product id: ", function(id){     //callback fn
        rl.question("Enter product name: ",function(name){      //here both id& name are availabale
            rl.question("Enter product price: ",function(price){    
                rl.question("Enter product quantity: ", function(quantity){
                    addItem(id,name,parseFloat(price),parseInt(quantity));
                    askCommand();
                });
            });
        });
    });
}
function addItem(id,name,price,quantity){          //logic- here is adding the value in to map
    if(shoppingcart.has(id)){
        console.log(`Error product with id ${id} already exists`);
    }else{
        shoppingcart.set(id,{name,price,quantity});
        console.log(`Product with ID ${id} added to shopping cart!`)
    }
}
//function to remove an item
function removeItemPrompt(){
    rl.question("Enter a product to remove: ",function(id){
        removeItem(id);
        askCommand();
    });
}
function removeItem(id){
    if(shoppingcart.has(id)){
        shoppingcart.delete(id);
        console.log(`Error:  No product with ID ${id} found!`)
    }
}
//function to search an item
function searchItemPrompt(){
    rl.question("Enter serach term: ",function(searchTerm){
        searchItems(searchTerm);
        askCommand();
    });
}
function searchItems(searchTerm){
    const results=[];
    for(const[id,item] of shoppingcart){
        if(id.includes(searchTerm)||item.name.includes(searchTerm)||item.price.includes(searchTerm)||item.quantity.includes(searchTerm)){
            results.push({id,...item});      //spread syntax-This syntax allows you to create a new object that combines the id with all the properties from item.
        }

    }
    if(results.length>0){
        console.log('Serach Results:',results);
    }else{
        console.log('No products found!')
    }
}
//function to update an item
function updateItemPrompt(){
    rl.question("Enter product id: ", function(id){
        rl.question("Enter product name: ",function(newName){
            rl.question("Enter product price: ",function(newPrice){
                rl.question("Enter product quantity: ", function(newQuantity){
                    updateItem(id,newName,newPrice ? parseFloat(newPrice) : undefined, newQuantity ? parseInt(newQuantity) : undefined)
                    askCommand();
                });
            });
        });
    });
}
function updateItem(id,newName,newPrice,newQuantity){
    if(shoppingcart.has(id)){
        const item = shoppingcart.get(id);
        item.name = newName || item.name;
        item.price = newPrice !== undefined ? newPrice : item.price;
        item.quantity = newQuantity !== undefined ? newQuantity : item.quantity;
        shoppingcart.set(id,item);
        console.log(`Product with ID ${id} updated!`);
    }else{
        console.log(`Product with ID ${id} not found!`); 
    }
}
//function to print summary
function printSummary(){
    if(shoppingcart.size>0){
        console.log('Shopping Cart Summary: ');
        let total=0;
        for(const [id,item] of shoppingcart){
            const subtotal = item.price * item.quantity;
            total += subtotal;
            console.log(`ID: ${id},Name: ${item.name}, Price: ₹${item.price.toFixed(2)}, Quantity: ${item.quantity}, Subtotal: ₹${subtotal.toFixed(2)}`);
        }
        console.log(`Total Amount: ₹${total.toFixed(2)}`);
    }else{
        console.log('No products found!')
    }
}
// Function to checkout (clear the cart)
function checkout(){
    if(shoppingcart.size>0){
        console.log("Proceeding to checkout....");
        shoppingcart.clear();
        console.log("Thank you for your purchase! Your cart is now empty.");
    } else {
        console.log("Your cart is empty. Add items before checking out.");
    }
}
askCommand();