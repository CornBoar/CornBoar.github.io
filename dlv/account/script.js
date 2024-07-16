document.addEventListener("keypress", function(event) {
    if (event.keyCode == 13) {
      logIn();
    }
  });

var globalvar1 = "";
var globalvar2 = "";
var globalvar3 = "";
var globalvar4 = "";

function signUp() {
    if (document.getElementById("semail").value !== "" && document.getElementById("spassword").value !== "") {
        if (document.getElementById("spassword").value === document.getElementById("spassword2").value) {
            if (document.getElementById("semail").value.includes("@") && document.getElementById("spassword").value.length > 2) {
                document.getElementById("signupbutton").innerHTML = "Loading...";
                fetch(`https://user5e8e13639aafd2a.app.vtxhub.com/dlvsignup/${document.getElementById("semail").value}/${document.getElementById("spassword").value}/`).then((Response) => {
                    return Response.json()
                }).then((data) => {
                    alert(data["main"]);
                    document.getElementById("signupbutton").innerHTML = "Sign Up";
                });
            }
            else {
                alert("Invalid Email And/Or Password Too Short (Minimum Of 3 Characters)");
            }
        }
        else {
            alert("Passwords Do Not Match");
        }
    }
}

function showEmailAddress() {
    document.getElementById("infoemailaddressS").innerHTML = `Email Address: ${globalvar1}`;
}

function showPassword() {
    document.getElementById("infopasswordS").innerHTML = `Password: ${globalvar2}`;
}

document.getElementById("lemail").value = localStorage.getItem("dlv-email");
document.getElementById("lpassword").value = localStorage.getItem("dlv-password");

