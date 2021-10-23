believer = "";
phoenix = "";
leftwX = 0;
leftwY = 0;
rightwX = 0;
rightwY = 0;
songPlayingb = "";
songPlayingp = "";
scorel = 0;
scorer = 0;


function preload() {


}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    believer = loadSound("Believer.mp3");
    phoenix = loadSound("Phoenix.mp3");
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPosses);

}
function draw() {
    image(video, 0, 0, 600, 500);
    songPlayingb = believer.isPlaying();
    songPlayingp = phoenix.isPlaying();
    console.log("Song Status : Believer");
    if (scorel > 0.2) {
        fill("#FF0000");
        stroke("#FF0000");
        circle(leftwX, leftwY, 10);
        phoenix.stop();
        if (songPlayingp == false) {
            believer.play();
            document.getElementById("song").innerHTML = "Song Playing - Believer";
        }

    }
    if (scorer > 0.2) {
        fill("#FF0000");
        stroke("#FF0000");
        circle(rightwX, rightwY, 10);
        believer.stop();
        if ( songPlayingb == false) {
            phoenix.play();
            document.getElementById("song").innerHTML = "Song Playing - Phoenix";
        }
    }


}
function modelLoaded() {
    console.log("Model is Loaded");
}
function gotPosses(results) {
    if (results.length > 0) {
        console.log(results);
        leftwX = results[0].pose.leftWrist.x;
        leftwY = results[0].pose.leftWrist.y;
        console.log("Left Hand Wrist is at " + leftwX + " " + leftwY);
        rightwX = results[0].pose.rightWrist.x;
        rightwY = results[0].pose.rightWrist.y;
        console.log("Right Hand Wrist is at" + rightwX + " " + rightwY);
        scorel = results[0].pose.keypoints[9].score;
        scorer = results[0].pose.keypoints[10].score;
    }
}
function play() {
    believer.play();
    believer.setVolume(1);
    believer.rate(1);
}