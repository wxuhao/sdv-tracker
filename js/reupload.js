"use strict";
// store a reference to our file handle
let fileHandle;

async function getTheFile() {
    // open file picker
    [fileHandle] = await window.showOpenFilePicker();
    while (true) {
        // get file contents
        const fileData = await fileHandle.getFile();
        parseFile(fileData);
        // sleep
        await new Promise(r => setTimeout(r, 1000));
    }
}