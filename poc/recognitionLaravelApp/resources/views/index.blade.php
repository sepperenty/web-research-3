<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>

<style>
    #app{
        margin: 0px auto;
        width:500px;
        padding-bottom: 100px;
    }
    #container {
        margin: 0px auto;
        width: 500px;
        height: 375px;
        border: 10px #333 solid;
    }
    #videoElement {
        width: 500px;
        height: 375px;
        background-color: #666;
    }
    .videoscreen{
        position: relative;
        overflow: hidden;
    }
    #circle{
        position: absolute;
        box-sizing: border-box;
        width: 150px;
        height: 200px;
        background-color: transparent;
        border: 5px solid red;
        /*border-radius: 100%;*/
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

    }

    #leftPupil{
        background: red;
        width: 10px;
        height: 10px;
        position: absolute;
        top: 70px;
        left: 50px;
        border-radius: 100%;
    }

    #rightPupil{
        background: red;
        width: 10px;
        height: 10px;
        position: absolute;
        top: 70px;
        left: 100px;
        border-radius: 100%;
    }

    .result{
        visibility: hidden;
    }


</style>

<h1>test</h1>
<input id="fileselect" type="file" accept="image/*" capture="camera" hidden>
<div id="app">
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

    <h1>Plaats het hoofd van de foto in het midden van de cirkel</h1>

    <input type="button" value="Save" id="save" />

    <canvas id="canvas" width="150" height="200"></canvas>

    <div class="result">

        <h2 id="resultName"></h2>

        <h2>No ?</h2>
        <p>Help us out en type the characters name</p>
        <input type="text" id="newName" placeholder="Who is it ?">
        <button id="sendName">Send</button>

    </div>
</div>



</body>
<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script src="js/base.js"></script>
</html>