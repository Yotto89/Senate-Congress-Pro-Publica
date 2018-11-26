var members = data.results[0].members;
var checkboxes = document.querySelectorAll('input[type=checkbox]');
var checkedCheckboxes = document.querySelectorAll('input[type=checkbox]:checked');


// Función tabla//
function createTable(object) {
	var tableBody = document.getElementById("house-data");
	tableBody.innerHTML = "";
	for (var i = 0; i < object.length; i++) {

		var tableRow = document.createElement("tr");
		var firstName = object[i].first_name;
		var middleName = object[i].middle_name;

		if (middleName === null) {
			middleName = "";
		}
		var lastName = object[i].last_name;
		var completeName = firstName + " " + middleName + " " + lastName;
		var link = document.createElement("a");
		link.setAttribute("href", object[i].url);
		link.innerHTML = completeName;
		var party = object[i].party;
		var state = object[i].state;
		var seniority = object[i].seniority;
		var votesParty = object[i].votes_with_party_pct + "% ";
		var cells = [link, party, state, seniority, votesParty];

		for (var j = 0; j < cells.length; j++) {
			var tableCell = document.createElement("td");
			tableCell.append(cells[j]);
			tableRow.append(tableCell);
		}
		document.getElementById("house-data").append(tableRow);
	}
}

createTable(members);

// Filter Checkboxes//
var checkbox = document.getElementsByTagName("input");

for (var i = 0; i < checkbox.length; i++) {
	checkbox[i].addEventListener("click", filter);
}
document.getElementById("dropdown").addEventListener("change", filter);

//Push lista vacia//

function filter() {
	var arrayCheck = [];
	var aMember = [];
	var selecState = document.getElementById("dropdown").value;
	for (var i = 0; i < checkbox.length; i++) {
		if (checkbox[i].checked) //especificar el valor de cada checkbox R D I //
		{
			arrayCheck.push(checkbox[i].value);
		}
	}
	console.log (aMember);
	if (arrayCheck.length == 0 && selecState == "All") {
		aMember = members;
	}
	if (arrayCheck.length == 0 && selecState !== "All") {
		for (var k = 0; k < members.length; k++) {
			var stateFilter = members[k].state == selecState || selecState == "All";
			if (stateFilter) {
				aMember.push(members[k]);
			}
		}
	} else {
		for (var k = 0; k < members.length; k++) {
			for (i = 0; i < arrayCheck.length; i++) {
				var partyFilter = arrayCheck[i] == members[k].party;
				var stateFilter = members[k].state == selecState || selecState == "All";
				console.log(selecState);
				console.log(stateFilter);
				if (partyFilter && stateFilter) {
					aMember.push(members[k]);
				}
			}
		}
	}
	console.log(arrayCheck);
	console.log(selecState);
	document.getElementById("house-data").innerHTML = "";
	createTable(aMember); //Borra tabla y genera de nuevo con el valor asignado de la función//
}
//Estados (vacios)//

function fillArray(st1) {
	var states = [];
	for (var i = 0; i < st1.length; i++) {
		states.push(st1[i].state)
	}
	states.sort();
	return states;
}
var states = fillArray(members);

//Estados repetidos//

function compareArray(str) {
	var statesResult = [str[0]];
	for (var j = 1; j < str.length; j++) {
		if (str[j] != statesResult[statesResult.length - 1]) {
			statesResult.push(str[j]);
		}
	}
	return statesResult;
}
var statesResult = compareArray(states);
console.log(statesResult);

//Dropdown estados//

function state_fun(st) {
	var select = document.getElementById("dropdown");
	for (var i = 0; i < st.length; i++) {
		var option = document.createElement("option");
		option.innerHTML = st[i];
		option.setAttribute("class", st[i].state);
		select.appendChild(option);
	}
}
state_fun(statesResult); //ejecutamos la funcion llamandola//
