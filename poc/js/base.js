$(document).ready(function(){

	console.log("ingeladen");

	var file = new Image();
	file.src = "images/albert1.jpg";

	var file1 = new Image();
	file1.src = "images/leopold2.jpg";

	$("#pic1").src(file.src);
	$('#pic2').src(file1.src);

	var canvas1 = document.getElementById("imageContainer");
	canvas1.width = file.width;
	canvas1.height = file.height;
	var context1 = canvas1.getContext('2d');

	var canvas2 = document.getElementById("secondImageContainer")
	canvas2.width = file1.width;
	canvas2.height = file1.height;
	var context2 = canvas2.getContext('2d');

	var dataUrl1;
	var dataUrl2;

	file.onload = function(){

  		

  		loadFirst();


  		dataUrl1 = canvas1.toDataURL();

		file1.onload = function(){
			
			//loadSecond();
	  		dataUrl2 = canvas2.toDataURL();
	  		var diff = resemble(dataUrl1).compareTo(dataUrl2).ignoreColors().scaleToSameSize().onComplete(function(data){
		    console.log(data);
		    
			});
	  	};

		
  	};


  	

  	var loadFirst = function(){


			var xcoor1;
			var ycoor1;
			var width1;
			var height1;

			var objects = new tracking.ObjectTracker(['face']);
			objects.on('track', function(event) {
			  if (event.data.length === 0) {
			    // No objects were detected in this frame.
			  } else {
			    event.data.forEach(function(rect) {
			      // rect.x, rect.y, rect.height, rect.width
			      xcoor1 = rect.x;
			      ycoor1 = rect.y;
			      width1 = rect.width;
			      height1 = rect.height;


			    });
			  }
			});
			tracking.track('#pic1', objects);

			context1.clearRect(0, 0, canvas1.width, canvas1.height);
	  		context1.drawImage(file1, xcoor1, ycoor1, width1, height1, 0, 0, width1, height1);
		


  		

  	}

  	var loadSecond = function(){

  			var xcoor;
			var ycoor;
			var width;
			var height;

			var objects = new tracking.ObjectTracker(['face']);
			objects.on('track', function(event) {
			  if (event.data.length === 0) {
			    // No objects were detected in this frame.
			  } else {
			    event.data.forEach(function(rect) {
			      // rect.x, rect.y, rect.height, rect.width
			      xcoor = rect.x;
			      ycoor = rect.y;
			      width = rect.width;
			      height = rect.height;

			    });
			  }
			});
			tracking.track('#pic2', objects);

			context2.clearRect(0, 0, canvas2.width, canvas2.height);
	  		context2.drawImage(file1, xcoor, ycoor, width, height, 0, 0, width, height);

  	}


	
	

});