import { getUsers } from "./REST.js";
window.addEventListener("load", initApp);

let users 

function initApp(){
    console.log("admin view loaded")
    fetchUsers()
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