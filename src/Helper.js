import { read, utils } from "xlsx";

export async function readData(team, sheetName) {
  return await fetch("inputQuiz/Template.xlsx")
    .then((res) => {
      return res.arrayBuffer();
    })
    .then((res) => {
      var wb = read(new Uint8Array(res), {
        type: "array",
      });

      let rawObj = utils.sheet_to_json(wb.Sheets[sheetName]);

      if (team) {
        return JSON.parse(JSON.stringify(rawObj)).filter(
          (data) => data.Team === team
        );
      }
      return JSON.parse(JSON.stringify(rawObj));
    });
}

export function shuffleArrayToString(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array.join("&$&");
}

export function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export function combineMaps(...maps) {
  var map1 = maps.reduce((result, map) => {
    map.forEach((value, key) =>
      result.set(key, (result.get(key) || 0) + parseInt(value))
    );
    return result;
  }, new Map());
  return [...map1.entries()].sort((a, b) => b[1] - a[1]);
}
