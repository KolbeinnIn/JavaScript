//pizza dæmi function constructor

function pizza(alegg,staerd,verd){
	this.alegg = alegg;
    this.staerd = staerd;
	this.verd = verd;
	
    this.strengur = function (){
        let s = "";
        for (let i=0; i < this.alegg.length;i++){
            s = s + this.alegg[i] + ",";
        };
		return s;
    }
	this.uppl = function (){
		return this.staerd + "("+this.strengur()+") verð: " + String(this.verd);
	}
}