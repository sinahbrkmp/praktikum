/**
* Author: Sina Haberkamp
*/
define('encryption', ['alphabet', 'kartenspiel'], function (alphabet, Kartenspiel) {

	return {
		encrypt: function(message) {
			// Lege ein Kartenspiel an
			// Addiere zu jedem Buchstaben die jeweils nächste Zahl aus dem Kartenspiel
			// zum verschluesseln

			var kartenspiel = new Kartenspiel ()
			var xmessage = ""
			for ( var i=0; i<message.length ; i++) {
				var zahlK = kartenspiel.naechsteZahl()
                var zahlM = alphabet.numberForLetter(message[i])
                var zahl = zahlK+zahlM
                console.log(zahl)
                if (zahl > 52 ) {
                	zahl=zahl-52 
                } else if (zahl>26){
                	zahl = zahl - 26
                }

                var buchstabe = alphabet.letterForNumber(zahl)
                xmessage = xmessage+buchstabe
                console.log (buchstabe)
			}
			return xmessage;


		},
		decrypt: function(message) {
			// Das ganze Rückwärts :)	

			var xmessage = ""
			var kartenspiel = new Kartenspiel ()
			for ( var i=0; i<message.length ; i++) {
				var zahlK = kartenspiel.naechsteZahl()
				var zahlM = alphabet.numberForLetter(message[i])	
				var zahl = zahlM - zahlK
				console.log(zahl)
				if (zahl < -26 ) {
					zahl= zahl +52
				} else if (zahl<1){
					zahl = zahl + 26
				}
				var buchstabe = alphabet.letterForNumber(zahl)
				xmessage =  xmessage+buchstabe
				console.log (buchstabe)
			}
			return xmessage; 
		}
	}
} );