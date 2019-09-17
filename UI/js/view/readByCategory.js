const displayMyCategory = (parent, list) => {

    parent.innerHTML = '';
    const topicFragment = document.createDocumentFragment();

    list.forEach(element => {
        const topic = document.createElement('div');
        topic.setAttribute('class','category-to-read');
        topic.setAttribute('id',`topic ${element[0]}`);
        topic.innerHTML =  element[1]; 
        
        topicFragment.appendChild(topic);
    });
    parent.appendChild(topicFragment);
}