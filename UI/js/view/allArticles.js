
const displayAllArt = (parent, articles) => {

    const userPost = document.createElement('div');
    userPost.setAttribute('class', 'user-post');

    const header = document.createElement('div');
    header.setAttribute('class', 'header');

    const name = document.createElement('div');
    name.setAttribute('class', 'name');

    const postAvatar = document.createElement('div');
    postAvatar.setAttribute('class', 'post-avatar');

    const innerAvatar = document.createElement('div');

    const fontawesome = document.createElement('i');
    fontawesome.setAttribute('class', 'fas fa-envelope');

    innerAvatar.appendChild(fontawesome);
    postAvatar.appendChild(innerAvatar);

    const articleDate = document.createElement('div');
    articleDate.setAttribute('class', 'date');

    const innerTime = document.createElement('span');
    innerTime.setAttribute('class', 'time');

    const innerDate = document.createElement('span');
    innerDate.setAttribute('class', 'date');

    const articleTitleCat = document.createElement('div');
    articleTitleCat.setAttribute('class', 'article-title-category');

    const articleTitle = document.createElement('div');
    articleTitle.setAttribute('class', 'article-title');

    const articleCategory = document.createElement('div');

    articleTitleCat.appendChild(articleCategory);

    const shortArticle = document.createElement('div');
    shortArticle.setAttribute('class', 'short-article');

    const detailsInstruction = document.createElement('div');
    detailsInstruction.setAttribute('class', 'details-instruction');
}