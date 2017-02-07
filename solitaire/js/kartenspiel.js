/**
* Author: Sina Haberkamp
*/
define('kartenspiel', function () {
	//var Kartenspiel = function ... 



var Kartenspiel = function (karten) {
	  if (karten) {
    	this.karten = karten;
    } else {
			    this.karten = []
          // Ein Kartenspiel abschreiben
          for ( var i= 1 ; i<14 ;i++){
          	this.karten.push(['C',i]) 
          }
          for ( var i= 1 ; i<14 ;i++){
          	this.karten.push(['S',i]) 
          }
          for ( var i= 1 ; i<14 ;i++){
          	this.karten.push(['D',i]) 
          }
          for ( var i= 1 ; i<14 ;i++){
          	this.karten.push(['H',i]) 
          }
          this.karten.push(['J',1])
          this.karten.push(['J',2])
    }
    
    var karten2 = this.karten
    
		
		// Bewegt die Karte von startPosition(Joker1/2-   Position) an die endPosition
    // Die anderen Karten rücken auf
	  this.bewege = function (startPosition, endPosition)     { 
      if (startPosition<endPosition) {
        var kartenListe = []
        for (var j=0;j<startPosition;j++){
        kartenListe.push(this.karten[j]);
        };  
        var z = this.karten[startPosition]
        for (var j=startPosition+1;
        j<=endPosition;j++) {
        kartenListe.push(this.karten[j]);      
        };   
        kartenListe.push(z);
        for (var j=endPosition+1; j<this.karten.length; j++){
        kartenListe.push(this.karten[j]);
        };  
        this.karten = kartenListe;
      }else {
        var kartenListe = []
        for (var j=this.karten.length-1; j>startPosition ; j--) {
        kartenListe.unshift(this.karten[j]);
        };
        var z = this.karten[startPosition]
        for (var j=startPosition-1; j>=endPosition; j--){
        kartenListe.unshift(this.karten[j])
        };
        kartenListe.unshift(z);
        for (var j=endPosition-1; j>=0; j--){
        kartenListe.unshift(this.karten[j])
        };
        this.karten = kartenListe;
      }
	  };  
    
	  
		// Führt ein dreifachabheben durch
    // Behält die letzte Karte
    //pos1(Joker1)
    this.dreifachAbheben = function(pos1, pos2) {
      var kartenreihe = []
    	for ( var i=pos2; i<this.karten.length ; i++ ){
      kartenreihe.push(this.karten[i])
      };
      for (var i=pos1; i<pos2; i++) {
      kartenreihe.push(this.karten[i])
      };
      for (var i=0; i<pos1; i++) {
      kartenreihe.push(this.karten[i])
      };
      this.karten = kartenreihe
    };
    
    
    
    // an pos wird abgehoben
    this.abheben = function(pos) {
   	 var kartenliste = []
   	 for (var i=pos; i<this.karten.length; i++){
 		 kartenliste.push(this.karten[i])   
   	 };
     for (var i=0; i<pos;i++){
     kartenliste.push(this.karten[i])
     };
     this.karten = kartenliste
    };
	  
    
		// Findet die Position einer Karte
    //bild = herz/pik usw.
    //zahl 1-13
		this.findeKarte = function (bild,zahl) {
      for (var  i=0 ; i<this.karten.length; i++) {
       if ( bild === this.karten[i][0] ) {
        if (zahl === this.karten[i][1]){
        return i;
        }
       }
      }
    };
		
		// Liefert die Karte an der gegebenen Position
    this.karteAnPosition = function(pos) {
      var karte = this.karten[pos]
      return karte;
    };
	
		// Gibt die nächste Schlüsselzahl aus
		// Durchläuft dafür den Solitaire Algorithmus
    this.naechsteZahl  = function () {
    	this.JokerVerschieben ();
      var PosJ1 = this.findeKarte('J',1)
      var PosJ2 = this.findeKarte('J',2)
      if ( PosJ1 < PosJ2 ) {
      	this.dreifachAbheben(PosJ1,PosJ2);
      }else {
      	this.dreifachAbheben(PosJ2,PosJ1);
      };
      this.zaehlabheben();
      var ausgabenkarte = this.karten[0]
      if (ausgabenkarte[0] === 'J') {
      	return this.naechsteZahl();
      }
      var schluessel = this.karten[wertVonKarte(ausgabenkarte[0],ausgabenkarte[1])-1]
			var schluesselzahl = wertVonKarte(schluessel[0],schluessel[1])
      return schluesselzahl;
    } ;
    
    
    // Überprüft ob die arrays gleich sind 
    this.istGleich = function(andereKarten) {
    	if (andereKarten.length === this.karten.length) {
      	for (var i=0; i<andereKarten.length; i++){
        	if (this.karten[i][0] === andereKarten[i][0] && this.karten[i][1] === andereKarten[i][1]) {
          	return true;
          }else {
          	return false;
          } 
        }		
      } else {
      		return false;
    	  }
    }
    
    
    
    // führt das Zählabheben durch 
	  this.zaehlabheben = function () {
      var untersteK = this.karten[this.karten.length-1]
      if (untersteK[0] === 'J') {
      	return ;
      } else {
     	 	var zaehlen = wertVonKarte(untersteK[0],untersteK[1]) 
      	this.abheben(zaehlen);  
     	  var P = this.findeKarte(untersteK[0],untersteK[1]);
    	  this.bewege(P,this.karten.length-1);
      }
		};
    
    
    
    
    //Gibt das Kartenspiel aus 
    this.ausgeben = function () {
    		console.log(this.karten);
    };
    
    
    //Joker verschieben
    this.JokerVerschieben = function () {
    	var PosJ1 = this.findeKarte('J',1)
      if (PosJ1 === this.karten.length-1) {
      	this.bewege(PosJ1, 1)
      } else {
      		this.bewege(PosJ1, PosJ1+1);
        };
      var PosJ2 = this.findeKarte ('J',2)
      if (PosJ2 === this.karten.length-1) {
      	this.bewege(PosJ2 , 2)
      } else if (PosJ2 === this.karten.length-2) {
      		this.bewege(PosJ2, 1)
        } else {
        	this.bewege(PosJ2, PosJ2+2)
        };
      
    };

   



    //Kartenspiel mischen 
    this.mischen  = function (seed){
    	var helfer = 3
    	for ( var i=0 ; i<5 ; i++) {
    		var x = (seed^helfer) % 54 	
    		var y = (seed * helfer) % 54
    		helfer = helfer + 1	
    		var gesp = this.karten[x]
    		this.karten[x] = this.karten[y]
    		this.karten[y] = gesp 
    	}
 
    }

}


// karte = ['S', 12]
// kreuz (C)- karo(D) - herz(H) - pik(S)
// joker = 0 
var wertVonKarte = function (bild,zahl) {
 switch (bild) {
    case 'C': return zahl;
    case 'D': return 13+zahl;
    case 'H': return 26+zahl;
    case 'S': return 39+zahl;
    case 'J': return 53 ;
  }
}



/*
var kartenspiel = new Kartenspiel([['C', 1], ['C', 2], ['C', 3], ['C', 4], ['C',5]]);
console.log(kartenspiel.istGleich([['C', 1], ['C', 2], ['C', 3], ['C', 4], ['C',5]]))
console.log(kartenspiel.istGleich([['C', 7], ['C', 2], ['C', 3], ['C', 4], ['C',5]]))
*/


//Überprüfung der bewege Funktion
/*
var kartenspiel = new Kartenspiel()
var karte = kartenspiel.karteAnPosition(4)
kartenspiel.bewege(4,2);
var position = kartenspiel.findeKarte(karte[0], karte[1]);
if (position === 2) {
	console.log("Alles richtig");
} else {
  console.log("Karte sollte bei 2 liegen, liegt aber bei ", position);
  kartenspiel.ausgeben();
} 

var karte = kartenspiel.karteAnPosition(2)
kartenspiel.bewege(2,4);
var position = kartenspiel.findeKarte(karte[0], karte[1]);
if (position === 4) {
	console.log("Alles richtig");
} else {
  console.log("Karte sollte bei 4 liegen, liegt aber bei ", position);
  kartenspiel.ausgeben();
}
*/


//Überprüfung der Abheben Funktion 
/*
kartenspiel = new Kartenspiel([['C', 1], ['C', 2], ['C', 3], ['C', 4], ['C',5]])
kartenspiel.abheben(3);
// [4,5,1,2,3]
if (kartenspiel.istGleich([['C', 4], ['C', 5], ['C', 1], ['C', 2], ['C', 1]])) {
	console.log("Alles richtig");
} else {
  console.log("Hier stimmt was nicht. Das sollte 4,5,1,2,3 sein");
  kartenspiel.ausgeben();
}
*/

//Überprüfen der dreifachAbheben Funktion  
/*
kartenspiel = new Kartenspiel([['C', 1], ['C', 2], ['C', 3], ['C', 4], ['C',5],['C',6],['C',7]])
kartenspiel.dreifachAbheben(3,5);
if (kartenspiel.istGleich([['C', 6], ['C', 7], ['C', 3], ['C', 4], ['C', 5],['C',1],['C',2]])) {
	console.log("Alles richtig");
} else {
  console.log("Hier stimmt was nicht. Das sollte 6,7,3,4,5,1,2,sein");
  kartenspiel.ausgeben();
}
*/


//Überprüft die zählabheben Funktion 
/*
kartenspiel = new Kartenspiel([ ['C', 2], ['C', 1], ['C', 4], ['C',5],['C',6],['C',7],['C', 3]])
kartenspiel.zaehlabheben();
if (kartenspiel.istGleich([ ['C', 5], ['C', 6], ['C', 7],['C',2],['C',1],['C', 4],['C', 3]])) {
	console.log("Alles richtig");
} else {
  console.log("Hier stimmt was nicht. Das sollte 5,6,7,2,1,4,3sein");
  kartenspiel.ausgeben();
}
*/

//Überprüft die JokerVerschieben Funktion 
/*
kartenspiel = new Kartenspiel ([['C', 1], ['C', 2],['C',7], ['C', 3], ['C', 4],['J',1], ['C',5],['J',2],['C',6]])
kartenspiel.JokerVerschieben();
if (kartenspiel.istGleich([['C', 1], ['C', 2], ['C', 3],['J',1] ,['C', 4], ['C', 5],['C',6],['J',2 ],['C',7]])) {
	console.log("Alles richtig");
} else {
  console.log("Hier stimmt was nicht. ");
  kartenspiel.ausgeben();
}
*/


//var kartenspiel = new Kartenspiel ()
//for (var i=0 ; i<=10;i++){
//console.log (kartenspiel.naechsteZahl())
//}




	return Kartenspiel;
});

