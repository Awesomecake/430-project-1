const fs = require('fs');

const htmlImage = fs.readFileSync(`${__dirname}/../client/html.jpg`);
const dogImage = fs.readFileSync(`${__dirname}/../client/dog.jpg`);
const bg3Image = fs.readFileSync(`${__dirname}/../client/BaldursGate3.jpg`);
const eldenRingImage = fs.readFileSync(`${__dirname}/../client/EldenRing.jpg`);
const helldivers2Image = fs.readFileSync(`${__dirname}/../client/Helldivers2.jpg`);
const wildfrostImage = fs.readFileSync(`${__dirname}/../client/Wildfrost.jpg`);

const imageStruct = {
  '/html.jpg': htmlImage,
  '/dog.jpg': dogImage,
  '/BaldursGate3.jpg': bg3Image,
  '/EldenRing.jpg': eldenRingImage,
  '/Helldivers2.jpg': helldivers2Image,
  '/Wildfrost.jpg': wildfrostImage,
};

const getImage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/jpg' });
  response.write(imageStruct[request.url]);
  response.end();
};

module.exports.getImage = getImage;
