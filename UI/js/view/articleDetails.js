

const displayDetails = ({ id,author, fullName, jobRole, department, time, date, title, topic, article }) => {

    const name = document.querySelector('.user-info .name');
    name.innerHTML = fullName;

    const userRole = document.querySelector('.role .job-role');
    userRole.innerHTML = jobRole;

    const uDepartment = document.querySelector('.role .department');
    uDepartment.innerHTML = `${department} Department`;

    const articleTitle = document.querySelector('.article-title-category .article-title');
    articleTitle.innerHTML = title;

    const articleCategory = document.querySelector('.article-title-category .article-category');
    articleCategory.innerHTML = topic;

    const articleTime = document.querySelector('.date .time');
    articleTime.innerHTML = `${time[0]}:${time[1]}`;

    const articleDate = document.querySelector('.date .date');
    articleDate.innerHTML = date;

    const articleText = document.querySelector('.article-full p');
    articleText.innerHTML = article;

    if(author !== localUser.email){
        const editArticle = document.querySelector('.article-options>.display-option .edit-article');
        editArticle.remove();

        const deleteArticle = document.querySelector('.article-options>.display-option .delete-article');
        deleteArticle.remove();

        const articleOptions = document.querySelector('.article-options .display-option');
        articleOptions.setAttribute('class','display-option guest');

        const flagArticle = document.querySelector('.flag-article');
        flagArticle.setAttribute('class','flag flag-article guest-flag');



    }




}