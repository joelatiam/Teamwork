const newAccount = (data) =>{
    let newUser = data;
    
    newUser.topics = [];
    newUser.joined = Date.now();

    const usedEmail = users.find((user) => user.email === newUser.email);

    if(usedEmail){
        const email = document.querySelector("div.input-area input[name='email']");
        emailIsUsed(email) ;
    }else{
        users.push(newUser);

        const { email, password } = newUser;

        signin(email, password);
    }

    

    
}

const signin = (uEmail, uPassword) => {

    const email = document.querySelector("div.input-area input[name='email'].signin-email");
    const password = document.querySelector("div.input-area input[name='password'].signin-password");
    
    if(uEmail.length<1){

        emptyWord(email);

    } else if (uPassword.length < 1) {

        emptyWord(password);
    }else {
        const user = users.find((user) => {
            return user.email === uEmail && user.password === uPassword;
        });

        if (user) {

            localStorage.setItem("user", JSON.stringify(user));

            if (user.topics.length < 3) {
                window.location.assign("firstCategory.html");
            } else {
                window.location.assign("home.html");

            }

        } else {
            failedAuth(email, password);
        }
    }

    

    

}

