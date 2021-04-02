function parseFile(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        var $xml = $.parseXML(e.target.result);
        $save = $($xml);
        $save = $save.find('SaveGame');
        // Dict of item: [path, to, item]
        paths = {
            playerName: ['player', 'name'],
            farmName: ['farmName'],
            day: ['dayOfMonthForSaveGame'],
            season: ['seasonForSaveGame'],
            year: ['yearForSaveGame'],
            funds: ['money'],
            mining: ['miningLevel'],
            combat: ['combatLevel'],
            foraging: ['foragingLevel'],
            fishing: ['fishingLevel'],
            exp: ['experiencePoints', 'int'],
            knownCrafts: ['craftingRecipies', 'string'],
            craftedCrafts: ['craftingRecipies', 'value'],
            earnings: ['totalMoneyEarned'],
            friendNames: ['friendshipData', 'string'],
            friendPoints: ['friendshipData', 'Friendship', 'Points'],
        };
        // Final values after parsing
        info = {};
        // Parse each thing in paths
        $.each(paths, function (key, value) {
            info[key] = parseEach(value, $save);
        })
        // Edit weird values
        info.playerName = [info.playerName[0]]
        // Print info
        console.log(info);

        // Render friends
        var friendsHTML = document.getElementById('friends');
        for (var i = 0; i < info['friendNames'].length; i++) {
            friendsHTML.innerHTML += `<div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between px-md-1">
                <div>
                  <h3 class="text-info">${info['friendNames'][i]}</h3>
                  <p class="mb-0">8/10</p>
                </div>
                <div class="align-self-center">
                  <img src="img/villagers/${info['friendNames'][i]}.png" class="img-fluid" alt="Abigail"
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