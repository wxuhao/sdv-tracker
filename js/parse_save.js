function parseFile(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        var save = $.parseXML(e.target.result);
        $xml = $(save);
        console.log($($xml, 'player'));
    }
    reader.onerror = error => reject(error);
    reader.readAsText(file);
    
};

function parsePathList(list, file) {
    //.find each entry in the list and return the last piece of xml
}

function parseEach() {

}