const sharp = require('sharp');
const fs = require('fs');
const importpath = 'input';
const exportpath = 'output';
const pictureheight = parseInt(process.argv[2]) || 2500;

(path => {
  fs.readdir(path, (err, files) => {
      files.forEach(file => {
          sharp(`${path}/${file}`)
            .resize({height: pictureheight})
            .toBuffer()
            .then(data => {fs.writeFileSync(`${exportpath}/${file}`, data);})
            .catch(err => {console.log(`${err}: ${file}`);});
      });
  });
})(`${importpath}`)
