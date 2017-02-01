define('encryption', ['alphabet'], function (alphabet) {
	// TODO: Mit Hilfe des Schlüssels ver- und entschlüsseln, bitte
	// alphabet.numberForLetter(buchstabe) liefert die Stelle 
	// im Alphabet für den Buchstaben
	// alphabet.letterForNumber(nummer) liefert den Buchstaben für 
	// die passende Stelle
	// 

	return {
		encrypt: function(message, key) {
			var j = 0 
            var xmessage = ""
			for (var i=0; i<message.length; i++) {
				var zahlM = alphabet.numberForLetter(message[i])
				var zahlK = alphabet.numberForLetter(key[j])
				var zahl = zahlM+zahlK
				if (zahl > 26) {
					zahl = zahl-26
				}
				var buchstabe = alphabet.letterForNumber(zahl)
				xmessage = xmessage+buchstabe
				if (j+1>=key.length) {
					j = 0 
				} else {
					j = j+1
				}
			}

			return xmessage;
		},
		decrypt: function(message, key) {
			var j = 0
            xmessage = ""
			for (var i=0;i<message.length;i++) {
				var zahlM = alphabet.numberForLetter(message[i])
				var zahlK = alphabet.numberForLetter(key[j])
				var zahl = zahlM - zahlK
				if (zahl < 1 ) {
					zahl = zahl + 26
				}
				var buchstabe = alphabet.letterForNumber(zahl)
				xmessage = xmessage + buchstabe
				if (j+1 >= key.length){
					j=0
				} else {
					j = j+1
				}

			}
			console.log (xmessage)
			return xmessage;
		}
	}
});