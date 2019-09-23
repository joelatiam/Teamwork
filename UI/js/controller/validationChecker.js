
const regexpressions = {
    name : /[^A-Za-zÀ-ÿ]/g,
    email :/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    pwSpace : /\s/g,
    address: /^\s/g,
};



const userName = (formName) =>{
    
    let status = false;

    const {name} = regexpressions;
    const {value} = formName;

    switch (true) {

        case (value === ''):
            status = false;
            emptyWord(formName);
            break;

        case (value.length > 20 || value.length <2):
            shortLength(formName);

            status = false;
            break;

        case (name.test(value)):
            nameCharacter(formName);
            status = false;
            break;
    
        default:
            status = true;
            break;
    }
    
    return status;
}

const userGender = (formGender) =>{
    return myGender.includes(formGender.value);
}

const userEmail = (formEmail) =>{
    const {email} = regexpressions;
    const {value} = formEmail;
    let status = false

    switch (true) {
        case (value === ''):
            status = false;
            emptyWord(formEmail);
            break;

        case (!email.test(value)):
            status = false;
            emailFormat(formEmail);
            break
    
        default:
            status = true
            break;
    }
    return status;
}

const userPassword = (userPw, confirmPw) =>{
    let status = false;

    const {value} = userPw;
    const {pwSpace} = regexpressions;

    const weakPassword = (value) =>{
        const arrayPw = value.split('');
        const newValue = Array.from(new Set(arrayPw));
        return newValue.length<4;

    }
    

    switch (true) {

        case (value === ''):
            status = false;
            emptyWord(userPw);
            break;

        case (value.length < 6 || value.length > 20 ):
            passwordLenght(userPw);
            status = false;
            break;

        case (pwSpace.test(value)):
            passwordSpace(userPw);
            status = false;
            break;

        case (weakPassword(value)):
            passwordWeak(userPw);
            status = false;
            break;
        
        case (value !== confirmPw.value):
            passwordConf(confirmPw);
            status = false;
            break;

        default:
            status = true;
            break;
    }

    return status;
}

const validateDepartment = (dep, job)=>{
    let validation = false;

    myDepartment = myCompany.find((department)=>{
       return department[0] === dep.value;
    });
    if (myDepartment){
       let jobList = myDepartment[1];
        let myJob = jobList.find((role) => {
            return role === job.value;
        });
        if (myJob) validation = true;
    }
    return validation;
}

const validateAddress = (formAddress) => {
    let status = false;

    const { address } = regexpressions;
    const { value } = formAddress;

    switch (true) {

        case (value === ''):
            status = false;
            emptyWord(formAddress);
            break;

        case (value.length < 10):
            addressLength(formAddress);

            status = false;
            break;

        case (address.test(value)):
            invalidAddress(formAddress);
            status = false;
            break;

        default:
            status = true;
            break;
    }

    return status;
}