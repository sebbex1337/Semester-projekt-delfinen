import { getUsers, updateUser } from "./REST.js";
window.addEventListener("load", initApp);

let users = [];

const settings = {
	filterDisc: "",
	filterAge: "",
	sortTime: "asc",
};

function initApp() {
	fetchUsers();

	document.querySelector("#hold-nav").addEventListener("click", () => (window.location.href = "hold_oversigt.html"));
	document.querySelector("#logOut").addEventListener("click", () => (window.location.href = "index.html"));
	document.querySelector("#form-edit-results").addEventListener("submit", editUserClicked);
	document.querySelector("#filter-disciplin").addEventListener("change", filterDisciplin);
	document.querySelector("#filter-age").addEventListener("change", filterAge);
	document.querySelector("#sort-time").addEventListener("change", setSortTime);
	document.querySelector("#udtaget").addEventListener("change", filterUdtaget);
	document.querySelector("#cancel-btn").addEventListener("click", () => {
		document.querySelector("#dialog-edit-results").close();
	});
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
	// Filter konkurrence nu så behøver vi ikke senere
	users = users.filter((user) => user.role === "konkurrence");
	console.log(users);
	displayUsers(users);
}

function displayUsers(listOfUsers) {
	document.querySelector("#konkurrence-oversigt").innerHTML = "";

	for (const user of listOfUsers) {
		displayUser(user);
	}
}

function displayUser(user) {
	document.querySelector("#konkurrence-oversigt").insertAdjacentHTML(
		"beforeend",
		/*html*/ `
            <tr>
                <td>${user.discipliner}</td>
                <td>${user.trainingResult}</td>
                <td>${user.name}</td>
                <td>${user.age}</td>
                <td>${user.mail}</td>
                <td><button class="edit">Redigér</button></td>
            </tr>
        `
	);
	document.querySelector("#konkurrence-oversigt tr:last-child .edit").addEventListener("click", () => editClicked(user));
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

function buildList() {
	const currentList = filterDisciplinList(users);
	const filteredList = filterByAge(currentList);
	const sortedList = sortByTime(filteredList);

	displayUsers(sortedList);
}

function filterDisciplin(event) {
	const filter = event.target.value;
	setFilterDisciplin(filter);
}

function setFilterDisciplin(filter) {
	settings.filterDisc = filter;
	console.log(settings.filterDisc);
	buildList();
}

function filterDisciplinList(filteredList) {
	if (settings.filterDisc === "") {
		return filteredList;
	} else if (settings.filterDisc === "Butterfly") {
		filteredList = filteredList.filter((user) => user.discipliner.includes(settings.filterDisc));
	} else if (settings.filterDisc === "Crawl") {
		filteredList = filteredList.filter((user) => user.discipliner.includes(settings.filterDisc));
	} else if (settings.filterDisc === "Rygcrawl") {
		filteredList = filteredList.filter((user) => user.discipliner.includes(settings.filterDisc));
	} else if (settings.filterDisc === "Brystsvømning") {
		filteredList = filteredList.filter((user) => user.discipliner.includes(settings.filterDisc));
	}
	return filteredList;
}

function filterAge(event) {
	const filter = event.target.value;
	setFilterAge(filter);
}

function setFilterAge(filter) {
	settings.filterAge = filter;
	console.log(settings.filterAge);
	buildList();
}

function filterByAge(filteredList) {
	if (settings.filterAge === "") {
		return filteredList;
	} else if (settings.filterAge === "Junior") {
		filteredList = filteredList.filter((user) => user.age < 18);
	} else if (settings.filterAge === "Senior") {
		filteredList = filteredList.filter((user) => user.age >= 18 && user.age < 60);
	}
	return filteredList;
}

function setSortTime(event) {
	const sort = event.target.value;
	setSort(sort);
}

function setSort(sort) {
	settings.sortTime = sort;
	console.log(settings.sortTime);
	buildList();
}

function sortByTime(sortedList) {
	if (settings.sortTime === "") {
		return sortedList;
	} else if (settings.sortTime === "asc") {
		sortedList = sortedList.sort((a, b) => {
			return Number(a.trainingResult) - Number(b.trainingResult);
		});
	} else if (settings.sortTime === "dsc") {
		sortedList = sortedList.sort((a, b) => {
			return Number(b.trainingResult) - Number(a.trainingResult);
		});
	}
	return sortedList;
}

function filterUdtaget(event) {
	const selectedValue = event.target.value;
	displayUsers(filterUdtagelse(selectedValue));
}

function filterUdtagelse(filterBy) {
	if (filterBy === "") {
		return users;
	} else if (filterBy === "udtaget") {
		return users.filter((user) => user.favorite === "true");
	}
}
