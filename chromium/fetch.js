const https = require('https');
const fs = require('fs');
const path = require('path');
const unzipper = require('unzipper');

const revision = '1220000'; 
const platform = 'Win_x64';

const downloadUrl = `https://storage.googleapis.com/chromium-browser-snapshots/${platform}/${revision}/chrome-win.zip`;

const downloadPath = path.join(__dirname, 'chromium.zip');
const extractPath = path.join(__dirname, 'runtime');

if (!fs.existsSync(extractPath)) {
    fs.mkdirSync(extractPath, { recursive: true });
}

console.log("Downloading Chromium...");

https.get(downloadUrl, response => {
    response.pipe(fs.createWriteStream(downloadPath))
        .on('finish', () => {
            console.log("Extracting...");
            fs.createReadStream(downloadPath)
                .pipe(unzipper.Extract({ path: extractPath }))
                .on('close', () => {
                    console.log("Chromium ready.");
                    fs.unlinkSync(downloadPath);
                });
        });
});
