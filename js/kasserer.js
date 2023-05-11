import { getUsers, getKontingent, updateUser } from "./REST.js";

window.addEventListener("load", initApp);
let users;
let kontingent;

function initApp() {
	console.log("Hej");
	updateKontingentArr();
	updateUsersArr();
	displayExpectedQuota(users);
}

async function updateUsersArr() {
	users = await getUsers();
	console.log(users);
}

async function updateKontingentArr() {
	kontingent = await getKontingent();
	console.log(kontingent);
}

function displayExpectedQuota(listOfUsers) {
	let sum = 0;
	for (const user in listOfUsers) {
		console.log(user);
	}
}
