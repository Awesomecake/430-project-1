const fs = require('fs');

const htmlImage = fs.readFileSync(`${__dirname}/../client/html.jpg`);
const dogImage = fs.readFileSync(`${__dirname}/../client/dog.jpg`);

const imageStruct = {
  '/html.jpg': htmlImage,
  '/dog.jpg' : dogImage
};

const getImage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/jpg' });
  response.write(imageStruct[request.url]);
  response.end();
};

module.exports.getImage = getImage;