const readline =require('readline');//import readline module
const rl =readline.createInterface({
    input :process.stdin,
    output :process.stdout
});
function askName()
{
    rl.question("what is your name ?",function (name ){
        console.log(`Hello ,${name}!`)
        askfavoriteLanguage();
    });
}
function askfavoriteLanguage()
{
    rl.question("what is your favorite programming language ?",function (language ){
        console.log(`${language} is a great choice !`);
        rlclose();
    });
}
console.log('welcome to simple interfaceusing readdline');
askName();
