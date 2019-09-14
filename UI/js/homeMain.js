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
            
            displayTopUserMenu(userTopMenu, localUser);
            
        }

    }

    const displayAllArticles = document.querySelector('.app-content');
    if (displayAllArticles) {
        allArticles(displayAllArticles);
    }

    const menuLinks = document.querySelectorAll('.menu-link');
    if (menuLinks){
        menuLinks.forEach(link => {

            link.addEventListener('click', () => {



                const address = link.innerHTML.trim();

                console.log(link.classList)

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

                    case (link.classList.contains('openMyAopenArticleByCatctivity')):

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
    
});
