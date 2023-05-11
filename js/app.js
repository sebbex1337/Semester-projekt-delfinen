import { getUsers, createUser, updateUser, deleteUser, getKontingent } from "./REST.js";

window.addEventListener("load", initApp);

async function initApp() {
	console.log("Hej");
	const kontingent = await getKontingent();
	console.log(kontingent);
}
