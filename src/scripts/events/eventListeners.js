import {addEventToDB, updateEventToDB} from "./addEventsToDB.js"
import {addEventEditForm} from "./addEventFormToDOM.js"
import { API } from "../api.js";

// create event listener function for delete event button
// being called in eventsHTML()

const delBtnListener = ( btn) => {
    btn.addEventListener("click", () => {
        let currId = +sessionStorage.getItem("userId")
        let delId = event.target.id
        let delSplit = delId.split("-")
        let delName = document.querySelector(`#eventName-${delSplit[1]}`).textContent
        let elementToRemove = document.getElementById(`event-user:${currId}`)
        if (confirm(`Are you sure you want to remove ${delName} event?`)) {
            // takes the id of the friendship and calls the API delete method
            API.deleteData("events", delSplit[1]).then(() => {
                // added the alert within the .then() so that the element will be removed before the
                // alert is triggered. I feel like it is more user friendly to see it go away
                // and then be told is was successfully removed
                alert(`${delName} event removed!`)
            })
            // I removed the element on the click of the button, so we don't have to refresh the whole
            // page, it just removes the element and looks as if the page was refreshed (less expensive)
            elementToRemove.remove()
        }
    })
}

// create event listener function for edit event button
// being called in eventsHTML()

const editBtnListener = ( btn) => {
    btn.addEventListener("click", () => {
        let editBtnId = event.target.id
        let splitId = editBtnId.split("-")
        let eventId = splitId[1]
        let nameEdit = document.querySelector(`#eventName-${eventId}`).textContent
        let dateEdit = document.querySelector(`#eventDate-${eventId}`).textContent
        let timeEdit = document.querySelector(`#eventTime-${eventId}`).textContent
        let locationEdit = document.querySelector(`#eventLocation-${eventId}`).textContent
        let timestampEdit = document.querySelector(`#eventTimestamp-${eventId}`).textContent
        addEventEditForm(nameEdit, dateEdit, timeEdit, locationEdit, timestampEdit, eventId)
    })
}

const saveBtnListener = ( btn) => {
    btn.addEventListener("click", () => {
        let event_nameKey = document.querySelector("#event-name-input").value
        let dateKey = document.querySelector("#event-date-input").value
        let timeKey = document.querySelector("#event-time-input").value
        let locationKey = document.querySelector("#event-location-input").value
        if (event_nameKey && dateKey && timeKey && locationKey) {
            addEventToDB(event_nameKey, dateKey, timeKey, locationKey)
        }
    })
}

// this takes the edited form and updateds the DB

const saveEditBtnListener = ( btn) => {
    btn.addEventListener("click", () => {
        let id = event.target.id
        let event_nameKey = document.querySelector("#event-name-edit").value
        let dateKey = document.querySelector("#event-date-edit").value
        let timeKey = document.querySelector("#event-time-edit").value
        let locationKey = document.querySelector("#event-location-edit").value
        let timestampKey = document.querySelector("#event-timestamp-edit").textContent
        if (event_nameKey && dateKey && timeKey && locationKey) {
            updateEventToDB(event_nameKey, dateKey, timeKey, locationKey, timestampKey, id)
        }
    })
}
export {delBtnListener, editBtnListener, saveBtnListener, saveEditBtnListener}