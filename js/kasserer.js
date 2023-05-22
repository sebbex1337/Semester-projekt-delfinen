import { getUsers } from "./REST.js";

window.addEventListener("load", initApp);
let users = [];

function initApp() {
	updateUsersArr();
	document.querySelector("#restance-select").addEventListener("change", filterByChanged);
	document.querySelector("#logOut").addEventListener("click", () => (window.location.href = "index.html"));
}

async function updateUsersArr() {
	users = await getUsers();
	displayExpectedQuota(users);
	displayNumbersinTable(users);
	displayCumulatedKontingent(users);
	displayMissingQuota(users);
	displayUsersTable(users);
}

function displayNumbersinTable(listOfUsers) {
	let numOfJunior = 0;
	let numOfSenior = 0;
	let numOfSeniorPlus = 0;
	let numOfPassive = 0;

	for (const user of listOfUsers) {
		if (user.role !== "admin") {
			if (user.status) {
				if (user.age < 18) {
					numOfJunior++;
				}
				if (user.age >= 18 && user.age < 60) {
					numOfSenior++;
				}
				if (user.age >= 60) {
					numOfSeniorPlus++;
				}
			} else {
				numOfPassive++;
			}
		}
	}
	document.querySelector("#table-junior-antal").textContent = numOfJunior;
	document.querySelector("#table-senior-antal").textContent = numOfSenior;
	document.querySelector("#table-seniorPlus-antal").textContent = numOfSeniorPlus;
	document.querySelector("#table-passiv-antal").textContent = numOfPassive;
}

function displayCumulatedKontingent(listOfUsers) {
	let junior = 0;
	let senior = 0;
	let seniorPlus = 0;
	let passive = 0;

	for (const user of listOfUsers) {
		if (user.role !== "admin") {
			if (user.status) {
				if (user.age < 18) {
					junior += 1000;
				}
				if (user.age >= 18 && user.age < 60) {
					senior += 1600;
				}
				if (user.age >= 60) {
					seniorPlus += 1200;
				}
			} else {
				passive += 500;
			}
		}
	}
	document.querySelector("#table-junior-samlet-kontingent").textContent = junior;
	document.querySelector("#table-senior-samlet-kontingent").textContent = senior;
	document.querySelector("#table-seniorPlus-samlet-kontingent").textContent = seniorPlus;
	document.querySelector("#table-passiv-samlet-kontingent").textContent = passive;
}

function displayExpectedQuota(listOfUsers) {
	let sum = 0;
	for (const user of listOfUsers) {
		if (user.role !== "admin") {
			if (user.status) {
				// Check if passive membership
				if (user.age < 18) {
					sum += 1000;
				}
				if (user.age >= 18 && user.age < 60) {
					sum += 1600;
				}
				if (user.age >= 60) {
					sum += 1200;
				}
			} else {
				sum += 500;
			}
		}
	}
	document.querySelector("#forventet-kontingent").textContent = sum + " kr";
}

// TODO: Missing payment display
function displayMissingQuota(listOfUsers) {
	let sum = 0;

	for (const user of listOfUsers) {
		if (user.role !== "admin") {
			if (!user.payed) {
				sum += calculateKontingent(user);
			}
		}
	}
	document.querySelector("#manglende-kontingent").textContent = sum + " kr";
}

/* User table */

function displayUsersTable(listOfUsers) {
	document.querySelector("#table-kontingent-oversigt").innerHTML = "";

	for (const user of listOfUsers) {
		displayUser(user);
	}
}

function displayUser(user) {
	if (user.role !== "admin") {
		const kontingent = calculateKontingent(user);
		document.querySelector("#table-kontingent-oversigt").insertAdjacentHTML(
			"beforeend",
			/*html*/ `
            <tr>
                <td>${user.name}</td>
                <td>${user.mail}</td>
                <td>${user.id}</td>
                <td>${kontingent}</td>
                <td>${user.payed}</td>
            </tr>`
		);
	}
}

function calculateKontingent(user) {
	if (user.status) {
		if (user.age < 18) {
			return 1000;
		}
		if (user.age >= 18 && user.age < 60) {
			return 1600;
		}
		if (user.age >= 60) {
			return 1200;
		}
	} else {
		return 500;
	}
}

function filterByChanged(event) {
	const selectedValue = event.target.value;
	displayUsersTable(filterBy(selectedValue));
}

function filterBy(filterBy) {
	switch (filterBy) {
		case "all":
			return users;
		case "true":
			return users.filter((user) => user.payed === true);
		case "false":
			return users.filter((user) => user.payed === false);
	}
}
