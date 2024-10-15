    let movies=[];
    let priorities=[];

    function addplaylist()
    {
        const moviesinput=document.getElementById('Movie');
        const priorityinput=document.getElementById('priority');
        const movielist=document.getElementById('movielist');

        let Movie=moviesinput.value.trim();
        let priority=Number(priorityinput.value.trim());

        if (Movie!== '' && !isNaN(priority) && priority >=1 && priority<=3)
        {
            movies.push(Movie);
            priorities.push(priority);

            const li=document.createElement('li');
            let Movietext=moviesinput.value;
            li.textContent=Movietext;

            switch(priority)
            {
                case 1:
                    li.classList.add('priority-high');
                    break;
                case 2:
                    li.classList.add('priority-medium');
                    break;
                case 3:
                    li.classList.add('priority-low');
                    break;
            }
            // watchedbutton
            const completebutton=document.createElement('button');
            completebutton.textContent='watched';
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
                const newmovie=document.createElement('input');
                newmovie.type='text';
                newmovie.value=Movietext;
                li.appendChild(newmovie);


              // Save button for edited movie
                const savebutton=document.createElement('button');
                savebutton.textContent='save';
                savebutton.onclick=function()
                {
                    Movietext=newmovie.value.trim();
                    li.textContent=Movietext;
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
                    movielist.removeChild(li);
                    const Movieindex=movies.indexOf(Movie);
                    movies.splice(Movieindex,1);
                    priorities.splice(Movieindex,1);
                };
                li.appendChild(removebutton);
                movielist.appendChild(li);
                moviesinput.value='';
                priorityinput.value='';
            }
        
        else
        {
            alert('please enter a valid task and priority between 1 and 3');

        }

    }