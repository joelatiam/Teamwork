const readDepartment = (parent) => {
  const myDaprtment = localUser.department;
  const ourEmails = [];

  const myColleague = users.filter((user) => user.department === myDaprtment);

  myColleague.forEach((colleague) => {
    ourEmails.push(colleague.email);
  });


  let myArticles = articles.filter((article) => ourEmails.includes(article.author));

  myArticles = myArticles.reverse();

  const myShortArticles = [];

  myArticles.forEach((post) => {
    let {
      date, title, article, topic,
    } = post;
    const author = post;
    const id = post;

    const options = {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
    };

    const time = date.toLocaleTimeString('fr-FR').split(':');

    date = date.toLocaleDateString('US', options).split(',');
    const trimedDate = [];
    date.forEach((e) => trimedDate.push(e.trim()));
    date = trimedDate;

    const newtitle = () => {
      if (title.length > 55) {
        title = title.slice(0, 52);
        title += '...';
      }
      return title;
    };

    article = article.trim();

    const shortArticle = () => {
      if (article.length > 100) {
        article = article.slice(0, 97);
        article += '...';
      }
      return article;
    };

    article = shortArticle();
    title = newtitle();

    topic = topics[post.topic];

    const authorsName = () => {
      const user = users.find((u) => u.email === author);
      return `${user.firstName} ${user.lastName}`;
    };

    const fullName = authorsName().trim();

    myShortArticles.push({
      id, fullName, time, date, title, topic, article,
    });
  });


  displayAllArt(parent, myShortArticles);
};
