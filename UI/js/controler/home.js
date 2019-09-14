// redirect to the index page
if (!localStorage.getItem('user')) {
    window.location.assign("index.html");
}

// display user's name at the navbar
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

const allArticles = (parent)=> {
    const myTopics = localUser.topics;

    let myArticles = articles.filter((article)=>{

       return  myTopics.includes(article.topic);
        
    });

    myArticles = myArticles.reverse();

    let myShortArticles = [];

    myArticles.forEach((post)=>{

        let {id, date, title, article, author, topic} = post;

        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        
        time = date.toLocaleTimeString('fr-FR').split(':');

        date = date.toLocaleDateString('US', options).split(',');
        const trimedDate = [];
        date.forEach((e) => trimedDate.push(e.trim()))
        date = trimedDate;

        const newtitle = () =>{
            if (title.length>55){
                title = title.slice(0,52);
                title += '...';
            }
            return title;
        }

        article = article.trim();
        
        const shortArticle = () =>{
            if (article.length>100){
                article = article.slice(0,97);
                article += '...';
            }
            return article;
        }

        article = shortArticle();
        title = newtitle();

        topic = topics[post.topic];

        const authorsName = () => {
            const user = users.find((user) => user.email === author);
            return `${user.firstName} ${user.lastName}`;
        }

        const fullName = authorsName().trim();

        myShortArticles.push({id, fullName, time, date, title, topic, article})

        // console.log(fullName);
    })

    // console.log(myShortArticles);

    displayAllArt(parent, myShortArticles)


}

