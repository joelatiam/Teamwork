const errorMessage= {
    emptyString: 'Please Input a value',
    userName: 'Length should be 2-20 characters',
    wrongCharacter: 'Only characters between A to Z',
    wrongEmailFormat: 'Invalid Email format',
    pwLenght: 'Rerquired length 6-20 characters',
    pwSpace: 'Empty spaces are not alowed',
    pwMatch: 'Password should match',
    weakPass: 'Weak password',
    addressLength: 'Your string is too short',
    addressFormat: 'Format not accepted'

}

const emptyWord= (userInput) => {
    userInput.classList.add('errorinPlaceHolder');
    userInput.value = '';
    userInput.placeholder = errorMessage.emptyString;
}

const nameLenght = (userName) => {
    userName.classList.add('errorinPlaceHolder');
    userName.value = '';
    userName.placeholder = errorMessage.userName;
}

const nameCharacter = (userName) => {
    userName.classList.add('errorinPlaceHolder');
    userName.value = '';
    userName.placeholder = errorMessage.wrongCharacter;
}

const emailFormat = (userEmail) => {
    userEmail.classList.add('errorinPlaceHolder');
    userEmail.value = '';
    userEmail.placeholder = errorMessage.wrongEmailFormat;
}

const passwordLenght = (userPassword) => {
    userPassword.classList.add('errorinPlaceHolder');
    userPassword.value = '';
    userPassword.placeholder = errorMessage.pwLenght;
}

const passwordSpace = (userPassword) => {
    userPassword.classList.add('errorinPlaceHolder');
    userPassword.value = '';
    userPassword.placeholder = errorMessage.pwSpace;
}

const passwordWeak = (userPassword) => {
    userPassword.classList.add('errorinPlaceHolder');
    userPassword.value = '';
    userPassword.placeholder = errorMessage.weakPass;
}


const passwordConf = (userPw) => {
    userPw.classList.add('errorinPlaceHolder');
    userPw.value = '';
    userPw.placeholder = errorMessage.pwMatch;
}

const addressLength = (userAddress) => {
    userAddress.classList.add('errorinPlaceHolder');
    userAddress.value = '';
    userAddress.placeholder = errorMessage.addressLength;
}

const invalidAddress = (userAddress) => {
    userAddress.classList.add('errorinPlaceHolder');
    userAddress.value = '';
    userAddress.placeholder = errorMessage.addressFormat;
}