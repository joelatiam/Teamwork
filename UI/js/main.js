
let localUser ={};

document.addEventListener('DOMContentLoaded', (event) => {

    // index signup

    // dispay Signin or signup contents
    const displaySign = document.querySelectorAll('.Signup-signin div');
    if (displaySign) {
        displaySign.forEach((e) => {
            displayForm(e);
        });
    }



    // Fill datas to department Options
    const userDepartment = document.querySelector("div.input-area select[name='department']");
    if (userDepartment){
        displayDepartments(userDepartment);

        // Data to the Job Role Option
        userDepartment.addEventListener('change', () => displayJob(userDepartment.value));
    }


    const userSignup = document.querySelector('.signupButton');
    if (userSignup) {
        userSignup.addEventListener('click', () => userSign('signup'));
    }



    // first Category page
    // Message to new user
    const userHeader = document.querySelectorAll('.new-user-message>p .userFirstName');
    if(userHeader){
        if (localStorage.getItem('user')){
            localUser = JSON.parse(localStorage.getItem('user'));
            messageToNewUser(userHeader, localUser.firstName);
        }
          
    }
    // first Category page
    //display topics for new users
    const categoryToDisplay = document.querySelector('.categories-list-selection');
    if(categoryToDisplay){
        topicsReady(categoryToDisplay);
    }

});
