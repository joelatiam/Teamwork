
const userSign = (type) => {
  if (type === 'signup') {
    signup();
  } else uSignin();

  // type==='signup'?signup():uSignin();
};

const signup = () => {
  const userData = authValidation('signup');
};

const uSignin = () => {
  const userData = authValidation('signin');
};

const authValidation = (type) => {
  const firstName = document.querySelector("div.input-area input[name='firstName']");
  const lastName = document.querySelector("div.input-area input[name='lastName']");
  const gender = document.querySelector("div.input-area>div input[name='gender']");
  const email = document.querySelector("div.input-area input[name='email']");
  const password = document.querySelector("div.input-area input[name='password']");
  const confirmPass = document.querySelector("div.input-area input[name='confirmPass']");
  const department = document.querySelector("div.input-area select[name='department']");
  const jobRole = document.querySelector("div.input-area select[name='jobRole']");
  const address = document.querySelector("div.input-area input[name='address']");

  if (type === 'signup') {
    const checkFirstName = userName(firstName);
    const checkLastName = userName(lastName);
    const checkGender = userGender(gender);
    const checkEmail = userEmail(email);
    const checkPWord = userPassword(password, confirmPass);
    const checkDepartmentAndJob = validateDepartment(department, jobRole);
    const checkAddress = validateAddress(address);

    // eslint-disable-next-line max-len
    const validInput = checkFirstName && checkLastName && checkGender && checkEmail && checkPWord && checkDepartmentAndJob && checkAddress;


    if (validInput) {
      const userData = {
        firstName: firstName.value,
        lastName: lastName.value,
        gender: gender.value,
        email: email.value,
        password: password.value,
        department: department.value,
        jobRole: jobRole.value,
        address: address.value,
      };
      newAccount(userData);
    }
  }

  if (type === 'signin') {
    const email = document.querySelector("div.input-area input[name='email'].signin-email");
    const password = document.querySelector("div.input-area input[name='password'].signin-password");

    signin(email.value, password.value);
  }
};
