import { getUsers } from "./REST.js";
window.addEventListener("load", initApp);

let users;

function initApp() {
	console.log("Hej");
	document.querySelector("#loginDiv").addEventListener("click", showLogin);
}
function showLogin() {
	document.querySelector("#loginDialog").showModal();
	document.querySelector("#login-form").addEventListener("submit", validateLogin);
	document.querySelector("#login-form").reset();
}
function validateLogin(event) {
	event.preventDefault();
	const username = document.querySelector("#loginUsername").value;
	const password = document.querySelector("#loginPassword").value;

	if (username === user.username && password === user.password) {
	} else {
		alert("login mislykkedes");
	}
	updateUsersTable();
}

async function updateUsersTable() {
	users = await getUsers();
	displayUsers(users);
}

function displayUser(user) {
	if (user.role !== "admin" && user.role !== "træner") {
		document.querySelector("#hold_oversigt").insertAdjacentHTML(
			"beforeend",
			/*html*/ `
		<tr>
			<td>${user.discipliner}</td>
			<td>${user.name}</td>
			<td>${user.age}</td>
			<td>${user.mail}</td>
		</tr>
	`
		);
	}
}

function displayUsers(listOfUsers) {
	document.querySelector("#hold_oversigt").innerHTML = ""; // Reset users list in html

	if (listOfUsers.length !== 0) {
		for (const user of listOfUsers) {
			displayUser(user);
		}
	} else {
		document.querySelector("#hold_oversigt").innerHTML = "Sorry! No users were found";
	}
}
