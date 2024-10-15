let expenses=[];
let amountvalues=[];
let categories =[];

function addexpense()
{
    const descriptioninput=document.getElementById('description');
    const amountinput=document.getElementById('amount');
    const categoryinput=document.getElementById('category');
    const expenselist=document.getElementById('expenselist');

    let description=descriptioninput.value.trim();
    let amount=Number(amountinput.value.trim());
    let category=categoryinput.value.trim();

    if (description!== '' && !isNaN(amount))
    {
        expenses.push(description);
        amountvalues.push(amount);
        categories.push(category);

        const li=document.createElement('li');
        let descriptiontext=descriptioninput.value+ ' '+ amountinput.value +' '+ categoryinput.value;
        li.textContent=descriptiontext;

        switch(category.toLowerCase())
        {
            case 'food':
                li.classList.add('food');
                break;
            case 'transport':
                li.classList.add('transport');
                break;
            case 'entertainment':
                li.classList.add('entertainment');
                break;
            
        }
    // completedbutton
        const completebutton=document.createElement('button');
        completebutton.textContent='completed';
        completebutton.onclick=function(){
            li.classList.toggle('completed');
        };
        li.appendChild(completebutton);

        //editbutton
        const editbutton=document.createElement('button');
        editbutton.textContent='edit';
        editbutton.onclick=function()
        {
            // new input 
            li.textContent='';
            // Create a new input for editing
            const newdescription=document.createElement('input');
            newdescription.type='text';
            newdescription.value=description;
            li.appendChild(newdescription);

            const newamount=document.createElement('input');
            newamount.type='number';
            newamount.value=amount;
            li.appendChild(newamount);

            const newcategory=document.createElement('input');
            newcategory.type='text';
            newcategory.value=category;
            li.appendChild(newcategory);


          // Save button for edited movie
            const savebutton=document.createElement('button');
            savebutton.textContent='save';
            savebutton.onclick=function()
            {
                description=newdescription.value.trim();
                amount=newamount.value.trim();
                category=newcategory.value.trim();
                descriptiontext=description.value+ ' '+amount.value+' '+category.value;
                li.textContent=descriptiontext;
                li.appendChild(completebutton);
                li.appendChild(editbutton);
                li.appendChild(removebutton);
            };
            li.appendChild(savebutton);
        };
        li.appendChild(editbutton);

            //removebutton
            const removebutton=document.createElement('button');
            removebutton.textContent='remove';
            removebutton.onclick=function()
            {
                expenselist.removeChild(li);
                const expenseindex=expenses.indexOf(description);
                expenses.splice(expenseindex,1);
                amount.splice(descriptiontext,1);
                category.splice(descriptiontext,1);
            };
            li.appendChild(removebutton);
            expenselist.appendChild(li);
            descriptioninput.value='';
            amountinput.value='';
            categoryinput.value='';
        }
    
    else
    {
        alert('please enter a valid expense and category');

    }

}