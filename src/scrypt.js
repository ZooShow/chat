let getFromLocalStorage = function() {
    let items = localStorage.getItem(document.querySelector('.selected').textContent);
    if (items == null) {
        return
    }
    let messages = items.split(',');
    let parent = document.querySelector('.messages');
    for (let i = 0; i < messages.length; ++i) {
        let message = document.createElement('div');
        message.classList.add("message");
        message.innerHTML = "<span>" + messages[i] + "</span>";
        parent.insertAdjacentElement('beforeend', message);
    }
}

getFromLocalStorage();

let parent = document.querySelector('.messages');
parent.scrollTop = 9999999;
let button = document.querySelector('.send');
let text = document.querySelector(".text");




let sendMessage = button.onclick = function() {
    if (text.value !== "") {
        let parent = document.querySelector('.messages');
        let message = document.createElement('div');
        message.classList.add("message");
        message.innerHTML = "<span>" + text.value + "</span>";
        parent.insertAdjacentElement('beforeend', message);
        parent.scrollTop = "9999";
        text.value = "";
    } else {
        return
    }
    saveToLocalStorage();
}

document.addEventListener('keydown', function() {
    if (event.code == "Enter") {
        sendMessage();
        event.preventDefault();
    }
})

let contacts = document.querySelectorAll('.dialoge');

for (let contact of contacts) {
    contact.onclick = function() {
        let old = document.querySelector('.selected');
        if (old === contact) {
            return;
        }
        if (old !== null) {
            old.classList.remove('selected');
        }
        contact.classList.add('selected');
        del();
        getFromLocalStorage();
    };
};

let del = function() {
    let messages = document.querySelectorAll('.message');
    for (let message of messages) {
        message.remove();
    }
}

let saveToLocalStorage = function() {
    let text = [];
    let messages = document.querySelectorAll('.message');
    for (message of messages) {
        text.push(message.textContent);
    }
    localStorage.setItem(document.querySelector('.selected').textContent, text);
}