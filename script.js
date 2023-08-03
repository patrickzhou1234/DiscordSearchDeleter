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
                        .find((m) => m?.exports?.default?.getToken !== void 0)
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
    }, 1500);
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
            }
            setTimeout(() => {
                document
                    .querySelectorAll(".searchResult-O9NDji")
                    .forEach((el) => {
                        id.push(
                            el.childNodes[0].childNodes[0].id.split("-")[2],
                        );
                    });
                if (
                    document.querySelectorAll(".endButton-pLBGXH")[1].disabled
                ) {
                    deleteMsgs();
                }
            }, 1500);
        }, 3000);
    }
} else {
    deleteMsgs();
}
