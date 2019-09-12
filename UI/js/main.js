
let localUser ={};

document.addEventListener('DOMContentLoaded', (event) => {


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

    // Message to new user
    const userHeader = document.querySelectorAll('.new-user-message>p .userFirstName');
    if(userHeader){
        localUser = JSON.parse(localStorage.getItem('user'));
        messageToNewUser(userHeader, localUser.firstName);
        
    }

    //display topics for new users
    const categoryToDisplay = document.querySelector('.categories-list-selection');
    if(categoryToDisplay){
        topicsReady(categoryToDisplay);
    }

});
