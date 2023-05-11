import { getUsers, createUser, updateUser, deleteUser, getKontingent } from "./REST.js";

window.addEventListener("load", initApp);

let users;
let kontingent;

async function initApp() {
	console.log("Hej");
}

async function updateUsersTable() {
	users = await getUsers();
}
