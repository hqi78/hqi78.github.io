function poll() {
	var ans = prompt("What's Your favorite flavor of ice cream?");
	document.getElementById("yourresponse").innerHTML = "Your response: <br/>" + ans;
	document.getElementById("pastresponses").innerHTML += (ans + ", ");
}
