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

const displayComment =(parent, id)=>{

    let myComments = comments.filter(comment => comment.article === id);
    
    myComments = myComments.reverse();

    

    let commentTodisplay = [];

    myComments.forEach((com)=>{

        let {id, date, comment, author, article} = com;

        let user = users. find((u)=>u.email === author);
        let fullName = `${user.firstName} ${user.lastName}`;
        fullName = fullName.trim();

        
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

        time = date.toLocaleTimeString('fr-FR').split(':');

        date = date.toLocaleDateString('US', options).split(',');
        const trimedDate = [];
        date.forEach((e) => trimedDate.push(e.trim()))
        date = trimedDate;

        commentTodisplay.push({id, fullName, date, time, comment, author });

    });

    commentToHTML(parent, commentTodisplay);

};