function logIn() {
    if (document.getElementById("lemail").value === globalvar1 && document.getElementById("lpassword").value === globalvar2 && globalvar1 !== "" && document.getElementById("lpassword").value === globalvar2 !== "") {
        document.getElementById("loginbutton").innerHTML = "Log In";
        document.getElementById("lemail").style.display = "none";
        document.getElementById("lpassword").style.display = "none";
        document.getElementById("semail").style.display = "none";
        document.getElementById("spassword").style.display = "none";
        document.getElementById("spassword2").style.display = "none";
        document.getElementById("loginbutton").style.display = "none";
        document.getElementById("signupbutton").style.display = "none";
        document.getElementById("liheader").style.display = "none";
        document.getElementById("suheader").style.display= "none";
        document.getElementById("fpbutton").style.display = "none";
        let elements = document.querySelectorAll('[id*=_]');
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].id.includes("back")) {
                elements[i].style.display = "grid";
            }
            else {
                elements[i].style.display = "block";
            }
        }
        if (globalvar3 !== "true") {
            document.getElementById("adminbutton_").style.display = "none";
            document.getElementById("adminbuttonbg_").style.display = "none";
        }
    }
    else {
        if (document.getElementById("lemail").value !== "" && document.getElementById("lpassword").value !== "") {
            document.getElementById("loginbutton").innerHTML = "Loading...";
            fetch(`https://user5e8e13639aafd2a.app.vtxhub.com/dlvlogin/${document.getElementById("lemail").value}/${document.getElementById("lpassword").value}/`).then((Response) => {
                return Response.json()
            }).then((data) => {
                if (data["main"] === "Success") {
                    fetch(`https://user5e8e13639aafd2a.app.vtxhub.com/dlvgetaccount/${document.getElementById("lemail").value}/${document.getElementById("lpassword").value}/`).then((Response) => {
                        return Response.json()
                    }).then((data) => {
                        if (data["discord_account_id"] === null) {
                            document.getElementById("username_").innerHTML = "N/A";
                            document.getElementById("rank_").innerHTML = "N/A";
                            document.getElementById("completionsinner").innerHTML = "N/A";
                            alert("Please connect your Discord account using the /connectaccount command in the Discord Server to see your data.");
                        }
                        else {
                            document.getElementById("username_").innerHTML = data["discord_username"];
                            document.getElementById("username_").style.color = Object.values(data["completions"]);
                            let rankThingy = "th";
                            if (data["rank"] === 1) {
                                rankThingy = "st";
                            }
                            if (data["rank"] === 2) {
                                rankThingy = "nd"; 
                            }
                            if (data["rank"] === 3) {
                                rankThingy = "rd"; 
                            }
                            document.getElementById("rank_").innerHTML = "Global Rank: " + data["rank"] + rankThingy;
                            if (data["rank"] < 11) {
                                document.getElementById("rank_").style.color = "lightblue"
                            }
                            if (data["rank"] === 1) {
                                document.getElementById("rank_").style.color = "gold";
                            }
                            if (data["rank"] === 2) {
                                document.getElementById("rank_").style.color = "silver";
                            }
                            if (data["rank"] === 3) {
                                document.getElementById("rank_").style.color = "#CD7F32"
                            }
                            document.getElementById("xpbar_").value = data["xp"];
                            if (data["xp"] > 99) {
                                document.getElementById("xpbar_").max = (parseInt(data["xp"].toString().substring(0, data["xp"].toString().length - 2)) + 1) * 100;
                            }
                            else {
                                document.getElementById("xpbar_").max = 100;
                            }
                            document.getElementById("xplabel_").innerHTML = `${data["xp"]}/${document.getElementById("xpbar_").max} XP To Level ${Math.floor(data["xp"] / 100) + 1}`;
                            document.getElementById("levellabel_").innerHTML = `Level ${Math.floor(data["xp"] / 100)}`;
                            document.getElementById("avatar_").src = data["avatar"];
                            var completionsDiv = "";
                            for (let i = 0; i < Object.keys(data["completions"]).length; i++) {
                                if (i !== 0) {
                                    completionsDiv = completionsDiv + `<h2 style="color:${data["completions"][Object.keys(data["completions"])[i]]}; text-align: center; margin-left: auto; margin-right: auto; font-size: 50px; font-family: 'Poppins', sans-serif; display: table; line-height: 50px; border-radius: 15px; background-color: ${data["verifications"].includes(Object.keys(data["completions"])[i]) ? "#0078d7" : data["first_victors"].includes(Object.keys(data["completions"])[i]) ? "#0078d7" : "black"}">${data["og_case"][Object.keys(data["completions"])[i]]}</h2>`
                                }
                                else {
                                    completionsDiv = completionsDiv + `<h2 style="color:${data["completions"][Object.keys(data["completions"])[i]]}; text-align: center; margin-left: auto; margin-right: auto; font-size: 50px; font-family: 'Poppins', sans-serif; display: table; line-height: 50px; border-radius: 15px; background-color: ${data["verifications"].includes(Object.keys(data["completions"])[i]) ? "#0078d7" : data["first_victors"].includes(Object.keys(data["completions"])[i]) ? "#0078d7" : "black"}">${data["og_case"][Object.keys(data["completions"])[i]]}</h2>`
                                }
                            }
                            if (globalvar3 !== "true") {
                                document.getElementById("adminbutton_").style.display = "none";
                                document.getElementById("adminbuttonbg_").style.display = "none";
                            }
                            document.getElementById("completions_").innerHTML = completionsDiv;
                            document.getElementById("infodiscordaccountidS").innerHTML = `Discord Account ID: ${data["discord_account_id"]}`
                            globalvar1 = data["email"];
                            globalvar2 = data["password"];
                            globalvar4 = data["discord_account_id"];
                        }
                    });
                    document.getElementById("loginbutton").innerHTML = "Log In";
                    document.getElementById("lemail").style.display = "none";
                    document.getElementById("lpassword").style.display = "none";
                    document.getElementById("semail").style.display = "none";
                    document.getElementById("spassword").style.display = "none";
                    document.getElementById("spassword2").style.display = "none";
                    document.getElementById("loginbutton").style.display = "none";
                    document.getElementById("signupbutton").style.display = "none";
                    document.getElementById("liheader").style.display = "none";
                    document.getElementById("suheader").style.display= "none";
                    document.getElementById("fpbutton").style.display = "none";
                    let elements = document.querySelectorAll('[id*=_]');
                    for (let i = 0; i < elements.length; i++) {
                        if (elements[i].id.includes("back")) {
                            elements[i].style.display = "grid";
                        }
                        else {
                            elements[i].style.display = "block";
                        }
                    }
                    if (globalvar3 !== "true") {
                        document.getElementById("adminbutton_").style.display = "none";
                        document.getElementById("adminbuttonbg_").style.display = "none";
                    }
                }
                else {
                    alert(data["main"]);
                    document.getElementById("loginbutton").innerHTML = "Log In";
                }
                if (data["data"]["discord_account_id"] !== "543885678258290699" || data["data"]["discord_account_id"] !== "991443322516279466") {
                    document.getElementById("adminbutton_").style.display = "grid";
                    document.getElementById("adminbuttonbg_").style.display = "grid";
                    globalvar3 = "true";
                }
                localStorage.setItem("dlv-email", document.getElementById("lemail").value);
                localStorage.setItem("dlv-password", document.getElementById("lpassword").value);
            });
        }
    }
}

