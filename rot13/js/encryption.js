define('encryption', ['alphabet'], function (alphabet) {
	// TODO: ROT-13, bitte
	// alphabet.numberForLetter(buchstabe) liefert die Stelle 
	// im Alphabet für den Buchstaben
	// alphabet.letterForNumber(nummer) liefert den Buchstaben für 
	// die passende Stelle
	// 

	return {
		encrypt: function(message) {
			return message;
		},
		decrypt: function(message) {
			return message;
		}
	}
});