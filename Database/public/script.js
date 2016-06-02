document.addEventListener('DOMContentLoaded', getWorkouts);

function getWorkouts() {
	document.getElementById('workoutForm').addEventListener('submit', function(event) {	
		event.preventDefault(); //Prevent Page Refresh
		
		var req = new XMLRequest();
		var pParam = "name="+document.getElementById('name').value+
				"&reps="+document.getElementById('reps').value+
				"&weight="+document.getElementById('weight').value+
				"&units="+document.getElementById('units').value+
				"&date="+document.getElementById('date').value;
		req.open('GET', 'http://localhost:3000/insert?' + pParam, true);
		// Asynchronous request return
		req.addEventListener('load', function(){
			if(req.status >= 200 && req.status < 400) {
				var data = JSON.parse(req.responseText);
				addRow(data);
			} else {
				console.log(req.statusText);
			}
		});
		req.send(null);
	});
};

function deleteWorkout() {
	var table = document.getElementById('tbl');
	var req = new XMLRequest();
	req.open('GET', 'http://localhost:3000/delete?id=' + deleteId, true);
	req.addEventListener('load', function() {
		if (req.status >= 200 && req.status < 400) {
			console.log('Deleting row');
			var deleteId = JSON.parse(req.responseText);
			for (var i = 0; i < table.rows.length; i++) {
				var rowId = table.rows[i].getElementById('id').value;
				if (rowId==deleteId) {
					table.deleteRow(i);
				}
			}		
		} else {
			console.log(req.statusText);
		}
	});
	req.send(null);
	}
};


function addRow(data) {
	var table = document.getElementById('workoutTable');
	var newR = table.insertRow(-1);

	var idCell = document.createElement('td');
	idCell.textContent = response.workouts;
	idCell.style.display = 'none';
	newR.appendChild(idCell);	

	var nameCell = document.createElement('td');
	nameCell.textContent = document.getElementById('name').value;
	newR.appendChild(nameCell);

	var repsCell = document.createElement('td');
	repsCell.textContent = document.getElementById('reps').value;
	newR.appendChild(repsCell);
	
	var weightCell = document.createElement('td');
	weightCell.textContent = document.getElementById('weight').value;
	newR.appendChild(weightCell);
	
	var unitsCell = document.createElement('td');
	unitsCell.textContent = document.getElementById('units').value;
	newR.appendChild(unitsCell);

	var dateCell = document.createElement('td');
	dateCell.textContent = document.getElementById('date').value;
	newR.appendChild(dateCell);

	var editCell = document.createElement('td');
	editCell.innerHTML = <input type='button' value='Edit'>;
	newR.appendChild(editCell);

	var deleteCell = document.createElement('td');
	deleteCell.innerHTML = "<input type='button' value='Delete', onclick='deleteWorkout()'>";
	newR.appendChild(deleteCell);
}



/*document.addEventListener('DOMContentLoaded', addWorkout);
function addWorkout() {
	getData();
	document.getElementById('workoutForm').addEventListener('submit', function(e) {
		e.preventDefault();
	
		var req = new XMLHttpRequest();
		var newWorkout = {name: null, reps: null, weight: null, units:null, date:null};
                newWorkout.name = document.getElementById('name').value;
                newWorkout.reps = document.getElementById('reps').value;
                newWorkout.weight = document.getElementById('weight').value;
                newWorkout.units = document.getElementById('units').value;
                newWorkout.date = document.getElementById('date').value;
		
		req.open('POST', 'http://localhost:3000/getall', true);
		req.setRequestHeader('Content-Type', 'application/json');
		req.addEventListener('load', function() {
			if (req.status >= 200 && req.status < 400) {
				getData();
			} else {
				console.log(request.statusText);
			}
		});
		req.send(JSON.stringify(newWorkout));
	});
};*/
