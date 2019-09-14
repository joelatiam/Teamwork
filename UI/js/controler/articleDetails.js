// redirect to the index page
if (!localStorage.getItem('user')) {
    window.location.assign("index.html");
}

const articleDetails = (id)=>{

    let post = articles.find(post => post.id === id);
    if(post){

        let { id, date, title, article, author, topic } = post;

        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

        time = date.toLocaleTimeString('fr-FR').split(':');

        date = date.toLocaleDateString('US', options).split(',');
        const trimedDate = [];
        date.forEach((e) => trimedDate.push(e.trim()))
        date = trimedDate;

        topic = topics[post.topic];

        let authorInfo = () => {
            const user = users.find((user) => user.email === author);
            return [`${user.firstName} ${user.lastName}`, user.jobRole, user.department];
        }
        authorInfo = authorInfo();

        const fullName = authorInfo[0].trim();

        const jobRole = authorInfo[1];
        const department = authorInfo[2];

        let fullArticle = {};

        
        fullArticle = { id, author, fullName, jobRole, department, time, date, title, topic, article };



        displayDetails(fullArticle);

    }else{
        window.location.assign("home.html");
    }

};