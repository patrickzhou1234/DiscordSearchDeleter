// ==UserScript==
// @name         Discord Search Deleter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://discord.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=discord.com
// @require      https://cdn.jsdelivr.net/npm/sweetalert2@11.6.16/dist/sweetalert2.all.min.js
// @grant        GM_addStyle
// ==/UserScript==

/* global Swal */

var mainCss = `
/**** SearchDeleter Button ****/
#searchdeleter-btn { position: relative; width: auto; height: 24px; margin: 0 8px; cursor: pointer; color: var(--interactive-normal); flex: 0 0 auto; }
#searchdeleter-btn progress { position: absolute; top: 23px; left: -4px; width: 32px; height: 12px; display: none; }
#searchdeleter-btn.running { color: var(--button-danger-background) !important; }
#searchdeleter-btn.running progress { display: block; }`;

let addButton = () => {
    document.head.appendChild(document.createElement("style")).textContent = mainCss;
    const SearchDeleterBtn = document.createElement("div");
    SearchDeleterBtn.id = "searchdeleter-btn";
    SearchDeleterBtn.setAttribute("tabindex", "0");
    SearchDeleterBtn.setAttribute("role", "button");
    SearchDeleterBtn.setAttribute("aria-label", "Delete Messages");
    SearchDeleterBtn.setAttribute("title", "Delete Messages with SearchDeleter");
    SearchDeleterBtn.innerHTML = `
    <svg aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
        <path fill="red" d="M15 3.999V2H9V3.999H3V5.999H21V3.999H15Z"></path>
        <path fill="red" d="M5 6.99902V18.999C5 20.101 5.897 20.999 7 20.999H17C18.103 20.999 19 20.101 19 18.999V6.99902H5ZM11 17H9V11H11V17ZM15 17H13V11H15V17Z"></path>
    </svg>
    <progress></progress>
`;
    document.querySelector(".toolbar-3_r2xA").appendChild(SearchDeleterBtn);
};

function buttonAction() {
    if (document.querySelectorAll(".searchResult-O9NDji").length == 0) {
        Swal.fire({
            title: "No Messages Found!",
            text: "Please search for messages first",
            icon: "error",
            background: "black",
            color: "white",
        });
        return;
    }
    const url = window.location.href.split("/");
    var id = [];
    document.querySelectorAll(".searchResult-O9NDji").forEach((el) => {
        id.push(el.childNodes[0].childNodes[0].id.split("-")[2]);
    });
    if (document.querySelectorAll(".endButton-pLBGXH").length > 0) {
        if (!document.querySelectorAll(".endButton-pLBGXH")[1].disabled) {
            var fInt = setInterval(() => {
                if (document.querySelectorAll(".endButton-pLBGXH")[1].disabled) {
                    clearInterval(fInt);
                } else {
                    document.querySelectorAll(".endButton-pLBGXH")[1].click();
                    setTimeout(() => {
                        document.querySelectorAll(".searchResult-O9NDji").forEach((el) => {
                            id.push(el.childNodes[0].childNodes[0].id.split("-")[2]);
                        });
                        if (document.querySelectorAll(".endButton-pLBGXH")[1].disabled) {
                            showAlert();
                            deleteMsgs(url, id);
                        }
                    }, 2000);
                }
            }, 4000);
        }
    } else {
        showAlert();
        deleteMsgs(url, id);
    }
}

var prevUrl = window.location.href;
setInterval(() => {
    if (prevUrl != window.location.href && document.querySelectorAll(".toolbar-3_r2xA").length > 0) {
        prevUrl = window.location.href;
        addButton();
        document.getElementById("searchdeleter-btn").onclick = buttonAction;
    }
}, 60);

function showAlert() {
    Swal.fire({
        title: "Deleting Messages!",
        text: "Collected all message ids successfully",
        icon: "success",
        background: "black",
        color: "white",
    });
}
function deleteMsgs(url, id) {
    var i = 0;
    var idInt = setInterval(() => {
        fetch("https://discord.com/api/v9/channels/" + url[5] + "/messages/" + id[i], {
            headers: {
                accept: "*/*",
                "accept-language": "en-US,en;q=0.9",
                authorization: (webpackChunkdiscord_app.push([
                    [""],
                    {},
                    (e) => {
                        m = [];
                        for (let c in e.c) m.push(e.c[c]);
                    },
                ]),
                m)
                    .find((m) => m?.exports?.default?.getToken !== void 0)
                    .exports.default.getToken(),
            },
            referrerPolicy: "strict-origin-when-cross-origin",
            body: null,
            method: "DELETE",
            mode: "cors",
            credentials: "include",
        });
        i++;
        if (i == id.length) clearInterval(idInt);
    }, 1700);
}

window.onload = () => {
    setTimeout(() => {
        addButton();
        Swal.fire({
            title: "Discord Search Deleter",
            text: "To delete all messages searched for, search for the messages you want to delete then press the key combination Ctrl+Shift+Y or click the trashbin on the top right of the screen.",
            icon: "success",
            background: "black",
            color: "white",
        });
        document.getElementById("searchdeleter-btn").onclick = buttonAction;
    }, 5000);
};
