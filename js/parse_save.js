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
      knownCrafts: ['craftingRecipes', 'string'],
      craftedCrafts: ['craftingRecipes', 'value'],
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
    var friendsHTML = document.getElementById('friendship');
    friendsHTML.innerHTML = '';
    for (var i = 0; i < info['friendNames'].length; i++) {
      friendName = info['friendNames'][i];
      friendLevel = Math.floor(info['friendPoints'][i] / 250);
      friendExp = info['friendPoints'][i] % 250;
      friendPercent = 100 * friendExp / 250;
      friendsHTML.innerHTML += `
          <div class="col-xl-3 col-6 p-1">
            <div class="card">
              <div class="card-body p-2">
                <div class="d-flex justify-content-between px-md-1">
                  <div>
                    <h4 class="text-primary mb-1"><a href="https://stardewvalleywiki.com/${friendName}" target="_blank">${friendName}</a></h3>
                    <p class="mb-0">Level: ${friendLevel}/10</p>
                    <img src="img/${friendLevel}_hearts.png" class="img-fluid" alt="Hearts" style="max-width: 6.5em;">
                  </div>
                  <div class="align-self-center">
                    <img src="img/villagers/${friendName}.png" class="img-fluid" alt="Abigail"
                      style="max-height: 75px; max-width: 75px;">
                  </div>
                </div>
                <div class="px-md-1">
                  <div class="progress mt-1 mb-1 rounded" style="height: 7px">
                    <div class="progress-bar bg-danger" role="progressbar" style="width: ${friendPercent}%" aria-valuenow="${friendPercent}"
                      aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <p class="mb-0">Exp: ${friendExp}/250</p>
                </div>
              </div>
            </div>
          </div>
            `
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