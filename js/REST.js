"use strict";

const ENDPOINT = "https://semester-projekt-36e87-default-rtdb.europe-west1.firebasedatabase.app/";

/* CRUD functions for getting users from firebase */

async function getUsers() {
	const response = await fetch(`${ENDPOINT}/members.json`);
	const data = await response.json();
	const users = prepareUsersData(data);
	return users;
}

function prepareUsersData(DataObject) {
	const newData = [];
	for (const key in DataObject) {
		const user = DataObject[key];
		user.id = key;
		newData.push(user);
	}
	return newData;
}

async function createUser(name, mail, age, discipliner, status, role, payed) {
	const newUser = { name, mail, age, discipliner, status, role, payed };
	const userAsJson = JSON.stringify(newUser);
	const response = await fetch(`${ENDPOINT}/members.json`, {
		method: "POST",
		body: userAsJson,
	});
	return response;
}

async function updateUser(id, name, mail, age, discipliner, status, role, trainingDate, trainingLength, trainingResult, tournament, tournamentDate, tournamentResult, tournamentLength, favorite, payed) {
	const userToUpdate = { name, mail, age, discipliner, status, role, trainingDate, trainingLength, trainingResult, tournament, tournamentDate, tournamentResult, tournamentLength, favorite, payed };
	const userAsJson = JSON.stringify(userToUpdate);
	const response = await fetch(`${ENDPOINT}/members/${id}.json`, {
		method: "PUT",
		body: userAsJson,
	});
	return response;
}

async function deleteUser(id) {
	const response = await fetch(`${ENDPOINT}/members/${id}.json`, { method: "DELETE" });
	return response;
}

export { getUsers, createUser, deleteUser, updateUser };
