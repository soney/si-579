const onEventAdd = () => {
    const eventList = document.getElementById('date-list');
    const eventName = document.getElementById('input-name')?.value;
    const eventTime = document.getElementById('input-time')?.value;

    const targetTime = moment();

    const newEvent = document.createElement('li');
    const newEventName = document.createElement('span');
    newEventName.setAttribute('class', 'event-name');
    newEventName.innerText = eventName;

    const newEventTime = document.createElement('span');
    newEventTime.setAttribute('class', 'event-time');
    newEventTime.innerText = moment(eventTime).format('MMM Do YYYY');

    const pastTime = document.createElement('span');
    const timeDiff = targetTime.diff(moment(eventTime), 'days');
    pastTime.setAttribute('class', timeDiff > 0 ? 'past-time time-diff':'future-time time-diff');
    pastTime.innerText = Math.abs(timeDiff);

    newEvent.append(newEventName);
    newEvent.append(pastTime);
    newEvent.append(newEventTime);
    eventList.append(newEvent);
}

const addButton = document.getElementById('add-button');
addButton.addEventListener('click', onEventAdd);
