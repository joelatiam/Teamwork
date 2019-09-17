const topicToShareDOM = (parent, list)=>{
    parent.innerHTML = '';
    const topicsFragment = document.createDocumentFragment();

    list.forEach(topic=>{
        if(list.indexOf(topic)>0){
            const elt = document.createElement('div');

            elt.setAttribute('id', `topic ${list.indexOf(topic)}`);
            elt.setAttribute('class','category-to-share');
            elt.innerHTML = topic;

            elt.addEventListener('mousemove', () => {
                elt.style.cssText = 'cursor: pointer; /*background-color: #4c9e1f;*/';
            });
            // elt.addEventListener('mouseout', () => {
            //     elt.style.cssText = 'background-color: #2a8994;';
            // });
            elt.addEventListener('click', () => {
                elt.style.cssText = 'cursor: wait;';
            });

            topicsFragment.appendChild(elt);
        }
    })
    parent.appendChild(topicsFragment);
}