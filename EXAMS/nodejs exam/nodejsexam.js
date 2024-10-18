const readline=require('readline');
const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
const  employeedetails=new Map();
 function askdetails(){
    console.log('welcome to  employeedetails');
    console.log('available commands : add,remove,update,search,summary,exit');
    rl.question('\enter the commad : ',function(commad){
        switch(commad.trim().toLowerCase()){

        case 'add':
            additemprompt();
            break;
        case 'remove':
            removeitemprompt();
            break;
        case 'update'                                                :
            updateitemprompt();
            break;
        case 'search':
            searchitemprompt();
            break;
        case 'summary':
             printsummary();
             askdetails();
        case 'exit':
            rl.close();
            
            break;
        default:
            console.log('error invalid commad : please enter a valid command');
            askdetails();
                        
        }
    });
 }
//add
 function additemprompt(){
    rl.question('enter employee id : ',function(id){
        rl.question('enter employee name : ',function(name){
            rl.question('enter employee department : ',function(department){
                rl.question('enter employee salary : ',function(salary){
                    additem(id,name,department,parseInt(salary));
                    askdetails();
                });
            });
        });
    });
 }
 function additem(id,name,department,salary){
    if(employeedetails.has(id)){
        console.log(`employee with id ${id} is already exist`);
    }
    else{
        employeedetails.set(id,{name,department,salary})
        console.log(`employee with id ${id} is added to employeedetails`);
    }
 }
//remove
function removeitemprompt(){
    rl.question(`enter employee id to remove : `,function(id) {
        removeitem(id);
        askdetails();
    });
}
function removeitem(id){
    if(employeedetails.has(id)){
        employeedetails.delete(id);
        console.log(`employee with id ${id} is removed`);
    }
    else{
        console.log(`employee id ${id}  not found`);
    }
}
//update
 
function updateitemprompt(){
    rl.question('enter employee id : ',function(id){
        rl.question('enter employee name : ',function(newname){
            rl.question('enter employee department : ',function(newdepartment){
                rl.question('enter employee salary : ',function(newsalary){
                    updateitem(id,newname,newdepartment,parseInt(newsalary));
                    askdetails();
                });
            });
        });
    });
}
function updateitem(id,newname,newdepartment,newsalary){
    if(employeedetails.has(id)){
        const item=employeedetails.get(id);
        item.name=newname||item.name;
        item.department=newdepartment||item.department;
        item.salary=newsalary|| item.salary;
        employeedetails.set(id,item);
        console.log(`employee with id ${id} updated `);
    }
    else
    {
        console.log(`employee with id ${id} not found`);
    }
}
//search
function searchitemprompt(){
    rl.question('enter employee term to search : ',function(searchterm){
        searchitem(searchterm);
        askdetails();
    });
}
function searchitem(searchterm){
    const results=[];
    for(const[id,item] of employeedetails)
        {
        if(id.includes(searchterm)||item.name.includes(searchterm)||item.department.includes(searchterm)||item.salary.includes(searchterm));
        {
            results.push({id,...item});
        }
    }
    if(results.length>0)
    {
        console.log('search results : ',results);
    }
    else
    {
        console.log('result not found');
    }
}
//summary
function printsummary(){
    if(employeedetails.size>0){
        console.log('employeedetails Summary: ');
        for(const [id,item] of employeedetails){
            console.log(`ID: ${id},Name: ${item.name}, Department : ${item.department}, Salary: ${item.salary}`);
        }
    }else{
        console.log('No employee found!')
    }
}
 askdetails();