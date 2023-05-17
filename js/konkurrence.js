import { getUsers, updateUser } from "./REST.js";
window.addEventListener("load", initApp);

let users = [];

function initApp() {
	fetchUsers();

	document.querySelector("#hold-nav").addEventListener("click", () => (window.location.href = "hold_oversigt.html"));
	document.querySelector("#form-edit-results").addEventListener("submit", editUserClicked);
}

async function editUserClicked(event) {
	event.preventDefault();
	const form = this;
	const name = document.querySelector("#edit-name").textContent;
	const age = document.querySelector("#edit-age").textContent;
	const mail = document.querySelector("#edit-mail").textContent;
	const discipliner = document.querySelector("#edit-disciplin").textContent;
	const status = document.querySelector("#edit-status").textContent;
	const role = document.querySelector("#edit-role").textContent;
	const payed = true;
	const trainingDate = form.trainingDate.value;
	const trainingLength = form.trainingLength.value;
	const trainingResult = form.trainingResult.value;
	const tournament = form.tournament.value;
	const tournamentDate = form.tournamentDate.value;
	const tournamentResult = form.tournamentResult.value;
	const tournamentLength = form.tournamentLength.value;
	const favorite = form.favorite.value;
	const id = form.getAttribute("data-id");
	const response = await updateUser(id, name, mail, age, discipliner, status, role, trainingDate, trainingLength, trainingResult, tournament, tournamentDate, tournamentResult, tournamentLength, favorite, payed);
	if (response.ok) {
		console.log("User updated");
		form.reset();
		document.querySelector("#dialog-edit-results").close();
		fetchUsers();
	}
}

async function fetchUsers() {
	users = await getUsers();
	displayUsers(users);
}

function displayUsers(listOfUsers) {
	document.querySelector("#konkurrence-oversigt").innerHTML = "";

	for (const user of listOfUsers) {
		displayUser(user);
	}
}

function displayUser(user) {
	if (user.role === "konkurrence") {
		document.querySelector("#konkurrence-oversigt").insertAdjacentHTML(
			"beforeend",
			/*html*/ `
            <tr>
                <td>${user.discipliner}</td>
                <td>${user.name}</td>
                <td>${user.age}</td>
                <td>${user.mail}</td>
                <td><button class="edit">Redigér</button></td>
            </tr>
        `
		);
		document.querySelector("#konkurrence-oversigt tr:last-child .edit").addEventListener("click", () => editClicked(user));
		console.log(user);
	}
}

function editClicked(user) {
	document.querySelector("#edit-name").textContent = user.name;
	document.querySelector("#edit-age").textContent = user.age;
	document.querySelector("#edit-mail").textContent = user.mail;
	document.querySelector("#edit-disciplin").textContent = user.discipliner;
	document.querySelector("#edit-status").textContent = user.status;
	document.querySelector("#edit-role").textContent = user.role;
	const editForm = document.querySelector("#form-edit-results");
	editForm.trainingDate.value = user.trainingDate;
	editForm.trainingLength.value = user.trainingLength;
	editForm.trainingResult.value = user.trainingResult;
	editForm.tournament.value = user.tournament;
	editForm.tournamentDate.value = user.tournamentDate;
	editForm.tournamentResult.value = user.tournamentResult;
	editForm.tournamentLength.value = user.tournamentLength;
	editForm.favorite.value = user.favorite;

	editForm.setAttribute("data-id", user.id);
	document.querySelector("#dialog-edit-results").showModal();
	document.querySelector("#cancel-btn").addEventListener("click", () => document.querySelector("#dialog-edit-results").closest());
}
