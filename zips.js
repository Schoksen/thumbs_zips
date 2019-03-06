  const fs = require('fs');
  const AdmZip = require('adm-zip');
  const path = 'output';
  const exportname = process.argv[2] || 'Bilder';

  ((path) => {
    fs.readdir(path, (err, files) => {
      let zip = new AdmZip;
      let j = 0;
      let i = 0;
      files.forEach(file => {
        zip.addLocalFile(`${path}/${file}`);
        if (++i % 300 === 0) {
          zip.writeZip(`${path}/${exportname}_${++j}.zip`);
          zip = new AdmZip;
        };
      });
      zip.writeZip(`${path}/${exportname}_${++j}.zip`);
    });
  })(`${path}`)