function backButtonHover() {
    document.getElementById("backbuttonbg_").src = "https://cornboar.com/assets/buttonhoverbg.png";
    document.getElementById("backbuttonbg_").style.maxHeight = "100px";
    document.getElementById("backbuttonbg_").style.minWidth = "155px";
}

function backButtonUnhover() {
    document.getElementById("backbuttonbg_").src = "https://cornboar.com/assets/backbuttonbg.png";
    document.getElementById("backbuttonbg_").style.maxHeight = "100px";
    document.getElementById("backbuttonbg_").style.minWidth = "155px";
}

function backButtonSHover() {
    document.getElementById("backbuttonbgS").src = "https://cornboar.com/assets/buttonhoverbg.png";
    document.getElementById("backbuttonbgS").style.maxHeight = "100px";
    document.getElementById("backbuttonbgS").style.minWidth = "155px";
}

function backButtonSUnhover() {
    document.getElementById("backbuttonbgS").src = "https://cornboar.com/assets/backbuttonbg.png";
    document.getElementById("backbuttonbgS").style.maxHeight = "100px";
    document.getElementById("backbuttonbgS").style.minWidth = "155px";
}

function settingsButtonHover() {
    document.getElementById("settingsbuttonbg_").src = "https://cornboar.com/assets/buttonhoverbg.png";
    document.getElementById("settingsbuttonbg_").style.maxHeight = "100px";
    document.getElementById("settingsbuttonbg_").style.minWidth = "155px";
}

function settingsButtonUnhover() {
    document.getElementById("settingsbuttonbg_").src = "https://cornboar.com/assets/settingsbuttonbg.png";
    document.getElementById("settingsbuttonbg_").style.maxHeight = "100px";
    document.getElementById("settingsbuttonbg_").style.minWidth = "155px";
}

function adminButtonHover() {
    document.getElementById("adminbuttonbg_").src = "https://cornboar.com/assets/buttonhoverbg.png";
    document.getElementById("adminbuttonbg_").style.maxHeight = "100px";
    document.getElementById("adminbuttonbg_").style.minWidth = "155px";
}

function adminButtonUnhover() {
    document.getElementById("adminbuttonbg_").src = "https://cornboar.com/assets/adminbuttonbg.jpg";
    document.getElementById("adminbuttonbg_").style.maxHeight = "100px";
    document.getElementById("adminbuttonbg_").style.minWidth = "155px";
    document.getElementById("adminbuttonbg_").style.maxWidth = "155px";
}

function back() {
    if (document.getElementById("settingsheaderS").style.display === "block") {
        document.getElementById("loginbutton").innerHTML = "Log In";
        document.getElementById("lemail").style.display = "none";
        document.getElementById("lpassword").style.display = "none";
        document.getElementById("semail").style.display = "none";
        document.getElementById("spassword").style.display = "none";
        document.getElementById("spassword2").style.display = "none";
        document.getElementById("loginbutton").style.display = "none";
        document.getElementById("signupbutton").style.display = "none";
        document.getElementById("liheader").style.display = "none";
        document.getElementById("suheader").style.display= "none";
        document.getElementById("fpbutton").style.display = "none";
        let elements = document.querySelectorAll('[id*=S]');
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = "none";
        }
        if (globalvar3 !== "true") {
            document.getElementById("adminbutton_").style.display = "none";
            document.getElementById("adminbuttonbg_").style.display = "none";
        }
        let elements2 = document.querySelectorAll('[id*=_]');
        for (let i = 0; i < elements2.length; i++) {
            if (elements2[i].id.includes("button")) {
                elements2[i].style.display = "grid";
            }
            else {
                elements2[i].style.display = "block";
            }
        }
        if (globalvar3 !== "true") {
            document.getElementById("adminbutton_").style.display = "none";
            document.getElementById("adminbuttonbg_").style.display = "none";
        }
    }
    else {
        document.getElementById("lemail").style.display = "block";
        document.getElementById("lpassword").style.display = "block";
        document.getElementById("semail").style.display = "block";
        document.getElementById("spassword").style.display = "block";
        document.getElementById("spassword2").style.display = "block";
        document.getElementById("loginbutton").style.display = "block";
        document.getElementById("signupbutton").style.display = "block";
        document.getElementById("liheader").style.display = "block";
        document.getElementById("suheader").style.display = "block";
        document.getElementById("fpbutton").style.display = "block";
        let elements = document.querySelectorAll("[id*=_]");
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = "none";
        }
        if (globalvar3 !== "true") {
            document.getElementById("adminbutton_").style.display = "none";
            document.getElementById("adminbuttonbg_").style.display = "none";
        }
    }
}

