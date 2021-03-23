eventsElements = document.querySelectorAll(".item-teaser")

eventsElements.forEach(element => {
    const button = document.createElement('button');
    button.textContent = "Save";
    element.appendChild(button);
});