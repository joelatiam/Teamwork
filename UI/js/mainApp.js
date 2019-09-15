// redirect to the index page
if (!localStorage.getItem('user')) {
    window.location.assign("index.html");
}


let localUser = {};
localUser = localStorage.getItem('user');



document.addEventListener('DOMContentLoaded', (event) => {

    // first Category page
    //display topics for new 
    
    

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

    const displayAllArticles = document.querySelector('.all-articles');
    if (displayAllArticles) {
        allArticles(displayAllArticles);
    }

    const menuLinks = document.querySelectorAll('.menu-link');
    if (menuLinks){
        menuLinks.forEach(link => {

            link.addEventListener('click', () => {



                const parentNode = document.querySelector('.left-menu.no-small');
                if(parentNode.contains(link)){
                    link.style.cssText = 'background-color: #022def63;     color: #302ccc;';

                }

                

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



        });
    }

    const goToDetails = document.querySelectorAll('.user-post');
    if (goToDetails){
        goToDetails.forEach(post => {

            post.addEventListener('click',()=>{
                let postID = post.getAttribute('id');
                if(postID){
                    postID = postID.split(' ');
                    postID = postID[1];
                    
                    window.location.assign(`articleDetails.html?id=${postID}`);
                }
            });
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
    }
    
});
