import { getUsers } from "./REST.js";
window.addEventListener("load", initApp);

let users 

function initApp(){
    console.log("admin view loaded")
    fetchUsers()

    document.querySelector("#createUser").addEventListener("click", showCreateUserDialog);
}
async function fetchUsers(){
users = await getUsers()
adminViewUsers(users)
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
    );}

function adminViewUsers(usersList){
    for(const user of usersList ){
        adminViewUser(user)
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
	const team = form.team_select.value;
	const operatingSystem = form.discipliner.value;
	const pineapple = form.pineapple.value;
	const response = await createUser(name, age, role, mail, team, discipliner, pineapple);
	if (response.ok) {
		console.log("User added to Firebase!");
		form.reset();
		document.querySelector("#dialog-create-user").close();
		updateUsersGrid();
		showPrompt("User added to Firebase!");
	}
}