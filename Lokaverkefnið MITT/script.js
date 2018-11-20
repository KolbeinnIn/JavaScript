let tonleikar = {}
$.ajax({
  'url': 'http://apis.is/concerts',
  'type': 'GET',
  'dataType': 'json',
  'success': function(response) {
  	for (let i = 0; i < response.results.length; i++) {			
		tonleikar[response.results[i].eventDateName] = {date : response.results[i].dateOfShow, stadur : response.results[i].eventHallName, mynd : response.results[i].imageSource};
	};
    let teljari = 0;
    let divider = '';
    let divider2 = '';
	for (let key in tonleikar){
        if (teljari % 2 == 0){
            divider = '<div class="ui horizontal segments">';
            divider2 = '';
        }
        if (teljari % 2 == 1){
            divider = '';
            divider2 = '</div>';
        }
		let hlutur = tonleikar[key]
		let timi = hlutur.date.split("T");
		let dagsetning = timi[0].split("-")
		let dagsetningin = dagsetning[2]+"-"+dagsetning[1]+"-"+dagsetning[0]
        document.getElementById("syningar").innerHTML +=
        divider+'<div id="'+key+'" class="ui segment" asd="'+teljari+'" alt="'+hlutur.stadur+'">\
            <img src='+hlutur.mynd+' />'+
            '<h2>'+key+'</h2>\
            <h3>'+hlutur.stadur+'</h3>\
            <h4>'+dagsetningin+'</h4>\
            <h5>'+timi[1]+'</h5>\
            </div>'+divider2;
        teljari++;
    }
  }
});

function leita(){
		let divtag = document.getElementById("syningar");
		let syningarnar = divtag.getElementsByTagName('div');
		let text = document.getElementById("search");
		let filter = text.value.toLowerCase();
		for (let i = 0; i< syningarnar.length; i++){
			if (syningarnar[i].id.toLowerCase().indexOf(filter)){
				syningarnar[i].style.display = "none";
			}
			else {
				syningarnar[i].style.display = "";
			}
			
		};
	};
function stadsetning(){
	let divtag = document.getElementById("syningar");
	let syningarnar = divtag.getElementsByTagName('div');
	let stadur = document.getElementById("stadur");
	let stadur_value = stadur.value.toLowerCase();
	for (let i = 0; i< syningarnar.length; i++){
			h3 = syningarnar[i].getElementsByTagName('h3')[0]
			if (h3.innerHTML.toLowerCase().indexOf(stadur_value)){
				syningarnar[i].style.display = "none";
			}
			else {
				syningarnar[i].style.display = "";
			}
		};
}