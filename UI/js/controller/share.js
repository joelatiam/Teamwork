
const topicToshareList = (parent) => {
  topicToShareDOM(parent, topics);
};

const topicsReady = (parent) => {
  const allTopics = topics;
  const myTopics = localUser.topics;
  const userEmail = localUser.email;
  console.log(localUser);

  let updateMyTopics = myTopics;

  const submitButton = document.querySelector('.categories-submit button.submit-button');
  if (myTopics.length < 3) {
    submitButton.setAttribute('disabled', 'true');
  }


  const updateUser = () => {
    const user = users.findIndex((u) => u.email === localUser.email);

    if (user >= 0) {
      users[user].topics = updateMyTopics;
      localStorage.setItem('user', JSON.stringify(users[user]));

      if (users[user].topics.length > 2) {
        window.location.assign('home.html');
      }
    }
  };


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
          const dataID = parseInt(splitID[1], 10);

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
};

const shareArticle = ((author, title, article, topic) => {
  let titleText = title.value;
  titleText = titleText.trim();

  let articleText = article.value;
  articleText = articleText.trim();

  const hasWord = /\w/g;


  switch (true) {
    case (titleText.length < 1):
      title.placeholder = 'Please add a title';
      title.classList.add('errorinArticle');
      title.style.color = 'red;';
      title.value = '';

      break;

    case (articleText.length < 1):
      article.placeholder = "Your article can't be empty";
      article.classList.add('errorinArticle');
      article.value = '';

      break;

    case (!hasWord.test(titleText)):
      title.placeholder = 'Your title needs some words ';
      title.classList.add('errorinArticle');
      title.value = '';

      break;

    case (!hasWord.test(articleText)):
      article.placeholder = 'Please type some words ';
      article.classList.add('errorinArticle');
      article.value = '';

      break;

    default:

      article.classList.remove('errorinArticle');
      title.classList.remove('errorinArticle');

      const newTitle = titleText.slice(0, 60);
      const newArticle = articleText.slice(0, 2000);

      // eslint-disable-next-line no-case-declarations
      const newData = articles.push({
        id: articles.length + 1,
        date: new Date(),
        title: newTitle,
        article: newArticle,
        author,
        topic,
      });

      if (articles[newData - 1].author === author && articles[newData - 1].title === newTitle) {
        localStorage.setItem('article', JSON.stringify(articles[newData - 1]));

        window.location.assign('myActivities.html');
      }

      break;
  }
});
