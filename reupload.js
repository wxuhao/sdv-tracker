// store a reference to our file handle
let fileHandle;

async function getFile() {
    // open file picker
    [fileHandle] = await window.showOpenFilePicker();

    if (fileHandle.type === 'file') {
        // run file code
    } else if (fileHandle.type === 'directory') {
        // run directory code
    }

}

async function getTheFile() {
    // open file picker
    [fileHandle] = await window.showOpenFilePicker();
    while (true) {
        // get file contents
        const fileData = await fileHandle.getFile();
        console.log(fileData);
        // sleep
        await new Promise(r => setTimeout(r, 2000));
    }
}