function settings() {
    document.getElementById("lemail").style.display = "none";
    document.getElementById("lpassword").style.display = "none";
    document.getElementById("semail").style.display = "none";
    document.getElementById("spassword").style.display = "none";
    document.getElementById("spassword2").style.display = "none";
    document.getElementById("loginbutton").style.display = "none";
    document.getElementById("signupbutton").style.display = "none";
    document.getElementById("liheader").style.display = "none";
    document.getElementById("suheader").style.display = "none";
    document.getElementById("fpbutton").style.display = "none";
    document.getElementById("infoemailaddressS").innerHTML = "Email Address: <button onclick=showEmailAddress()>Click To Show</button>";
    document.getElementById("infopasswordS").innerHTML = "Password: <button onclick=showPassword()>Click To Show</button>";
    let elements = document.querySelectorAll("[id*=_]");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
    if (globalvar3 !== "true") {
        document.getElementById("adminbutton_").style.display = "none";
        document.getElementById("adminbuttonbg_").style.display = "none";
    }
    let elements2 = document.querySelectorAll("[id*=S]");
    for (var i = 0; i < elements2.length; i++) {
        elements2[i].style.display = "block";
    }
    if (globalvar3 !== "true") {
        document.getElementById("adminbutton_").style.display = "none";
        document.getElementById("adminbuttonbg_").style.display = "none";
    }
}

function adminRedirect() {
    window.open("https://cornboar.com/dlv/admin/", "_blank");
}

function forgotPassword() {
    let email = prompt("Enter your email address:");
    fetch(`https://user5e8e13639aafd2a.app.vtxhub.com/dlvsendotp/${email}/`).then((Response) => {
            return Response.json()
        }).then((data) => {
           alert(data["main"]); 
        });
}

let elements = document.querySelectorAll("[id*=_]");
for (var i = 0; i < elements.length; i++) {
    elements[i].style.display = "none";
}
if (globalvar3 !== "true") {
    document.getElementById("adminbutton_").style.display = "none";
    document.getElementById("adminbuttonbg_").style.display = "none";
}

function changePassword() {
    if (document.getElementById("changepasswordS").value !== "") {
        if (document.getElementById("changepasswordS").value === document.getElementById("confirmchangepasswordS").value) {
            alert("Loading...")
            fetch(`https://user5e8e13639aafd2a.app.vtxhub.com/dlvchangepassword/${globalvar1}/${globalvar2}/${document.getElementById("changepasswordS").value}/`).then((Response) => {
                    return Response.json()
                }).then((data) => {
                    alert(data["main"]);
                });
        }
        else {
            alert("Passwords Do Not Match");
        }
    }
}

function backButtonHover2() {
    document.getElementById("backbuttonbg2").src = "https://cornboar.com/assets/buttonhoverbg.png";
    document.getElementById("backbuttonbg2").style.maxHeight = "100px";
    document.getElementById("backbuttonbg2").style.minWidth = "155px";
}
  
  function backButtonUnhover2() {
    document.getElementById("backbuttonbg2").src = "https://cornboar.com/assets/backbuttonbg.png";
    document.getElementById("backbuttonbg2").style.maxHeight = "100px";
    document.getElementById("backbuttonbg2").style.minWidth = "155px";
}
  
  function back2() {
    window.location.replace("https://cornboar.com/dlv/");
}
