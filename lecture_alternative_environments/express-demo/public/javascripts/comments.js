const inputBox = document.getElementById('comment-input');
const commentsList = document.getElementById('comments-list');

inputBox.addEventListener("keydown", (e)=>{
    if(e.key === "Enter") {
        submitComment(inputBox.value);
        addComment(inputBox.value);
        e.stopPropagation();
        inputBox.value = "";
    }
})

const submitComment = (content) => {
    const url = "http://localhost:3000/submit";
    const comment = { content };
    const options = {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(url, options)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
}

const addComment = (content) => {
    const commentElement = document.createElement('li');
    commentElement.textContent = content;
    commentsList.appendChild(commentElement); 
}

const loadComments = () => {
    const url = "http://localhost:3000/load";
    fetch(url)
        .then(res => res.json())
        .then(data => {
            data.forEach(ele => {
                addComment(ele.content)
            })
        })
}

loadComments();
