let activties=[];
let intensities=[];

function addactivity(){
 
const activityinput=document.getElementById('activity');
const intensityinput=document.getElementById('intensity');
const activitylist=document.getElementById('activitylist');

const activity=activityinput.value.trim();
const intensity=intensityinput.value.trim();

if(activity !==' ' && intensity!=='')
{
    activties.push(activity);
    intensities.push(intensity);
    
    const li =document.createElement('li');
    const activitytext=activityinput.value+' '+ intensityinput.value;
    li.textContent=activitytext;


    switch(intensity.toLowerCase())
    {
        case 'low':
            li.classList.add('low');
            break;
        case 'medium':
            li.classList.add('medium');
            break;
        case 'high':
            li.classList.add('high');
            break;
    }
   
  
    //completebutton

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
        li.textContent='';
      
        const newactivity=document.createElement('input');
        newactivity.type='text';
        newactivity.value=activity;
        li.appendChild(newactivity);

        const newintensity=document.createElement('input');
        newintensity.type='text';
        newintensity.value=intensity;
        li.appendChild(newintensity);

        //savebutton

        const savebutton=document.createElement('button');
        savebutton.textContent='save';
        savebutton.onclick=function()
        {
            // const activity=newactivity.value.trim();
            // const intensity=newintensity.value.trim();
            const activitytext= newactivity.value+ ' '+ newintensity.value;
            li.textContent=activitytext;
            
            li.appendChild(completebutton)
            li.appendChild(editbutton)
            li.appendChild(removebutton)
        };
        li.appendChild(savebutton);
        
    };
    li.appendChild(editbutton);

    //removebutton
    const removebutton=document.createElement('button');
    removebutton.textContent='remove';
    removebutton.onclick=function()
    {
        activitylist.removeChild(li);
        activityindex=activties.indexOf(activity);
        activties.splice(activityindex,1);
        intensities.splice(activitytext,1);
    }
   
   
 li.appendChild(removebutton)
 activitylist.appendChild(li);
}
else
{
    alert('enter a valid input')
}

};