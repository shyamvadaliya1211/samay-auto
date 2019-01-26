function addValue() {

	var i = 0;
	var y =	document.getElementById('number').value;
	y = parseInt(y);

	var num = function() {	
		
		i += 1;

		console.log(i);

		if (i < y) {			
			num();
		}		
	}


	//
	num();

}










































    // var value = document.getElementById('number').value;
    // console.log(value);
    // value++ ;
    // document.getElementById('number').value = value;



// var y = document.getElementById('number').value;
// console.log(y.value);
// document.getElementById('demo').innerHTML = y;




// var y = document.getElementById('number').value;
// var result = [];
// for (var i = 1; i <= y; i++)
// result.push(i);
// document.getElementById('demo').innerHTML = result;









