import { getUsers } from "./REST.js";

window.addEventListener("load", initApp);

let users = [];

function initApp() {
	updateUsersTable();
}
async function updateUsersTable() {
	users = await getUsers();
	displayUsersTable(users);
}

function displayUsersTable(listOfUsers) {
	document.querySelector("#table-kontingent-oversigt").innerHTML = "";

	for (const user of listOfUsers) {
		displayUser(user);
	}
}

function displayUser(user) {
	const kontingent = calculateKontingent(user);
	document.querySelector("#table-kontingent-oversigt").insertAdjacentHTML(
		"beforeend",
		/*html*/ `
            <tr>
                <td>MISSING IN FIREBASE</td>
                <td>${user.name}</td>
                <td>${user.mail}</td>
                <td>${user.id}</td>
                <td>${kontingent}</td>
                <td>${user.payed}</td>
                <td><button>Redigér</button></td>
            </tr>`
	);
}

function calculateKontingent(user) {
	if (user.status) {
		if (user.age < 18) {
			return 1000;
		}
		if (user.age >= 18) {
			return 1600;
		}
		if (user.age >= 60) {
			return 1200;
		}
	} else {
		return 500;
	}
}
