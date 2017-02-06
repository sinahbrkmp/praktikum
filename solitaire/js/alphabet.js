/**
 * Author: Francisco Laguna
 */
define('alphabet', function () {
	var Alphabet = {
		numberForLetter: function(letter) {
			if (!this.isLetter(letter)) {
				throw(letter + ' does not look like a letter');
			}
			letter = letter.toUpperCase();
			return letter.codePointAt(0) - "A".codePointAt(0) + 1;
		},
		letterForNumber: function (number) {
			if (number < 1 || number > 26) {
				throw("Number must be between 1 and 26");
			}
			return String.fromCodePoint("A".codePointAt(0) + number - 1).toUpperCase();
		},
		isLetter: function(letter) {
			if (letter.length !== 1) {
				throw("Please use only strings of length 1: " + letter);
			}
			return !!(/[a-zA-Z]/.test(letter));
		}
	};


	return Alphabet;
});