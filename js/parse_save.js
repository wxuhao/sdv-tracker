function parseFile(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        var $xml = $.parseXML(e.target.result);
        $save = $($xml);
        $save = $save.find('SaveGame');
        // find player
        //console.log($($xml, 'player'));
        console.log($save);
        console.log(parsePathList(['player'], $save));
        console.log(parsePathList(['fdsa'], $save));
    }
    reader.onerror = error => reject(error);
    reader.readAsText(file);
};

function parsePathList(list, $save) {
    //successively .find each entry in the list and return the last piece of xml
    $.each(list, function(index, value) {
        $temp_save = $save.find(value);
        // Doesn't throw a clear error?
        if ($temp_save.length === 0){
            throw('Could not find ' + value + ' in ' + $save);
        }
        $save = $temp_save;
    });
    return $save;
}

function parseEach(list, $save) {
    //parsePathList for each item found with .find
}