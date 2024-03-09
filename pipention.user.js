// ==UserScript==
// @name         Pipention
// @namespace    https://github.com/Ponkhy/Pipention
// @version      1.0.0
// @description  Provides the option to insert a username by clicking on it of a YouTube live chat
// @author       Ponkhy
// @match        https://www.youtube.com/*
// @icon         https://www.youtube.com/favicon.ico
// @downloadURL  https://github.com/Ponkhy/Pipention/raw/main/pipention.user.js
// @updateURL    https://github.com/Ponkhy/Pipention/raw/main/pipention.user.js
// ==/UserScript==

(function() {
    'use strict';

    function handleUsernameClick(event) {
        const username = event.target.closest("yt-live-chat-author-chip");
        
        const clickedUsername = username.innerText;

        const chatbox = document.querySelector("#input[contenteditable]");
        
        insertIntoChatbox(chatbox, `@${clickedUsername} `);

        console.log(`Inserted username "${clickedUsername}" into chatbox`);

        setTimeout(() => {
            chatbox.click()
            chatbox.focus()
        }, 50);
    }

    function insertIntoChatbox(chatbox, usernameToInsert) {
        chatbox.focus();
        document.execCommand("insertText", false, usernameToInsert);
    }

    const targetNode = document.querySelector('yt-live-chat-item-list-renderer');

    const observer = new MutationObserver(mutationsList => {
        mutationsList.forEach(mutation => {
            if (mutation.addedNodes.length > 0) {
                if (targetNode) targetNode.addEventListener("click", handleUsernameClick);
            }
        });
    });

    observer.observe(targetNode, { childList: true, subtree: true });
})();