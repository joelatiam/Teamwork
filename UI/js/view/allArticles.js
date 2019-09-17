
const displayAllArt = (parent, articles) => {

    parent.innerHTML = '';

    const allArticleFragment = document.createDocumentFragment();
    // const articleFragment = document.createDocumentFragment();

    

    articles.forEach(element => {


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

        const shortArticle = document.createElement('div');
        shortArticle.setAttribute('class', 'short-article');

        const detailsInstruction = document.createElement('div');
        detailsInstruction.setAttribute('class', 'details-instruction');
        detailsInstruction.innerHTML = `Click to read the story and comments`;


        userPost.setAttribute('id',`post ${element.id}`);
        name.innerHTML = element.fullName;
        innerTime.innerHTML = `${element.time[0]}:${element.time[1]}`;
        innerDate.innerHTML = `${element.date[0]} ${element.date[1]}, ${element.date[2]}`;
        articleTitle.innerHTML = element.title;
        articleCategory.innerHTML = element.topic;
        shortArticle.innerHTML = `<p>${element.article}</p>`;

        innerAvatar.appendChild(fontawesome);
        postAvatar.appendChild(innerAvatar);
        articleDate.appendChild(innerTime);
        articleDate.appendChild(innerDate);

        header.appendChild(name);
        header.appendChild(postAvatar);
        header.appendChild(articleDate);

        userPost.appendChild(header);


        articleTitleCat.appendChild(articleTitle);
        articleTitleCat.appendChild(articleCategory);
        
        userPost.appendChild(articleTitleCat);

        userPost.appendChild(shortArticle);

        userPost.appendChild(detailsInstruction);

        allArticleFragment.appendChild(userPost);

//         console.log(element);
    });

    parent.appendChild(allArticleFragment)
}