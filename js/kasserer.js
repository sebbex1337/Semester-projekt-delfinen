import { getUsers } from "./REST.js";

window.addEventListener("load", initApp);
let users = [];

function initApp() {
	updateUsersArr();
}

async function updateUsersArr() {
	users = await getUsers();
	displayExpectedQuota(users);
	displayNumbersinTable(users);
	displayCumulatedKontingent(users);
	displayMissingQuota(users);
}

function displayNumbersinTable(listOfUsers) {
	let numOfJunior = 0;
	let numOfSenior = 0;
	let numOfSeniorPlus = 0;
	let numOfPassive = 0;

	for (const user of listOfUsers) {
		if (user.status) {
			if (user.age < 18) {
				numOfJunior++;
			}
			if (user.age >= 18) {
				numOfSenior++;
			}
			if (user.age >= 60) {
				numOfSeniorPlus++;
			}
		} else {
			numOfPassive++;
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
		if (user.status) {
			if (user.age < 18) {
				junior += 1000;
			}
			if (user.age >= 18) {
				senior += 1600;
			}
			if (user.age >= 60) {
				seniorPlus += 1200;
			}
		} else {
			passive += 500;
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
		// Check if passive membership
		if (user.status) {
			if (user.age < 18) {
				sum += 1000;
			}
			if (user.age >= 18) {
				sum += 1600;
			}
			if (user.age >= 60) {
				sum += 1200;
			}
		} else {
			sum += 500;
		}
	}
	document.querySelector("#forventet-kontingent").textContent = sum + " kr";
}

// TODO: Missing payment display
function displayMissingQuota(listOfUsers) {
	let sum = 0;

	for (const user of listOfUsers) {
		if (!user.payed) {
			if (user.status) {
				if (user.age < 18) {
					sum += 1000;
				}
				if (user.age >= 18) {
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
	document.querySelector("#manglende-kontingent").textContent = sum + " kr";
}
