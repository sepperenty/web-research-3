<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>




<input id="fileselect" type="file" accept="image/*" capture="camera" hidden>
<div id="app"> 
<div class="headLogo">
    <h1>Simpson Recognizer</h1>
</div>

    <div id="container">

        <input type="hidden" id="token" value="{{ csrf_token() }}">
        <div class="videoscreen">

            <div id="circle">
                <div id="leftPupil"></div>
                <div id="rightPupil"></div>
            </div>

            <video autoplay="true" id="videoElement">

            </video>
        </div>
    </div>

    <p class="explenation" id="instruction">Place the head of the character in the square and make the pupils align with the red dots.</p>
    
    <p class="explenation" id="pressInstruction">Press spacebar to start the magic.</p>
    <div class="spaceBar">
        <div id="spaceBarImg"></div>
    </div>
    <!-- <input type="button" value="Save" id="save" /> -->
    
    <div class="resultBlock">
        <div class="canvasDiv">
            <canvas id="canvas" width="150" height="200"></canvas>
        </div>
    
        <div class="result">
            <p id="resultName"></p>
            <p class="formInfo">Is this correct?</p>
            <p class="formInfo">If you know it's not, help us out and send us the correct name.</p>
            <div class="feedBack">
                <input type="text" id="newName" placeholder="Character name">
                <input type="submit" id="sendName" value="send">
            </div>

        </div>
        <div class="message">
            <p>Thank you!</p>
        </div>

    </div>

    
</div>



</body>
<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script src="js/imageRecognitionOpencv.js"></script>
</html>