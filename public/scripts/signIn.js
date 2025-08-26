

const form = document.querySelector('form');


form.addEventListener('submit' , async (e) => {

    e.preventDefault();

    const email = form.email.value;
    const password = form.password.value;

    try{

        const responses = await fetch('/admin/login' , {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({email , password})
        })


        const data = await responses.json();

        console.log(data);


        if(data.error){
            console.log(data.error);
        }

        if(data.success){
            location.assign('/admin');
        }
    }catch(err){
        console.log(err);
    }
})