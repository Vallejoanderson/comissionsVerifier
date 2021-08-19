const btn = document.getElementById('button');
const coincidencesbox = document.querySelector('.coincidences');
const notrecognised = document.querySelector('.notrecognised');
const notmade = document.querySelector('.notmade');

btn.addEventListener('click', function(){
	removeChildren();
	generateOrdersarray(coincidencesbox);
});

function removeChildren(){ /* Remove children to prevent repetion in the boxes when the user click twice on the button */
	while(coincidencesbox.firstChild){ 
		coincidencesbox.removeChild(coincidencesbox.lastChild);
	}
	while(notrecognised.firstChild){
		notrecognised.removeChild(notrecognised.firstChild);
	}
	while(notmade.firstChild){
		notmade.removeChild(notmade.firstChild);
	}
}

function generateOrdersarray(){ // Use two arrays and find coincidences between them
	const regex = /\b\d{6}\b/g;
	let notes = document.getElementById('notes').value; 	//  First textrarea
	let report = document.getElementById('report').value; // 	Second textarea
	let systemOrders = report.match(regex);								// [Second array] from matches in the first textarea
	let notfoundinSystem = [];
	let notfoundinOrders = [];															// Array from items existing in First and Second Array
	let coincidences = [];	
	let myOrders = [];										// Regular expression to extract values from Second Array
	myOrders = notes.match(regex);									// [First array] from matches in the first textarea
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
	showCoincidences(coincidences);
	shownotrecognised(notfoundinSystem);
	shownotmade(notfoundinOrders);
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

function shownotrecognised(coincidences){
	for(let i = 0; i < coincidences.length; i++){
		const item = document.createElement('p');
		item.textContent = coincidences[i];
		item.classList.add("order");
		item.classList.add("order--state-notexists");
	  notrecognised.appendChild(item);
	}
}

function shownotmade(coincidences){
	for(let i = 0; i < coincidences.length; i++){
		const item = document.createElement('p');
		item.textContent = coincidences[i];
		item.classList.add("order");
		item.classList.add("order--state-notexists");
	  notmade.appendChild(item);
	}
}