const isDate = (key) => key === "date";

module.exports = function (initialData, fields, maxValues) {
    if (initialData.length > maxValues) {
        initialData = initialData.slice(initialData.length - maxValues);
    }

    var columnData = { 
      'date': []
    };

    fields.forEach(f => columnData[f] = []);

    initialData.forEach((value) => {
      for (let key of Object.keys(value)) {
        if (!columnData[key]) continue;
        columnData[key].push(isDate(key) ? new Date(value[key]) : value[key]);
      }
    });

    var columns = [];
    for (let key of Object.keys(columnData)) {
      if (isDate(key)) {
        columns.push(['x'].concat(columnData[key]));
      }

      else columns.push([key].concat(columnData[key]));
    }

    return columns;
};