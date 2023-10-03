const uuid = require('uuid');
const path = require('path');

function ext(name) {
  var m = name.match(/\.([^.]+)$/);
  return m && m[1];
}

function saveFile(file) {
  const fileName = uuid.v4() + '.' + ext(file.name);
  file.mv(path.resolve(__dirname, 'static', fileName));
  return fileName;
}

module.exports = { ext, saveFile };
