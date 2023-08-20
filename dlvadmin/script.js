var input = prompt("Enter Your Key:");

function addDemon() {
  fetch(`https://user5e8e13639aafd2a.app.vtxhub.com/dlvadddemon/${document.getElementById("key").innerHTML}/${document.getElementById("position").value}/${document.getElementById("name").value}/${document.getElementById("color").value.replace("#", "")}/`).then((Response) => {
    return Response.json()
  }).then((data) => {
    if (data["main"] === "success") {
      document.getElementById("statusmessage").style.color = "green";
      document.getElementById("statusmessage").innerHTML = "Success!";
    }
    else {
      document.getElementById("statusmessage").style.color = "red";
      document.getElementById("statusmessage").innerHTML = "Error";
    }
  });
}

function removeDemon() {
  fetch(`https://user5e8e13639aafd2a.app.vtxhub.com/dlvremovedemon/${document.getElementById("key").innerHTML}/${document.getElementById("removedemonchoice").value}/`).then((Response) => {
    return Response.json()
  }).then((data) => {
    if (data["main"] === "success") {
      document.getElementById("statusmessage2").style.color = "green";
      document.getElementById("statusmessage2").innerHTML = "Success!";
    }
    else {
      document.getElementById("statusmessage2").style.color = "red";
      document.getElementById("statusmessage2").innerHTML = "Error";
    }
  });
}

function addCompletion() {
  fetch(`https://user5e8e13639aafd2a.app.vtxhub.com/dlvaddcompletion/${document.getElementById("key").innerHTML}/${document.getElementById("selectuserchoice").value}/${document.getElementById("addcompletionchoice").value}/`).then((Response) => {
    return Response.json()
  }).then((data) => {
    if (data["main"] === "success") {
      document.getElementById("statusmessage3").style.color = "green";
      document.getElementById("statusmessage3").innerHTML = "Success!";
    }
    else {
      document.getElementById("statusmessage3").style.color = "red";
      document.getElementById("statusmessage3").innerHTML = "Error";
    }
  });
}

function removeCompletion() {
  fetch(`https://user5e8e13639aafd2a.app.vtxhub.com/dlvremovecompletion/${document.getElementById("key").innerHTML}/${document.getElementById("selectuserchoice").value}/${document.getElementById("addcompletionchoice").value}/`).then((Response) => {
    return Response.json()
  }).then((data) => {
    if (data["main"] === "success") {
      document.getElementById("statusmessage4").style.color = "green";
      document.getElementById("statusmessage4").innerHTML = "Success!";
    }
    else {
      document.getElementById("statusmessage4").style.color = "red";
      document.getElementById("statusmessage4").innerHTML = "Error";
    }
  });
}

function setXP() {
  fetch(`https://user5e8e13639aafd2a.app.vtxhub.com/dlvsetxp/${document.getElementById("key").innerHTML}/${document.getElementById("selectuserchoice").value}/${document.getElementById("editxpinput").value}/`).then((Response) => {
    return Response.json()
  }).then((data) => {
    if (data["main"] === "success") {
      document.getElementById("statusmessage5").style.color = "green";
      document.getElementById("statusmessage5").innerHTML = "Success!";
    }
    else {
      document.getElementById("statusmessage5").style.color = "red";
      document.getElementById("statusmessage5").innerHTML = "Error";
    }
  });
}

fetch(`https://user5e8e13639aafd2a.app.vtxhub.com/dlvvalidatekey/${input}/`).then((Response) => {
  return Response.json()
}).then((data) => {
  if (data["main"]) {
    document.getElementById("key").innerHTML = input;
    for (let i = 0; i != document.getElementsByClassName("onvalidate").length; i++) {
      document.getElementsByClassName("onvalidate")[i].style.display = "flex";
    }
  }
  else {
    alert("Invalid Key.");
  }
});

fetch(`https://user5e8e13639aafd2a.app.vtxhub.com/dlvlist/`).then((Response) => {
  return Response.json()
}).then((data) => {
  for (let i = 0; i != data["main"].length; i++) {
    document.getElementById("removedemonchoice").innerHTML += `<option>${data["main"][i]}</option>`;
  }
});

fetch(`https://user5e8e13639aafd2a.app.vtxhub.com/dlvusers/`).then((Response) => {
  return Response.json()
}).then((data) => {
  for (i in data) {
    document.getElementById("selectuserchoice").innerHTML += `<option label="${data[i]["username"]}">${data[i]["user_id"]}</option>`;
  }
});

fetch(`https://user5e8e13639aafd2a.app.vtxhub.com/dlvlist/`).then((Response) => {
  return Response.json()
}).then((data) => {
  for (i in data["main"]) {
    document.getElementById("addcompletionchoice").innerHTML += `<option>${data["main"][i]}</option>`;
    document.getElementById("removecompletionchoice").innerHTML += `<option>${data["main"][i]}</option>`;
  }
});
