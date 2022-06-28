

let dataServer;
let pubKey = "pub-c-eb5f6792-172e-4842-b65f-e2947c26f261";
let subKey = "sub-c-2ab7dba1-e634-42df-ba90-fd36daff9ec5";
let secretKey = "sec-c-ODY5M2NkMjItNmZhMy00MDkxLThiZGMtYTQyODJkYjZkNGFh";

let occupancy = 0; 


let channelName = "Wes' App";

  
function setup() {

    createCanvas(windowWidth, windowHeight);

    dataServer = new PubNub({
      subscribeKey: subKey,
      publishKey: pubKey,
      uuid: "Zhe Wang",
      secretKey: secretKey,
      heartbeatInterval: 0,
    });
    dataServer.subscribe({ channels: [channelName],   withPresence: true });
    // listen for messages coming through the subcription feed on this specific channel. 
    dataServer.addListener({ message: readIncoming, presence: whoisconnected });
   
    pixelDensity(0.02);
    video = createCapture(VIDEO);
    video.size(width / scaler, height / scaler);
    video.hide();
    preFrame = createImage(video.width, video.height);
  
  }


var video;
var scaler = 10;
var preFrame;


function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(0.02);
  video = createCapture(VIDEO);
  video.size(width / scaler, height / scaler);
  video.hide();
  preFrame = createImage(video.width, video.height);
}

function draw() {
  video.loadPixels();
  preFrame.loadPixels();

  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      var index = (x + y * video.width) * 4
      let pr = preFrame.pixels[index + 0];
      let pg = preFrame.pixels[index + 1];
      let pb = preFrame.pixels[index + 2];
      let pbright = (pr + pg + pb) / 3;

      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
      let bright = (r + g + b) / 3;
			
      var diff = dist(r, g, b, pr, pg, pb);
			if (diff<15){
        fill(bright);
      } else {
        fill(153,204,255);
      }
      noStroke();
      rect(x * scaler, y * scaler, scaler, scaler);
    }
  }

    preFrame.copy(video, 0, 0, video.width, video.height, 0, 0, video.width, video.height);

}