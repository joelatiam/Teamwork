
// redirect to the index page
// if (!localStorage.getItem('user')) {
//     window.location.assign("index.html");
// }

// let currentUser = {};
// currentUser = JSON.parse(localStorage.getItem('user'));

// ready to display topics

document.addEventListener('DOMContentLoaded', (event) => {
  const userTopMenu = document.querySelector('.app-menu>.user-info .user-name');
  if (userTopMenu) {
    if (localStorage.getItem('user')) {
      localUser = JSON.parse(localStorage.getItem('user'));

      const displayTopUserMenu = (parent, { firstName, lastName, jobRole }) => {
        parent.innerHTML = '';

        const fullName = document.createElement('span');
        fullName.setAttribute('class', 'fullName');
        fullName.innerHTML = `${firstName} ${lastName}`;
        parent.appendChild(fullName);

        parent.innerHTML += ', ';

        const role = document.createElement('span');
        role.setAttribute('class', 'jobRole');
        role.innerHTML = jobRole;
        parent.appendChild(role);
      };


      displayTopUserMenu(userTopMenu, localUser);
    }
  }
});


const topicsReady = (parent) => {
  const allTopics = topics;
  const myTopics = localUser.topics;
  const userEmail = localUser.email;

  let updateMyTopics = myTopics;

  const submitButton = document.querySelector('.categories-submit button.submit-button');
  if (myTopics.length < 3) {
    submitButton.setAttribute('disabled', 'true');
  }


  const updateUser = () => {
    let user = users.findIndex((u) => u.email === localUser.email);
    if (user === -1) {
      users.push(localUser);
    }
    user = users.findIndex((u) => u.email === localUser.email);

    if (user >= 0) {
      users[user].topics = updateMyTopics;
      localStorage.setItem('user', JSON.stringify(users[user]));

      if (users[user].topics.length > 2) {
        window.location.assign('home.html');
      }
    }
  };


  // display topic list
  topicList(parent, allTopics);

  // edit topic List
  const topicButton = document.querySelectorAll('button.category-select');
  if (topicButton) {
    // display my topics in green
    updateMyTopics.forEach((elt) => {
      const myTopic = document.getElementById(`topic ${elt}`);
      if (myTopic) {
        myTopic.classList.remove('unselected-category');
        myTopic.setAttribute('class', 'category-select selected-category');
      }
    });

    topicButton.forEach((btn) => {
      btn.addEventListener('click', () => {
        const unselectedTopic = 'category-select unselected-category';
        const selectedTopic = 'category-select selected-category';
        const Uclass = btn.getAttribute('class');
        if (Uclass === unselectedTopic) {
          btn.setAttribute('class', selectedTopic);
          btn.style.color = '#fff';
          btn.style.background = '#1e4208';

          const topicID = btn.getAttribute('id');
          const splitID = topicID.split(' ');
          const dataID = parseInt(splitID[1]);

          const findMyNewTopic = updateMyTopics.find((elt) => elt === dataID);
          if (!findMyNewTopic) {
            updateMyTopics.push(dataID);
            console.log(updateMyTopics);
            if (updateMyTopics.length > 2) {
              submitButton.removeAttribute('disabled');
            }
          }

        } else if (Uclass === selectedTopic) {
          btn.setAttribute('class', unselectedTopic);
          btn.style.color = '#6b7979';
          btn.style.background = '#f1ebeb';

          const topicID = btn.getAttribute('id');
          const splitID = topicID.split(' ');
          const dataID = parseInt(splitID[1]);

          const findMyNewTopic = updateMyTopics.find((elt) => elt === dataID);
          if (findMyNewTopic) {
            updateMyTopics = updateMyTopics.filter((elt) => elt !== dataID);
            if (updateMyTopics.length < 3) {
              submitButton.setAttribute('disabled', 'true');
            }
            console.log(updateMyTopics);
          }
        }
        btn.blur();
      });
    });
  }

  submitButton.addEventListener('click', () => {
    updateUser();
  });
};
