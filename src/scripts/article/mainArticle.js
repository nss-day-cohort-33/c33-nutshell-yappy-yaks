import { createArticleForm, createSubmitArticleBtn } from "./articleHelperFunctions.js/index.js"

const domContainer = document.querySelector("#dashboard-container")

function articleClick(){
    let articleForm = createArticleForm()
    domContainer.innerHTML = articleForm
    domContainer.appendChild(createSubmitArticleBtn())
}

export { articleClick }

