window.addEventListener("load", initApp);

function initApp() {
	document.querySelector("#loginDiv").addEventListener("click", showLogin);
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

export { validateLogin, showLogin };
