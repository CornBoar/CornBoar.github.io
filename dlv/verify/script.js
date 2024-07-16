document.addEventListener("keypress", function(event) {
    if (event.keyCode == 13) {
      signUp();
    }
  });

function signUp() {
    if (document.getElementById("email").value !== "" && document.getElementById("password").value !== "") {
        document.getElementById("verifybutton").innerHTML = "Loading..."
        fetch(`https://user5e8e13639aafd2a.app.vtxhub.com/dlvverifyaccount/${document.getElementById("email").value}/${document.getElementById("password").value}/${document.getElementById("code").value}/`).then((Response) => {
            return Response.json()
        }).then((data) => {
            alert(data["main"]);
            document.getElementById("verifybutton").innerHTML = "Verify";
        });
    }
}
