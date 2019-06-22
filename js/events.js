//const url = base+'/items?accessToken='+key;
const urlPost = `${base}/items?accessToken=${key}`;

//function for event
function newTasks(event, targetSectionId) {
    var element = document.querySelector(`section #${targetSectionId}`);
    console.log(targetSectionId);
    if (element) {
        var newEl = '';
        var newForm = document.querySelector('#taskForm');
        if (!newForm) {
            newEl+= '<p>'+ "Please fill out all outlined sections below." +'<em>'+" (All are required to progress)"+ '</em>';
            newEl += '<form action="" method="POST" id="taskForm">';
            newEl+='<p><em>'+"Minimum 4 characters for each input"+'</em></p>';

            newEl += '<div>';
            newEl += '<textarea type="text" name=taskName cols="93" rows="2" required id="taskTitle" minlength="4"></textarea>';        
            newEl += '<label for="taskName" class=labelText>' + "Task Name" + '</label>';           
            newEl += '</div>';
            
            
            newEl += '<div>';           
            newEl += '<textarea type="text" name=taskDes cols="93" rows="2" required id="description" minlength="4"></textarea>';         
            newEl += '<label for="taskDes" class=labelText>' + "Task Description" + '</label>';
            newEl += '</div>';

            newEl += '<div>';  
            newEl += '<input type="date" name=dueDate required id="dueDate">';           
            newEl += '<label for="dueDate" class=labelText>' + "Due Date" + '</label>';
            newEl += '</div>';

            newEl += '<div>';
            newEl += '<input type="submit" value="Submit" id="submit">';
            newEl += '</div>';
            newEl += '</form>';


            element.insertAdjacentHTML("beforeend", newEl);

            const form = document.querySelector('#taskForm');

            if (form) {
                form.addEventListener('submit', function (e) {

                    e.preventDefault();

                    if (targetSectionId == 'backlog') {
                        listId = 1;
                    } else if (targetSectionId == 'implementation') {
                        listId = 2;
                    } else if (targetSectionId == 'complete') {
                        listId = 3;
                    }

                    const taskTitle = document.querySelector('#taskTitle');
                    const taskDesc = document.querySelector('#description');
                    const dueDate = document.querySelector('#dueDate');

                    const formData = {

                        title: taskTitle.value,
                        description: taskDesc.value,
                        dueDate: dueDate.value,
                        listId: listId

                    }

                    const config = {

                        method: 'POST',
                        body: JSON.stringify(formData),
                        headers: {
                            'content-type': 'application/json'
                        }
                    }

                    fetch(urlPost, config)

                        .then(response => {

                            if (response.ok) {

                                return response.json();

                            }
                            throw response;
                        })
                        .then(data => {
                            location.reload();
                            // handle json data
                            console.log(data);
                        })
                        .catch(error => {
                            // handle error
                            console.log(error);
                        });
                    return false;
                })

            }
        }
    }

}

//var to grab the buttons on the page
function button() {
    //const submitButtons = document.querySelectorAll('button');
    const sections = document.querySelectorAll('#tasks section');

    //console.log(sections)

    for (var i = 0; i < sections.length; i++) {
        // TODO: Get the submit button inside of sections[i]
        const submitButton = sections[i].querySelector('.newTaskButton');
        //const submitButton = document.querySelector(sections[i].id + ' button');
        const section = sections[i];
        submitButton.addEventListener('click', function (e) {

            newTasks(e, section.id);
        });
    }
}

//const submitButton = document.querySelector('#submit');