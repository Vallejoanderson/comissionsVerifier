const btn = document.getElementById('button');
const coincidencesbox = document.querySelector('.coincidences');

btn.addEventListener('click', function(){
	generateOrdersarray();
});

function generateOrdersarray(){ // Use two arrays and find coincidences between them
	let notes = document.getElementById('notes').value; 	//  First textrarea
	let report = document.getElementById('report').value; // 	Second textarea
	const regex = /\b\d{5}\b/g;
	let myOrders = [];										// Regular expression to extract values from Second Array
	myOrders = notes.match(regex);										// [First array] from matches in the first textarea
	let systemOrders = report.match(regex);								// [Second array] from matches in the first textarea
	console.log(myOrders);		
	console.log(systemOrders);
	let coincidences = [];	
	let notfoundinSystem = [];
	let notfoundinOrders = [];															// Array from items existing in First and Second Array
	notfoundinSystem = myOrders.filter( function( el ) { // Array from items existing in First Array but not in Second Array
  	return systemOrders.indexOf( el ) < 0;
} );
  notfoundinOrders = systemOrders.filter( function( el ) { // Array from items existing in Second Array but not in First Array
  	return myOrders.indexOf( el ) < 0;
	} );
	for( let i = 0; i < myOrders.length; i++){								
		if( systemOrders.indexOf(myOrders[i]) > -1) {
			coincidences.push(myOrders[i]);
		}
	}
	console.log(coincidences);
	console.log(notfoundinSystem);		
	console.log(notfoundinOrders);			// [Third array] which contains coincidences between first array and second array
	showCoincidences(coincidences);
}

function showCoincidences(coincidences){
	for(let i = 0; i < coincidences.length; i++){
		const item = document.createElement('p');
		item.textContent = coincidences[i];
		item.classList.add("order");
		item.classList.add("order--state-exists");
	  coincidencesbox.appendChild(item);
	}
}



