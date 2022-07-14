





const register_form = document.getElementById("register_form")
const login_form = document.getElementById("login_form")
const message1 = document.querySelector(".message1")
const message2 = document.querySelector(".message2")






register_form.addEventListener("submit",async function(e) {
    e.preventDefault()
    // console.log("hello")
    const user_name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    let data = {
        name:user_name,
        email:email,
        password:password
    }

   await fetch("http://localhost:4000/register", {
        body:JSON.stringify(data),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(async function(response){
        return await response.json()
    }).then(result => {
        if(result.status===false){
            message2.innerHTML = `
            <div class="alert alert-danger" role="alert">
            ${result.message}            
            </div>
            `;
        }
        if(result.status===true){
            message2.innerHTML = `
            <div class="alert alert-success" role="alert">
            ${result.message}! You can login now.            
            </div>
            `;
            register_form.reset()
        }
    })

})




login_form.addEventListener("submit",async function(e) {
    e.preventDefault()
    console.log("hello")
    const email = document.getElementById("login_email").value
    const password = document.getElementById("login_password").value

    let data = {
        email:email,
        password:password
    }


   await fetch("http://localhost:4000/login", {
        body:JSON.stringify(data),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(async function(response){
        return await response.json()
    }).then(result => {
        if(result.status===false){
            message1.innerHTML = `
            <div class="alert alert-danger" role="alert">
            ${result.message}            
            </div>
            `;
        }
        if(result.status===true){
            message1.innerHTML = `
            <div class="alert alert-success" role="alert">
            ${result.message}!           
            </div>
            `;
            localStorage.setItem("user",JSON.stringify(result.data))
            setTimeout(() => {
                window.location.href = window.location.origin;
            }, 2000);
        }
    })

})

