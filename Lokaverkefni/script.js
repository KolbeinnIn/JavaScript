let tonleikar = {}
$.ajax({
  'url': 'http://apis.is/concerts',
  'type': 'GET',
  'dataType': 'json',
  'success': function(response) {
  	for (let i = 0; i < response.results.length; i++) {			
		tonleikar[response.results[i].eventDateName] = {date : response.results[i].dateOfShow, stadur : response.results[i].eventHallName, mynd : response.results[i].imageSource};
	};
      
    let tonleikarKeys = [];
    for (let key in tonleikar){
        tonleikarKeys.push(key);    
    }  
	for (i = 0; i < tonleikarKeys.length; i+=2){
        /*if (i % 2 == 0){
            divider = '';
            divider2 = '';
        }
        
        else if (i % 2 != 0){
            divider = '';
            divider2 = '</div>';
        }*/
        
        //event númer 1
        let key = tonleikarKeys[i]
		let hlutur = tonleikar[key];
		let timi = hlutur.date.split("T");
		let dagsetning = timi[0].split("-");
		let dagsetningin = dagsetning[2]+"-"+dagsetning[1]+"-"+dagsetning[0];
        
        //event númer 2
        let key2 = tonleikarKeys[i+1]
		let hlutur2 = tonleikar[key2];
		let timi2 = hlutur2.date.split("T");
		let dagsetning2 = timi2[0].split("-");
		let dagsetningin2 = dagsetning2[2]+"-"+dagsetning2[1]+"-"+dagsetning2[0];
        
        document.getElementById("syningar").innerHTML +=
        '<div class="ui horizontal segments" id="'+i+'">'+
            //event 1
            '<div id="'+key+'" class="ui segment syning" alt="'+hlutur.stadur+'">\
                <img src='+hlutur.mynd+' />'+
                '<h2>'+key+'</h2>\
                <h3>'+hlutur.stadur+'</h3>\
                <h4>'+dagsetningin+'</h4>\
                <h5>'+timi[1]+'</h5>\
            </div>'+
            //event 2
            '<div id="'+key2+'" class="ui segment syning" alt="'+hlutur2.stadur+'">\
                <img src='+hlutur2.mynd+' />'+
                '<h2>'+key2+'</h2>\
                <h3>'+hlutur2.stadur+'</h3>\
                <h4>'+dagsetningin2+'</h4>\
                <h5>'+timi2[1]+'</h5>\
            </div>\
        </div>';
    }
  }
});
//document.getElementById("syningar").innerHTML +='<div id="'+key+'" class="syning " alt="'+hlutur.stadur+'"><img src='+hlutur.mynd+' />'+'<h2>'+key+'</h2><h3>'+hlutur.stadur+'</h3><h4>'+dagsetningin+'</h4><h6>'+timi[1]+'</h6></div>';

function leita(){
    //let divtag = document.getElementsById("syningar");
    
    let divtag = document.getElementById("syningar");
    let list = divtag.getElementsByTagName("div");
    let syningarnar;
    let text = document.getElementById("search");
    let filter = text.value.toLowerCase();
    for (i = 0; i < list.length; i++){
        if (i % 3 != 0){
            if (list[i].id.toLowerCase().indexOf(filter)){
                list[i].style.display = "none";
            }
            else{
                list[i].style.display = "";
            }
        }
    }
    //let syningarnar = horiz.getElementsByTagName('div');
    
    //console.log(divtag);
    //console.log(syningarnar);
    
    for (let i = 0; i< syningarnar.length; i++){
        if (syningarnar[i].id.toLowerCase().indexOf(filter)){
            console.log(syningarnar[i]);
        }
        else {
            syningarnar[i].style.display = "";
        }

    };
}

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