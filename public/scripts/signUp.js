

const form = document.querySelector('form');


form.addEventListener('submit' , async (e) => {

    e.preventDefault();

    const email = form.email.value;
    const username = form.username.value;
    const password = form.password.value;

    try{

        const responses = await fetch('/admin/sign-up' , {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({email , username , password})
        })


        const data = await responses.json();

        console.log(data);

        if(data.success){
            location.assign('/admin');
        }
    }catch(err){
        console.log(err);
    }
})