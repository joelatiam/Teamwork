const displayCategoryList = (parent) => {
    // const myAccount = users.find(user => user.email === localUser.email);
    let myTopics = [];
    
        if(localUser.topics.length>0){
            localUser.topics.forEach(topic=>{
                myTopics.push([topic,topics[topic]]);
            })
        }
    displayMyCategory(parent, myTopics);

}

const articleByTopic =  (id)=>{
    
    const parent = document.querySelector('.app-content');
    // console.log(parent)
    let myArticles = articles.filter((article) => {
       
        return article.topic == id;

    });
    // console.log(myArticles)
    myArticles = myArticles.reverse();

    let myShortArticles = [];

    myArticles.forEach((post) => {

        let { id, date, title, article, author, topic } = post;

        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

        time = date.toLocaleTimeString('fr-FR').split(':');

        date = date.toLocaleDateString('US', options).split(',');
        const trimedDate = [];
        date.forEach((e) => trimedDate.push(e.trim()))
        date = trimedDate;

        const newtitle = () => {
            if (title.length > 55) {
                title = title.slice(0, 52);
                title += '...';
            }
            return title;
        }

        article = article.trim();

        const shortArticle = () => {
            if (article.length > 100) {
                article = article.slice(0, 97);
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

        myShortArticles.push({ id, fullName, time, date, title, topic, article })

    })


    displayAllArt(parent, myShortArticles)
}