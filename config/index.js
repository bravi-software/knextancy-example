import fs from 'fs';

let configs;

if (!configs) {
  configs = {};
  fs.readdirSync(__dirname)
    .filter((file) => (file !== 'index.js'))
    .forEach((file) => {
      configs[file.split('.js')[0]] = require(`./${file}`).default;
    });
}

export default configs;
