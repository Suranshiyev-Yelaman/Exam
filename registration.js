let btn = document.querySelector("#submitReg");
let emailInput = document.querySelector("#email_input");
let passInput = document.querySelector("#password_input");
let codeDiv = document.querySelector("#code");

btn.addEventListener("click", () => {
        let num = Math.floor(Math.random() * 10)

        let user = {
            email: emailInput.value,
            password: passInput.value,
            code: num,
            cart: [],
        }

        const sendEmail = (email, subject, message) =>{
        const templateParams = {
        subject: subject,
        message: message,
        to_email: email,
        };
        
        emailjs.send('service_wupqxkm', 'template_fg1qgg7', templateParams, 'Ier7mqD0S_6VKwDNh')
            .then(function(response) {
                let allUsers = JSON.parse(localStorage.getItem("users")) || [];
                user.code = num;
                allUsers.push(user);
                localStorage.setItem("users", JSON.stringify(allUsers));
                alert("Registration success!");
                btn.setAttribute('type', 'hidden')
                emailInput.setAttribute('type', 'hidden')
                passInput.setAttribute('type', 'hidden')
            console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
            console.log('FAILED...', error);
            }).then(()=>{
                codeDiv.innerHTML += `
                <input id="codeValue" placeholder="Code"/>
                <button id="codeBtn">Отправить код</button>
            `;
            let codeBtn = document.querySelector("#codeBtn");

            codeBtn.addEventListener('click', ()=>{
                let allUsers = JSON.parse(localStorage.getItem("users")) || [];
                let user = allUsers.find(i => i.email === emailInput.value);
                let code = document.querySelector("#codeValue").value;
                user.code && user.code === +(code) ? location.href = "login.html" : alert("incorrect code");
            })
            }); 
    }
    
        sendEmail(emailInput.value, "registration code", num)
});
