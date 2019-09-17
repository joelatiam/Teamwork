// redirect to the index page
if (!localStorage.getItem('user')) {
    window.location.assign("index.html");
}





document.addEventListener('DOMContentLoaded', (event) => {

    // first Category page
    //display topics for new 
    
    const button = document.querySelectorAll('button');
    if (button) {
        button.forEach(btn => {
            btn.addEventListener('click', () => {

                btn.style.cssText = 'cursor: wait;';

            })
            btn.addEventListener('mousemove', () => {

                btn.style.cssText = 'cursor: pointer;';

            });
        })

    }
    
    const categoryToDisplay = document.querySelector('.categories-list-selection');
    if(categoryToDisplay){
        topicsReady(categoryToDisplay);
    }

    // home page

    const userTopMenu = document.querySelector('.app-menu>.user-info .user-name');
    if (userTopMenu) {
        if (localStorage.getItem('user')) {
            localUser = JSON.parse(localStorage.getItem('user'));
         
            const displayTopUserMenu = (parent, { firstName, lastName, jobRole }) => {
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


            displayTopUserMenu(userTopMenu, localUser);
            
        }

    }

// articles details

    const displayAllArticles = document.querySelector('.all-articles');
    if (displayAllArticles) {
        allArticles(displayAllArticles);
    }

    const menuLinks = document.querySelectorAll('.menu-link');
    if (menuLinks){
        menuLinks.forEach(link => {

            link.addEventListener('click', () => {

                link.classList.add('active-link');
                link.style.cssText = 'cursor: wait;';
                

                switch (true) {

                    case (link.classList.contains('openShare')):

                        window.location.assign("share.html");
                        break;

                    case (link.classList.contains('openMyProfile')):

                        window.location.assign("myProfile.html");
                        break;

                    case (link.classList.contains('openHome')):

                        window.location.assign("home.html");
                        break;

                    case (link.classList.contains('openMyActivity')):

                        window.location.assign("myActivities.html");
                        break;

                    case (link.classList.contains('openArticleByCat')):

                        window.location.assign("readByCategory.html");
                        break;

                    case (link.classList.contains('openMyDepartment')):

                        window.location.assign("myDepartment.html");
                        break;

                    case (link.classList.contains('openTopics')):

                        window.location.assign("topics.html");
                        break;


                    default:
                        break;
                }
            })

            link.addEventListener('mousemove',() =>{

                const parentNode = document.querySelector('.left-menu.no-small');
                if (parentNode.contains(link)) {
                    link.style.cssText = 'border-style: solid; border-width: thin; border-radius: 20px; cursor: pointer;';

                }
            })
            link.addEventListener('mouseout', () => {

                const parentNode = document.querySelector('.left-menu.no-small');
                if (parentNode.contains(link)) {
                    if (!link.classList.contains('active-link')){
                        link.style.cssText = 'border: initial;';
                    }
                    

                }
            })
            


        });
    }

    const postDetails = document.querySelector('.post-details');
    if (postDetails){
        let params = new URLSearchParams(document.location.search.substring(1));

        let postID = params.get('id');
        postID = parseInt(postID);

        articleDetails(postID);
    }

    const addComment = document.querySelector('.comment-message ');
    if(addComment){
        addComment.addEventListener('click',()=>{
            addComment.classList.add('hidden');

            const commentArea = document.querySelector('.comment-area');
            commentArea.classList.remove('hidden');
            commentArea.style.display = 'grid';
            
        })
        addComment.addEventListener('mousemove', () => {

            addComment.style.cssText = 'cursor: pointer;';

        });
    }

    const commentList = document.querySelector('.comments-area');
    if(commentList){
        let params = new URLSearchParams(document.location.search.substring(1));

        let postID = params.get('id');
        postID = parseInt(postID);

        displayComment(commentList, postID);
    }

    const submitComment = document.querySelector('.commentButton');
    if(submitComment){
        submitComment.addEventListener('click',()=>{
            const textArea = document.querySelector('.comment-area>div textarea');

            if (textArea){
                let params = new URLSearchParams(document.location.search.substring(1));

                let postID = params.get('id');
                postID = parseInt(postID);
                
                newComment(textArea, postID);
                
            }
        })
    }
    
    // share article
    let categoryToShare = null;

    const displayTopicToShare = document.querySelector('.share-article>.category .list')
    if (displayTopicToShare){
        topicToshareList(displayTopicToShare);
    }

    const selectedTopicToShare = document.querySelectorAll('.share-article>.category>.list div');
    if (selectedTopicToShare) {
        selectedTopicToShare.forEach(topic => {
            topic.addEventListener('click', () => {
                if (categoryToShare) {
                    const previous = document.getElementById(`topic ${categoryToShare}`);
                    if (previous) {
                        previous.classList.remove('selected');
                        previous.style.cssText = 'background-color: #2a8994;';
                        console.log(previous)
                    }
                }

                topic.classList.add('selected');
                topic.style.background = 'background-color: #4c9e1f;';

                let topicID = topic.getAttribute('id');
                topicID = topicID.split(' ');
                topicID = parseInt(topicID[1]);

                categoryToShare = topicID;
                // console.log(categoryToShare)

            })
        })
    }
    
    const submitArticle = document.querySelector('.share-article>.share-box>.submit-area .submit');
    if(submitArticle){

        submitArticle.addEventListener('click',()=>{
            submitArticle.cssText = 'background-color: #166f28; cursor: wait;';

            const author = localUser.email;
            const title = document.querySelector('.share-article>.article-title input')
            const article = document.querySelector('.share-article>.share-box>.input-area textarea');

            if (categoryToShare && author && title && article){
                shareArticle(author, title, article, categoryToShare);
            }
        });

    }

    // myActivies
    const displayMyArticles = document.querySelector('.my-articles');
    if (displayMyArticles) {
        myArticles(displayMyArticles);
    }
    
    
    //  read by category

    
    // display categoryMenu
    const categoryList = document.querySelector('.category-menu>.category .list');
    if(categoryList){
        displayCategoryList(categoryList);
    }

    let lastSelected = null

    const firstcategoryToRead = document.querySelector('.category-to-read');
    if (firstcategoryToRead) {

        let categoryID = firstcategoryToRead.getAttribute('id');
        if (categoryID) {
            categoryID = categoryID.split(' ');
            categoryID = categoryID[1];

            firstcategoryToRead.classList.add('selected-category');
            firstcategoryToRead.style.cssText = 'background-color: rgb(19, 196, 222);color: #2b56b9;';
            
            lastSelected = categoryID;

            articleByTopic(categoryID);
        }
    }


    const categoryToRead = document.querySelectorAll('.category-to-read');
    if(categoryToRead){
        categoryToRead.forEach(category=>{
            category.addEventListener('mousemove', () => {

                category.style.cssText = 'cursor: pointer;';

            });
            category.addEventListener('click', () => {


                if (lastSelected) {
                    
                    const previous = document.getElementById(`topic ${lastSelected}`);
                    
                    if (previous) {
                        previous.classList.remove('selected-category');
                        previous.style.cssText = 'background-color: #8ca2a2; color: #505477;';
    
                    }
                }
                

                category.classList.add('selected-category');
                category.style.cssText = 'background-color: rgb(19, 196, 222);color: #2b56b9;';


                let categoryID = category.getAttribute('id');
                if (categoryID) {
                    categoryID = categoryID.split(' ');
                    categoryID = categoryID[1];

                    lastSelected = categoryID;

                    articleByTopic(categoryID);
                }
            })
           
        })
        
    }

    

});
