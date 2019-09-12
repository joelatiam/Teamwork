// welcome message to new user
const messageToNewUser = (hmlTag, userName) =>{
    hmlTag.forEach((element) => {
        element.innerHTML = userName;
    });
};

// topic list
const topicList = (categoryDiv, allTopics) => {
    categoryDiv.innerHTML = '';
    let topicFragment = document.createDocumentFragment();

    allTopics.forEach((topic)=>{
        if (allTopics.indexOf(topic)>0) {
            let myButton = document.createElement('button');

            myButton.innerHTML = topic;
            myButton.setAttribute("class", "category-select unselected-category");
            myButton.setAttribute("id", `topic ${allTopics.indexOf(topic)}`);

            topicFragment.appendChild(myButton);
        }
        
    });
    categoryDiv.appendChild(topicFragment);
  
}
