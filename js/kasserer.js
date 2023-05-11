import { getUsers, getKontingent, updateKontingent, updateUser, deleteUser, createUser } from "./REST.js";

window.addEventListener("load", initApp);
let users;
let kontingent;

function initApp() {
	console.log("Hej");
}

async function updateUsers() {
	users = await getUsers();
	return users;
}
