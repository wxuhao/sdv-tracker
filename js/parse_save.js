function parseFile(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        var $xml = $.parseXML(e.target.result);
        $save = $($xml);
        $save = $save.find('SaveGame');
        // find player
        //console.log($($xml, 'player'));
        //console.log($save);
        //console.log(parsePathList(['player'], $save));
        var friendsHTML = document.getElementById('friends');
        paths = {
            friendName: ['friendshipData', 'item', 'key', 'string'],
        };
        $.each(paths, function (key, value) {
            names = parseEach(value, $save);
        })
        console.log(names)
        for (var i = 0; i < names.length; i++) {
            console.log(names[i])
            friendsHTML.innerHTML += `<div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between px-md-1">
                <div>
                  <h3 class="text-info">${names[i]}</h3>
                  <p class="mb-0">8/10</p>
                </div>
                <div class="align-self-center">
                  <img src="img/villagers/${names[i]}.png" class="img-fluid" alt="Abigail"
                    style="max-height: 100px; max-width: 100px;">
                </div>
              </div>
              <div class="px-md-1">
                <div class="progress mt-3 mb-1 rounded" style="height: 7px">
                  <div class="progress-bar bg-info" role="progressbar" style="width: 80%" aria-valuenow="80"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
          </div>`
        }
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
