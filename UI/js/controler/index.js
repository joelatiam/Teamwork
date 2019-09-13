

const displayForm = (signInUp) => {

    signInUp.addEventListener('click',()=>{
        const activeYes = 'sign-box sign-active-yes';
        const activeNo = 'sign-box sign-active-no';

        const signupForm = document.querySelector('.signup-form');
        const signinForm = document.querySelector('.signin-form');
        

        const activeSide = document.querySelector('.sign-box.sign-active-yes');
        if (activeSide) {
            activeSide.setAttribute('class', activeNo);

        }

        signInUp.setAttribute('class', activeYes);

        const option = signInUp.innerHTML;
        if (option === 'Signup') {
            const hidden = document.querySelector('.hidden');
            if('hidden'){
                signupForm.classList.remove('hidden');
                signinForm.classList.add('hidden');
            }
            
        }else{
            const hidden = document.querySelector('.hidden');
            if ('hidden') {
                signinForm.classList.remove('hidden');
                signupForm.classList.add('hidden');
            }
           
        }
    });

};



const displayDepartments = (dep) => {

    let departmentFragment = document.createDocumentFragment();

    myCompany.forEach((department) => {
        let option = document.createElement('option');
        
        option.innerHTML = department[0];
        option.setAttribute("value", department[0]);

        departmentFragment.appendChild(option);

    });

    dep.appendChild(departmentFragment);

}

const displayJob = (dep) => {
    const jobRole = document.querySelector("div.input-area select[name='jobRole']");
    jobRole.innerHTML = `
    <option value="" disabled>--Your Job Role--</option>
                     `;
    let jobFragment = document.createDocumentFragment();

    const userDepartment = myCompany.find((department)=>{
        return department[0] === dep;
    })
    if (userDepartment){
        userDepartment[1].forEach((job)=>{
            let option = document.createElement('option');

            option.innerHTML = job;
            option.setAttribute("value", job);

            jobFragment.appendChild(option);
        });
    jobRole.appendChild(jobFragment);
    }

}

let currentUser = {};
if (localStorage.getItem('user')) {
    currentUser = JSON.parse(localStorage.getItem('user'));

    if (currentUser.email) {
        const user = users.findIndex(u => u.email === currentUser.email);
        console.log(user)
    
        if (user>-1) {
//             const userTopics = currentUser.topics.length;
//             const topicsData = users[user].topics.length;

            const myTopics = currentUser.topics;
            const serverTopics = users[user].topics;
            let updateTop = [];

            myTopics.forEach((topic)=>{
                if(serverTopics.includes(topic)===false){
                    serverTopics.push(topic)
                }
            });
            users[user].topics = serverTopics;


//             if (userTopics !== topicsData) {
//                 users[user].topics = currentUser.topics;
//             }
        } else users.push(currentUser);
//         console.log(users);

    } 
    console.log(users);
};
