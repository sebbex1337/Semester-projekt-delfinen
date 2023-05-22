window.addEventListener("load", initApp);

function initApp() {
	document.querySelector("#loginDiv").addEventListener("click", showLogin);
	document.querySelector("#becomeMember").addEventListener("click", showCreateUserDialog);
	document.querySelector("#status_select").addEventListener("change", showKontingent);
	document.querySelector("#dialog-close-button").addEventListener("click", () => {
		document.querySelector("#dialog-create-user").close();
	});
	document.querySelector("#aboutUs").addEventListener("click", () => {
		window.location.href = "aboutUs.html";
	});
}

function showLogin() {
	document.querySelector("#loginDialog").showModal();
	document.querySelector("#login-form").addEventListener("submit", validateLogin);
	document.querySelector("#login-form").reset();
}

function validateLogin(event) {
	event.preventDefault();
	const username = document.querySelector("#loginUsername").value;
	const password = document.querySelector("#loginPassword").value;

	if (username === "admin" && password === "admin") {
		window.location.href = "admin.html";
	}
	if (username === "coach" && password === "coach") {
		window.location.href = "hold_oversigt.html";
	}
	if (username === "kasserer" && password === "kasserer") {
		window.location.href = "kasserer.html";
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
	const status = form.status_select.value;
	const discipliner = form.discipliner.value;
	const payed = true;
	const response = await createUser(name, mail, age, discipliner, status, role, payed);
	if (response.ok) {
		console.log("User added to Firebase!");
		form.reset();
		document.querySelector("#dialog-create-user").close();
		fetchUsers();
	}
}

function showKontingent() {
	const age = document.querySelector("#form-create-age").value;
	const status = document.querySelector("#status_select").value;
	let html = "";
	if (status === "true") {
		if (age < 18) {
			html = "Dit årlige kontingent som junior svømmer bliver 1000 kr.";
		}
		if (age >= 18 && age < 60) {
			html = "Dit årlige kontingent som senior svømmer bliver 1600 kr.";
		}
		if (age >= 60) {
			html = "Dit årlige kontingent som svømmer over 60 år bliver 1200 kr.";
		}
	}
	if (status === "false") {
		html = "Dit årlige kontingent med et passivt medlemskab er 500 kr.";
	}

	document.querySelector("#kontingentPris").textContent = html;
}

export { showLogin, validateLogin };
