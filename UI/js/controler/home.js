

const displayTopUserMenu = (parent, {firstName, lastName, jobRole}) =>{
    parent.innerHTML = '';

    let fullName = document.createElement('span');
    fullName.setAttribute('class', 'fullName');
    fullName.innerHTML = `${firstName} ${lastName}`;
    parent.appendChild(fullName);

    parent.innerHTML += ', ';

    let role = document.createElement('span');
    role.setAttribute('class', 'jobRole');
    role.innerHTML = jobRole;
    parent.appendChild(role);
}