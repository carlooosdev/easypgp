# EasyPGP
EasyPGP is a simple web application that allows users to generate PGP key pairs, encrypt messages, and decrypt messages using OpenPGP.js library.

## Getting Started
To use the EasyPGP application, simply open the `index.html` file in your web browser.

## Features
The EasyPGP application provides the following features:

### Generate Key
Clicking on the "Generate Key" button will generate a PGP key pair using the specified RSA bits (default: 2048) and user information (name and email). The generated private and public keys will be displayed in the respective text areas.

### Encrypt
Clicking on the "Encrypt" button will encrypt the message entered in the "Type your message here" text area using the recipient's public key and the user's passphrase. The encrypted message will be displayed in the "Result" text area.

### Decrypt
Clicking on the "Decrypt" button will decrypt the encrypted message entered in the "Result" text area using the user's private key and passphrase. The decrypted message will be displayed in the "Type your message here" text area.

## Dependencies
This project requires the following dependencies:

- OpenPGP.js (v4.10.4) library, which is included in the HTML file using a CDN.

## Styling
The application is styled using the `styles.css` file. The CSS rules define the font family, background color, alignment, and styling of the buttons, text areas, and password input.

## Contributions
Contributions to this project are welcome. If you find any issues or have any suggestions, please feel free to open an issue or submit a pull request.

## License
This project is licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0).
