/* eslint-disable no-case-declarations */
// redirect to the index page
if (!localStorage.getItem('user')) {
  window.location.assign('index.html');
}

const articleDetails = (artId) => {
  const post = articles.find((post) => post.id === artId);
  if (post) {
    let { date, topic } = post;
    const { id } = post;
    const { title, article, author } = post;

    const options = {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
    };

    const time = date.toLocaleTimeString('fr-FR').split(':');

    date = date.toLocaleDateString('US', options).split(',');
    const trimedDate = [];
    date.forEach((e) => trimedDate.push(e.trim()));
    date = trimedDate;

    topic = topics[post.topic];

    let authorInfo = () => {
      const user = users.find((user) => user.email === author);
      return [`${user.firstName} ${user.lastName}`, user.jobRole, user.department];
    };
    authorInfo = authorInfo();

    const fullName = authorInfo[0].trim();

    const jobRole = authorInfo[1];
    const department = authorInfo[2];

    let fullArticle = {};


    fullArticle = {
      id, author, fullName, jobRole, department, time, date, title, topic, article,
    };


    displayDetails(fullArticle);
  } else {
    window.location.assign('home.html');
  }
};

const displayComment = (parent, artId) => {
  let myComments = comments.filter((comment) => comment.article === artId);

  myComments = myComments.reverse();


  const commentTodisplay = [];

  myComments.forEach((com) => {
    let { date } = com;
    const { id, comment, author } = com;
    const user = users.find((u) => u.email === author);
    let fullName = `${user.firstName} ${user.lastName}`;
    fullName = fullName.trim();


    const options = {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
    };

    const time = date.toLocaleTimeString('fr-FR').split(':');

    date = date.toLocaleDateString('US', options).split(',');
    const trimedDate = [];
    date.forEach((e) => trimedDate.push(e.trim()));
    date = trimedDate;

    commentTodisplay.push({
      id, fullName, date, time, comment, author,
    });
  });

  commentToHTML(parent, commentTodisplay);
};

const newComment = ((input, articleID) => {
  let commentText = input.value;
  commentText = commentText.trim();
  const hasWord = /\w/g;

  input.value = '';

  switch (true) {
    case (commentText.length < 1):
      input.placeholder = 'Please write something ';
      input.classList.add('errorinPlaceHolder');

      break;

    case (!hasWord.test(commentText)):
      input.placeholder = 'Please add some words ';
      input.classList.add('errorinPlaceHolder');

      break;

    default:
      input.placeholder = 'Feel free to comment again';
      input.classList.remove('errorinPlaceHolder');

      const comment = commentText.slice(0, 280);
      const author = localUser.email;
      const article = articleID;

      const newData = comments.push({
        id: comments.length + 1, date: new Date(), comment, author, article,
      });

      if (comments[newData - 1].author === author && comments[newData - 1].comment === comment) {
        localStorage.setItem('comment', JSON.stringify(comments[newData - 1]));

        const commentList = document.querySelector('.comments-area');

        displayComment(commentList, article);
      }
  }
});
