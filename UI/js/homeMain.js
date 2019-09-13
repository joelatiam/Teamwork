let localUser = {};



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
    //display topics for new 
    
    

    const categoryToDisplay = document.querySelector('.categories-list-selection');
    if(categoryToDisplay){
        topicsReady(categoryToDisplay);
    }

    // home page

    const userTopMenu = document.querySelector('.app-menu>.user-info .user-name');
    if (userTopMenu) {
        if (localStorage.getItem('user')) {
            localUser = JSON.parse(localStorage.getItem('user'));
            
            

            displayTopUserMenu(userTopMenu, localUser);
            

        }

    }
});
