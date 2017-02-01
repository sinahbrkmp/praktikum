/**
* Author: Sina Haberkamp
*/
define('encryption', ['alphabet'], function (alphabet) {
	// TODO: ROT-13, bitte
	// alphabet.numberForLetter(buchstabe) liefert die Stelle 
	// im Alphabet für den Buchstaben
	// alphabet.letterForNumber(nummer) liefert den Buchstaben für 
	// die passende Stelle
	// 

	return {
		encrypt: function(message) {

            var xmessage = ""
           
            for ( var i=0; i<message.length; i++) { 

            	var zahl = alphabet.numberForLetter(message[i])
                zahl = zahl +13 
                if (zahl>26){
                	zahl=zahl-26 
                }
                var buchstabe = alphabet.letterForNumber(zahl)
                xmessage= xmessage+buchstabe
                
            } 

			return xmessage;
		},
		decrypt: function(message) {

			var xmessage = ""
           
            for ( var i=0; i<message.length; i++) { 

            	var zahl = alphabet.numberForLetter(message[i])
                zahl = zahl +13 
                if (zahl>26){
                	zahl=zahl-26 
                }
                var buchstabe = alphabet.letterForNumber(zahl)
                xmessage= xmessage+buchstabe
                
            } 

			return xmessage;
		}
	}
});

