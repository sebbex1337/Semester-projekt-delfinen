import { getUsers, createUser } from "./REST.js";
window.addEventListener("load", initApp);

let users;

function initApp() {
	console.log("admin view loaded");
	fetchUsers();

	document.querySelector("#createUser").addEventListener("click", showCreateUserDialog);
	document.querySelector("#status_select").addEventListener("change", showKontingent);
	document.querySelector("#dialog-close-button").addEventListener("click",()=>{document.querySelector("#dialog-create-user").close()})
}

async function fetchUsers() {
	users = await getUsers();
	adminViewUsers(users);
}
function adminViewUser(user) {
	document.querySelector("#adminview").insertAdjacentHTML(
		"beforeend",
		/*html*/ `<tr>
        <td>Missing("Placement")</td>
        <td>${user.name}</td>
        <td>${user.age}</td>
        <td>${user.mail}</td>
        <td>Missing("results")</td>
        <td>Rediger</td>
        </tr>`
	);
}

function adminViewUsers(usersList) {
	for (const user of usersList) {
		adminViewUser(user);
	}
}

function showCreateUserDialog() {
	document.querySelector("#dialog-create-user").showModal();
	document.querySelector("#form-create-new-user").addEventListener("submit", createUserClicked);
}

async function createUserClicked(event) {
	event.preventDefault();
	const form = this;
	const name = form.name.value;
	const age = form.age.value;
	const role = form.role_select.value;
	const mail = form.mail.value;
	const status = form.status_select.value;
	const discipliner = form.discipliner.value;
	const response = await createUser(name, mail, age, discipliner, status, role);
	if (response.ok) {
		console.log("User added to Firebase!");
		form.reset();
		document.querySelector("#dialog-create-user").close();
        fetchUsers();
		showPrompt("User added to Firebase!");
	}
}

function showKontingent() {
	const age = document.querySelector("#form-create-age").value;
	const status = document.querySelector("#status_select").value;
	console.log(status);
	let html = "";
	if (status === "true") {
		if (age < 18) {
			html = "dit årlige kontingent 1000 kr.";
		}
		if (age >= 18 && age < 60) {
			html = "dit årlige kontingent 1600 kr.";
		}
		if (age >= 60) {
			html = "dit årlige kontingent 1200 kr.";
		}
	}
	if (status === "false") {
		html = "dit årlige kontingent er 500 kr.";
	}

	document.querySelector("#kontingentPris").textContent = html;
}
