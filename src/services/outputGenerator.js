const fs = require('fs');

function generateOutput(list) {
  let content = "ID - NAME \r\n============ \r\n";

  for (let item of list) {
    content += item.id + ' - ' + item.name + '\r\n';
  }
  
  fs.writeFile('output/output.txt', content, (err) => {
    if (err) throw err;
    console.log('output.txt saved!');
  });
}

module.exports = generateOutput;