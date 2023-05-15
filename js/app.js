import { getUsers, createUser, updateUser, deleteUser, getKontingent } from "./REST.js";

window.addEventListener("load", initApp);

let users;
let kontingent;

function initApp() {
	console.log("Hej");
	document.querySelector("#loginDiv").addEventListener("click", showLogin)
}
function showLogin(){
	document.querySelector("#loginDialog").showModal()
	document.querySelector("#login-form").addEventListener("submit", validateLogin)
	document.querySelector("#login-form").reset();
}
function validateLogin(event){
	event.preventDefault();
	const username = document.querySelector("#loginUsername").value;
	const password = document.querySelector("#loginPassword").value;

	if(username ===	user.username && password === user.password){

	}else{
		alert("login mislykkedes")
	}
}

async function updateUsersTable() {
	users = await getUsers();
}

function adminViewUsers(){
document.querySelector("#").insertAdjacentHTML("beforeend",
/*html*/`<`
)
}
