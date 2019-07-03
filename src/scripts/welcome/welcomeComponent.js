import { API } from "../api";
import { mainEntryToDom } from "../mainEntryToDom";
import { createDashboard,createNav } from "../mainComponent";

const domContainer = document.querySelector("#dashboard-container")

function welcomeComponent() {
    let welcomeDiv =  document.createElement("div")
    welcomeDiv.setAttribute("id", "welcome-div")
    let welcomeHeader = document.createElement("h1")
    welcomeHeader.setAttribute("id", "welcome-header")
    let registerHeader = document.createElement("h3")
    registerHeader.setAttribute("id", "registerHeader")
    let registerButton = document.createElement("button")
    registerButton.setAttribute("id", "reg-btn")
    welcomeHeader.textContent = "Welcome to Nutshell!"
    registerHeader.textContent = "Please register"
    registerButton.textContent = "Click Here"
    registerButton.addEventListener("click", event => {
        document.getElementById("reg-btn").style.visibility = "hidden"
        domContainer.appendChild(registerFormComponent())
    })
    welcomeDiv.appendChild(welcomeHeader)
    welcomeDiv.appendChild(registerHeader)
    welcomeDiv.appendChild(registerButton)
    return welcomeDiv
}
const storage = ( userData, createdData) => {
    userData.forEach( user => {
        if (user.username === createdData.username) {
            sessionStorage.setItem("userId", user.id)
            let userID = sessionStorage.getItem("userId")
            console.log("userID: ", userID);
        }

    });
}
function registerFormComponent() {
    let registerDiv = document.createElement("form")
    let userName = document.createElement("input")
    userName.setAttribute("type", "text")
    userName.setAttribute("name", "user-name")
    userName.setAttribute("id", "user-name")
    let email = document.createElement("input")
    email.setAttribute("type", "text")
    email.setAttribute("name", "email")
    email.setAttribute("id", "email")
    let password = document.createElement("input")
    password.setAttribute("type", "text")
    password.setAttribute("name", "password")
    password.setAttribute("id", "password")
    let labelUserName = document.createElement("label")
    labelUserName.textContent = "User Name"
    let labelEmail = document.createElement("label")
    labelEmail.textContent = "Email"
    let labelPassword = document.createElement("label")
    labelPassword.textContent = "Password"
    let fieldsetUserName = document.createElement("fieldset")
    let fieldsetEmail = document.createElement("fieldset")
    let fieldsetPassword = document.createElement("fieldset")
    let regSubmitBtn = document.createElement("button")
    regSubmitBtn.setAttribute("id", "reg-submit-btn")
    regSubmitBtn.textContent = "Submit"
    regSubmitBtn.addEventListener("click", event => {
        event.preventDefault()
        let newUser = userName.value
        let newEmail = email.value
        let newPassword = password.value
        if (newUser && newEmail && newPassword){
            let createdUser = createNewUser(newUser, newEmail, newPassword)
            API.addData("users", createdUser)
            .then(data => {
                API.getData("users").then( newData => storage(newData, createdUser))
                domContainer.innerHTML = ""
                mainEntryToDom(createNav(), createDashboard())
            })
        }
        else{
            alert("Please fill out all fields!")
        }

    })
    fieldsetUserName.appendChild(labelUserName)
    fieldsetUserName.appendChild(userName)
    fieldsetEmail.appendChild(labelEmail)
    fieldsetEmail.appendChild(email)
    fieldsetPassword.appendChild(labelPassword)
    fieldsetPassword.appendChild(password)
    registerDiv.appendChild(fieldsetUserName)
    registerDiv.appendChild(fieldsetEmail)
    registerDiv.appendChild(fieldsetPassword)
    registerDiv.appendChild(regSubmitBtn)
    return registerDiv
}

function createNewUser(username, email, password){
    return {
        username,
        email,
        password
    }
}

export {welcomeComponent}