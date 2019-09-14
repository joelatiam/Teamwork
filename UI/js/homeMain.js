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
    
});
