
const url = location;
const path = url.pathname.split('/') ;

const id = path[3];


const updateBtn = document.getElementById('update');
const deleteBtn = document.getElementById('delete');

updateBtn.addEventListener('click' , async () => {

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    const response = await fetch(`/admin/update/${id}` , {
        method: 'PUT',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({title : title  , description : description} )
    })

    const data = await response.json();

    console.log(data);

    if(data.success){
        location.assign('/admin');
    }
})

deleteBtn.addEventListener('click' , async () => {


    const response = await fetch(`/admin/delete/${id}` , {
        method: 'DELETE',
        headers: {'Content-Type' : 'application/json'}
    })

    const data = await response.json();

    if(data.success){
        location.assign('/admin');
    }
})