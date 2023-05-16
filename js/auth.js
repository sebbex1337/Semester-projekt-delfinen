function initAuth() {
	const user = localStorage.getItem("authUser");

	if (user) {
		userIsSignedIn();
	} else {
		userIsSignedOut();
	}
}

function userIsSignedIn() {
    
}
