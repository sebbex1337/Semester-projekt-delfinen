import { getUsers } from "./REST.js";

window.addEventListener("load", initApp);

let users;

function initApp() {
	updateUsersTable();

	document.querySelector("#logOut").addEventListener("click", () => (window.location.href = "index.html"));
	document.querySelector("#konkurrence-nav").addEventListener("click", () => (window.location.href = "konkurrence.html"));
	document.querySelector("#sort-by").addEventListener("change", sortByChanged);
	document.querySelector("#filter-by").addEventListener("change", filterByChanged);
}

async function updateUsersTable() {
	users = await getUsers();
	displayUsers(users);
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
			<td><button class="edit">Redigér</button></td>
		</tr>
	`
		);
		document.querySelector("#hold_oversigt tr:last-child .edit").addEventListener("click", () => editClicked(user));
	}
}

function editClicked(user) {
	console.log(user);
}

// sorter og filter

function sortUsers(sortBy) {
	if (sortBy === "name") {
		return users.sort((userA, userB) => userA.name > userB.name);
	}
	if (sortBy === "age") {
		return users.sort((userA, userB) => userA.age > userB.age);
	}
	if (sortBy === "Disciplin") {
		return users.sort((userA, userB) => userA.discipliner > userB.discipliner);
	}
}

function sortByChanged(event) {
	const selectedValue = event.target.value;
	displayUsers(sortUsers(selectedValue));
}

function filterUsers(filterBy) {
	switch (filterBy) {
		case "":
			return users;
		case "Butterfly":
			return users.filter((user) => user.discipliner.includes(filterBy));
		case "Crawl":
			return users.filter((user) => user.discipliner.includes(filterBy));
		case "Rygcrawl":
			return users.filter((user) => user.discipliner.includes(filterBy));
		case "Brystsvømning":
			return users.filter((user) => user.discipliner.includes(filterBy));
		case "Junior":
			return users.filter((user) => user.age < 18);
		case "Senior":
			return users.filter((user) => user.age >= 18);
	}
}

function filterByChanged(event) {
	const selectedValue = event.target.value;
	displayUsers(filterUsers(selectedValue));
}
