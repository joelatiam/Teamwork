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

const signin = (email, password) => {

    const user = users.find((user) => {
        return user.email === email && user.password === password;
    });
    
    if (user){

        localStorage.setItem("user", JSON.stringify(user));

        if (user.topics.length<1){
            window.location.assign("firstCategory.html");
        }
        
    }

    

}

