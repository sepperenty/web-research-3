(function(){

    $(document).ready(function(){

        var video = document.querySelector("#videoElement");

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

        if (navigator.getUserMedia) {
            navigator.getUserMedia({video: true}, handleVideo, videoError);
        }

        function handleVideo(stream) {
            video.src = window.URL.createObjectURL(stream);
        }

        function videoError(e) {
            // do something
        }

        var v,canvas,context,w,h;
        var imgtag = document.getElementById('imgtag'); // get reference to img tag
        var sel = document.getElementById('fileselect'); // get reference to file select input element

        console.log("dom loaded");
        v = document.getElementById('videoElement');
        canvas = document.getElementById('canvas');
        context = canvas.getContext('2d');
        w = canvas.width;
        h = canvas.height;

        var currentURI;
        var alreadySaved = false;

        function draw(v,c,w,h) {

            if(v.paused || v.ended) return false; // if no video, exit here
            //175,87.5
            context.drawImage(v,230,120,180,240, 0,0,150,200); // draw video feed to canvas
            //context.drawImage(v,0,0,w,h);
            var uri = canvas.toDataURL("image/png"); // convert canvas to data URI
            currentURI = uri;
            //console.log(uri); // uncomment line to log URI for testing
            var token = $('#token').val();

           
            /*Opencv manier*/

             $.post( "/comparePictureOpenCv", {dataURI: uri, '_token': token}, function(data){
                console.log(data[1]);
                $("#resultName").html("This image has a " + Math.round(data[1]*100) + "% match with: <span id='characterName'>" + data[0] +"</span>");
                $(".result").css("display", "block");
            } );

            alreadySaved = false;
            //imgtag.src = uri; // add URI to IMG tag src
        }


        window.addEventListener('keydown', function(e) {
          if(e.keyCode == 32 && e.target == document.body) {
            e.preventDefault();
            spaceDown();
          }
        });
        window.addEventListener('keyup', function(e) {
          if(e.keyCode == 32 && e.target == document.body) {
            e.preventDefault();
            spaceUp();
          }
        });

        $("#spaceBarImg").mousedown(function(){
            spaceDown();
        })
        $("#spaceBarImg").mouseup(function(){
            spaceUp();
        })

        function spaceDown(){
            $("#spaceBarImg").css("background-image", "url('images/spacebarPress.png')");
        }
        function spaceUp(){
            $("#spaceBarImg").css("background-image", "url('images/spacebar.png')");
            $("#newName").css("background-color", "white");
            $(".result").css("display", "none");
            $("#instruction").css("display", "none");
            $(".message").css("display", "none");
            draw(v,context,w,h);
        }

        var token = $('#token').val();
        $("#sendName").on("click",function(){
            if(!alreadySaved){
                var newName = $("#newName").val();
                if(newName != ""){
                     $("#newName").css("background-color", "white");
                    console.log("send");
                    /*Image equation manier*/
                    $.post( "/newName", { name: newName, dataURI: currentURI, '_token': token}, function(data){
                        console.log(data);
                        if(data == "success"){
                            $(".message").css("display", "block");
                        }
                    } );
                    $(".result").css("display", "none");
                    alreadySaved = true;
                }else{
                    $("#newName").css("background-color", "red");
                }
            }
        });

        // for iOS

        // create file reader
        var fr;

        sel.addEventListener('change',function(e){
            var f = sel.files[0]; // get selected file (camera capture)

            fr = new FileReader();
            fr.onload = receivedData; // add onload event

            fr.readAsDataURL(f); // get captured image as data URI
        })

        function receivedData() {
            // readAsDataURL is finished - add URI to IMG tag src
            imgtag.src = fr.result;
        }


    });

})();  