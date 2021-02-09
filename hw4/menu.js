const hideSpicyItem = () => {
    const spicyItems = document.getElementsByClassName('spicy');
    for(item of spicyItems) {
        item.style.display = "none";
    }
}

const displayAll = () => {
    const spicyItems = document.getElementsByClassName('spicy');
    for(item of spicyItems) {
        item.style.display = "block";
    }
}

const addItem = () => {
    const itemName = document.getElementById('item-name').value;
    const isSpicy = document.getElementById('is-spicy').checked;
    const lunchList = document.getElementById('lunch-list');
    const newItem = document.createElement('li');
    newItem.className = isSpicy? "spicy":"";
    newItem.textContent = itemName;
    lunchList.appendChild(newItem);
}



const hide_spicy_button = document.getElementById('hide-spicy-button');
hide_spicy_button.addEventListener('click', hideSpicyItem);

const all_button = document.getElementById('all-button');
all_button.addEventListener('click', displayAll);

const add_button = document.getElementById('add-button');
add_button.addEventListener('click', addItem);
