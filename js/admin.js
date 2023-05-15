window.addEventListener("load", initApp);

import { initApp } from "./app.js";

function adminViewUsers() {
	document.querySelector("#").insertAdjacentHTML(
		"beforeend",
		/*html*/ `<thead>
		<tr>
			<th>Placering: ${user.placering}</th>
			<th>Navn: ${user.name}</th>
			<th>Alder: ${user.age}</th>
			<th>Kontakt: ${user.kontakt}</th>
			<th>Resultater ${user.results}</th>
			<th>Rediger</th>
		</tr>
	</thead>
	<tbody id="adminview"></tbody>`
	);
}
