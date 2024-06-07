
function onSubmit() {
    let val = document.getElementById("url").value;
    let newVal = "";
    for (i in val) {
        if (val[i] === "/") {
            newVal += "!";
        }
        else {
            newVal += val[i];
        }
    }
    fetch(`https://user5e8e13639aafd2a.app.vtxhub.com/gws/${btoa(newVal)}/`).then((Response) => {
                    return Response.json()
                }).then((data) => {
                    document.open();
                    document.write(data["main"]);
                    document.close();
                });
}
