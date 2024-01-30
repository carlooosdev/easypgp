var generateKeyButton = document.getElementById('generate-key');
        var encryptButton = document.getElementById('encrypt');
        var decryptButton = document.getElementById('decrypt');
        var title = document.getElementById('title');
        var privateKeyTextArea = document.getElementById('private-key');
        var publicKeyTextArea = document.getElementById('public-key');
        var passphraseInput = document.getElementById('passphrase');
        
        function setActiveButton(button) {
            generateKeyButton.classList.remove('active');
            encryptButton.classList.remove('active');
            decryptButton.classList.remove('active');
            button.classList.add('active');
        }
        
        function setStatusMessage(message) {
            title.innerText = message;
        }
        
        function handleEncryption() {
            var publicKey = publicKeyTextArea.value;
            var plaintext = document.getElementById('input-text').value;
            var passphrase = passphraseInput.value;
            
            var pgpOptions = {
                message: openpgp.message.fromText(plaintext),
                publicKeys: openpgp.key.readArmored(publicKey).keys
            };

            openpgp.encrypt(pgpOptions).then(function(ciphertext) {
                var encryptedText = ciphertext.data;
                document.getElementById('output-text').value = encryptedText;
                setStatusMessage("Message encrypted successfully.");
            }).catch(function(error) {
                console.log(error);
                setStatusMessage("Error encrypting message.");
            });
        }
        
        function handleDecryption() {
            var privateKey = privateKeyTextArea.value;
            var passphrase = passphraseInput.value;
            var encryptedText = document.getElementById('output-text').value;

            var pgpOptions = {
                message: openpgp.message.readArmored(encryptedText),
                privateKey: openpgp.key.readArmored(privateKey).keys[0],
                passphrase: passphrase
            };

            openpgp.decrypt(pgpOptions).then(function(plaintext) {
                var decryptedText = plaintext.data;
                document.getElementById('input-text').value = decryptedText;
                setStatusMessage("Message decrypted successfully.");
            }).catch(function(error) {
                console.log(error);
                setStatusMessage("Error decrypting message.");
            });
        }
        
        generateKeyButton.addEventListener('click', function() {
            setActiveButton(generateKeyButton);
            setStatusMessage("Generating key pair, please wait...");
            
            var pgpOptions = {
                userIds: [{ name: 'Your Name', email: 'example@email.com' }],
                rsaBits: 2048,
                passphrase: passphraseInput.value
            };
            
            openpgp.generateKey(pgpOptions).then(function(key) {
                var privKey = key.privateKeyArmored;
                var pubKey = key.publicKeyArmored;

                privateKeyTextArea.value = privKey;
                publicKeyTextArea.value = pubKey;
                document.getElementById('output-text').value = "";
                document.getElementById('input-text').value = "";
                setStatusMessage("Key pair generated successfully.");
            }).catch(function(error) {
                console.log(error);
                setStatusMessage("Error generating key pair.");
            });
        });
        
        encryptButton.addEventListener('click', function() {
            setActiveButton(encryptButton);
            setStatusMessage("Encrypting message. Please wait...");
            handleEncryption();
        });
        
        decryptButton.addEventListener('click', function() {
            setActiveButton(decryptButton);
            setStatusMessage("Decrypting message. Please wait...");
            handleDecryption();
        });
