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

window.onload = () => {
    setTimeout(() => {
        Swal.fire({
            title: "Discord Search Deleter",
            text: "To delete all messages searched for, search for the messages you want to delete then press the key combination Ctrl+Shift+Y",
            icon: "success",
            background: "black",
            color: "white",
        });
    }, 5000);
};

window.onkeydown = (event) => {
    if (
        event.ctrlKey &&
        event.shiftKey &&
        event.keyCode == "89" &&
        document.querySelectorAll(".searchResult-O9NDji").length > 0
    ) {
        function showAlert() {
            Swal.fire({
                title: "Deleting Messages!",
                text: "Collected all message ids successfully",
                icon: "success",
                background: "black",
                color: "white",
            });
        }
        function deleteMsgs() {
            var i = 0;
            var idInt = setInterval(() => {
                fetch(
                    "https://discord.com/api/v9/channels/" +
                        url[5] +
                        "/messages/" +
                        id[i],
                    {
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
                                .find(
                                    (m) =>
                                        m?.exports?.default?.getToken !==
                                        void 0,
                                )
                                .exports.default.getToken(),
                        },
                        referrerPolicy: "strict-origin-when-cross-origin",
                        body: null,
                        method: "DELETE",
                        mode: "cors",
                        credentials: "include",
                    },
                );
                i++;
                if (i == id.length) clearInterval(idInt);
            }, 1700);
        }
        const url = window.location.href.split("/");
        var id = [];
        document.querySelectorAll(".searchResult-O9NDji").forEach((el) => {
            id.push(el.childNodes[0].childNodes[0].id.split("-")[2]);
        });
        if (document.querySelectorAll(".endButton-pLBGXH").length > 0) {
            if (!document.querySelectorAll(".endButton-pLBGXH")[1].disabled) {
                var fInt = setInterval(() => {
                    if (
                        document.querySelectorAll(".endButton-pLBGXH")[1]
                            .disabled
                    ) {
                        clearInterval(fInt);
                    } else {
                        document
                            .querySelectorAll(".endButton-pLBGXH")[1]
                            .click();
                        setTimeout(() => {
                            document
                                .querySelectorAll(".searchResult-O9NDji")
                                .forEach((el) => {
                                    id.push(
                                        el.childNodes[0].childNodes[0].id.split(
                                            "-",
                                        )[2],
                                    );
                                });
                            if (
                                document.querySelectorAll(
                                    ".endButton-pLBGXH",
                                )[1].disabled
                            ) {
                                showAlert();
                                deleteMsgs();
                            }
                        }, 2000);
                    }
                }, 4000);
            }
        } else {
            showAlert();
            deleteMsgs();
        }
    }
};
