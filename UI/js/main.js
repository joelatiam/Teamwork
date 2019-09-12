
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
});
