// This is a node script to add WebViewer license key

const fs = require('fs-extra');
const readline = require('readline');
const btoa = require('btoa');

const RESET = '\x1b[0m';
const UNDERLINE = '\x1b[4m';
const CYAN = '\x1b[36m';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question(`\vVisit ${CYAN}${UNDERLINE}https://www.pdftron.com/key-npm${RESET} to get your license key.\nLicense key: `, answer => {
  if (!answer) {
    rl.write(`\nLicense key not entered. Please visit the following url to get one:\n${CYAN}${UNDERLINE}https://www.pdftron.com/key-npm${RESET}\n\nThen add it by running:\n> npm run add-license\n\n\n`);
    rl.close();
    process.exit();
  }

  rl.write(`\nLicense added successfully. To change the license later, run\n> npm run add-license\n\n\n`);

  // Using btoa(https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/btoa) to obsfucate the license key.
  // You are welcome to use other ways if you like.
  fs.writeFileSync('client/license-key.js', `window.licenseKey = '${btoa(answer)}';`);

  rl.close();
});