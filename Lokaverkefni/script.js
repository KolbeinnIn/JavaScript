let tonleikar = {}
$.ajax({
  'url': 'https://apis.is/concerts',
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

function containsObject(obj, array) {
    for (i = 0; i < array.length; i++) {
        if (array[i] === obj) {
            return true;
        }
    }
    return false;
}


function leita(){
    //let divtag = document.getElementsById("syningar");
    
    let divtag = document.getElementById("syningar");
    let list = divtag.getElementsByTagName("div");
    let text = document.getElementById("search");
    let filter = text.value.toLowerCase();
    let asd = list[0].getElementsByTagName("div");
    let temp = [];
    for (i = 0; i < list.length; i++){ //fer í gegnum lista sem geymir ÖLL div tög innan <div class="ui segment" id=syningar>
        asd = list[i].getElementsByTagName("div");
        if (i % 3 != 0){ //þriðja hvert div tag er ui horizontal segment sem fer utan um tvo viðburði
            if (list[i].id.toLowerCase().indexOf(filter)){
                list[i].style.display = "none";
            }
            else{
                list[i].style.display = "";
            }
        }
        else{ //allt í þessu else er til að fjarlægja litlu línurnar sem koma þegar horizontal segment er tómt (borderinn)
            let teljari = 0;
            for (j = 0; j < asd.length; j++){
                if (filter != ""){ //þessi if setning er til að koma í veg fyrir skrýtið bug þegar strokað er út úr leitar kassanum en allir viðburðirnir koma ekki aftur
                    if (teljari <= 2){
                        if (asd[j].style.display == "none"){
                            teljari += 1;
                        }
                    }
                    if (teljari >= 2){
                        list[i].style.display = "none"
                    }
                    else{
                        list[i].style.display = "";
                    }
                }
                else{
                    list[i].style.display = "";
                }
            }
            
        }
    }
}

function stadsetning(){
	let divtag = document.getElementById("syningar");
    let list = divtag.getElementsByTagName("div");
	let stadur = document.getElementById("stadur");
	let stadur_value = stadur.value.toLowerCase();
	let asd = list[0].getElementsByTagName("div");
    let temp = [];
    for (i = 0; i < list.length; i++){ //fer í gegnum lista sem geymir ÖLL div tög innan <div class="ui segment" id=syningar>
        asd = list[i].getElementsByTagName("div");
        if (i % 3 != 0){ //þriðja hvert div tag er ui horizontal segment sem fer utan um tvo viðburði
            h3 = list[i].getElementsByTagName('h3')[0]
			if (h3.innerHTML.toLowerCase().indexOf(stadur_value)){
                list[i].style.display = "none";
            }
            else{
                list[i].style.display = "";
            }
        }
        else{ //allt í þessu else er til að fjarlægja litlu línurnar sem koma þegar horizontal segment er tómt (borderinn)
            let teljari = 0;
            for (j = 0; j < asd.length; j++){
                if (stadur_value != ""){ //þessi if setning er til að koma í veg fyrir skrýtið bug þegar strokað er út úr leitar kassanum en allir viðburðirnir koma ekki aftur
                    if (teljari <= 2){
                        if (asd[j].style.display == "none"){
                            teljari += 1;
                        }
                    }
                    if (teljari >= 2){
                        list[i].style.display = "none"
                    }
                    else{
                        list[i].style.display = "";
                    }
                }
                else{
                    list[i].style.display = "";
                }
            }
            
        }
    }
}
