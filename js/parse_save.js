function parseFile(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        var $xml = $.parseXML(e.target.result);
        $save = $($xml);
        $save = $save.find('SaveGame');
        // Dict of item: [path, to, item]
        paths = {
            playerName: ['player', 'name'],
            friendNames: ['friendshipData', 'string'],
            friendPoints: ['friendshipData', 'Friendship', 'Points'],
        };
        // Final values after parsing
        info = {};
        // Parse each thing in paths
        $.each(paths, function(key, value) {
            info[key] = parseEach(value, $save);
        })
        // Edit weird values
        info.playerName = [info.playerName[0]]
        console.log(info);
    }
    reader.onerror = error => reject(error);
    reader.readAsText(file);
};

function parsePathList(list, $save) {
    //successively .find each entry in the list and return the last piece of xml
    $.each(list, function (index, value) {
        $temp_save = $save.find(value);
        // Doesn't throw a clear error?
        if ($temp_save.length === 0) {
            throw ('Could not find ' + value + ' in ' + $save);
        }
        $save = $temp_save;
    });
    return $save;
}

function parseEach(list, $save) {
    values = [];
    $.each(parsePathList(list, $save), function (index, value) {
        values.push(value.innerHTML);
    });
    return values;
}