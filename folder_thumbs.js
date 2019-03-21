  const sharp = require('sharp');
  const fs = require('fs');
  const importpath = 'input';
  const exportpath = 'output';
  const pictureheight = parseInt(process.argv[2]) || 2500;
  const sh = (f,t = '') => {
    sharp(`${importpath}/${f}`).resize({height: pictureheight}).toBuffer()
    .then(data => {
      fs.mkdirSync(`${exportpath}/${f.split("#")[0]}/${t}`, { recursive: true }, (err) => {if (err) throw err;});
      fs.writeFileSync(`${exportpath}/${f.split("#")[0]}/${t}/${f}`, data);
    })
    .catch(err => {console.error(`${err}: ${f}`);});
  };


(path => {
  fs.readdir(path, (err, files) => {
    files.forEach(file => {
      switch (file.split("#").slice(-1)[0].split(".")[0]) {
        case "t":
            sh(file);
            break;
        case "e":
        case "f":
        case "g":
            sh(file, 'details');
            break;
        default:
            sh(file, 'images');
      };
    });
  });
})(importpath);
