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

            /*Image equation manier*/

           /* $.post( "/store", {dataURI: uri, '_token': token}, function(data){
                console.log(data);
                $("#resultName").html("Is this " + data[0] +"?");
                $(".result").css("visibility", "visible");
            } );*/

            /*Opencv manier*/

             $.post( "/comparePictureOpenCv", {dataURI: uri, '_token': token}, function(data){
                console.log(data[1]);
                $("#resultName").html("Is this " + data[0] +"?");
                $(".result").css("visibility", "visible");
            } );
            

            alreadySaved = false;


            //imgtag.src = uri; // add URI to IMG tag src
        }

        document.getElementById('save').addEventListener('click',function(e){
            draw(v,context,w,h); // when save button is clicked, draw video feed to canvas
        });

        var token = $('#token').val();
        $("#sendName").on("click",function(){
            if(!alreadySaved){
                var newName = $("#newName").val();
                if(newName != ""){
                    console.log("send");
                    /*Image equation manier*/
                    $.post( "/newName", { name: newName, dataURI: currentURI, '_token': token}, function(data){
                        console.log(data);
                    } );
                    $(".result").css("visibility", "hidden");
                    alreadySaved = true;
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