/**
 * Author: Francisco Laguna
 */
define('app', ['encryption', 'alphabet'], function(encryption, alphabet) {
	'use strict';
	function clean(message) {
		var cleaned = "";
		for(var i = 0; i < message.length; i++) {
			var letter = message.charAt(i);
			if (alphabet.isLetter(letter)) {
				cleaned += letter.toUpperCase();
			}
		}
		return cleaned;
	}

	function splitIntoCharacterGroups(message) {
		var splitMessage = "";
		for(var i = 0; i < message.length; i++) {
			if (i > 0 && (i % 5 === 0)) {
				splitMessage += ' ';
			}
			splitMessage += message[i];
		}
		return splitMessage;
	}

	var app = new Vue({
		el: '#app',
		data: {
			message: '',
			processedMessage: ''
		},
		methods: {
			encrypt: function () {
				var message = clean(this.message);
				while (message.length % 5 != 0) {
					message += "X";
				}
				this.processedMessage = splitIntoCharacterGroups(encryption.encrypt(message));
				return false;
			},
			decrypt: function () {
				this.processedMessage = splitIntoCharacterGroups(encryption.decrypt(clean(this.message)));
				return false;
			}
		}
	});
});