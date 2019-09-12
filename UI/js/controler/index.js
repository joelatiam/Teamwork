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