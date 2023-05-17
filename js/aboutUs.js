import { validateLogin, showLogin } from "./index.js";

window.addEventListener("load", initApp);

function initApp() {
	document.querySelector("#loginDiv").addEventListener("click", showLogin);
	document.querySelector("#login-form").addEventListener("submit", validateLogin);
	document.querySelector("#delfinLogo").addEventListener("click", () => (window.location.href = "index.html"));
}
