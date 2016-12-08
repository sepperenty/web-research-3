$(document).ready(function(){
	
var cutHead = function(value) {
    if (value >= 1) {
        console.log(value);

			var compareFileSource = "images/person" +value+ ".jpg";
			console.log(compareFileSource);
			var compareImage = new Image();
			compareImage.src=compareFileSource;
			compareImage.onload = function(){

				var compareCanvas = document.createElement('canvas');
				var compareContext = compareCanvas.getContext('2d');
				compareCanvas.width = compareImage.width;
				compareCanvas.height = compareImage.height;
				compareContext.drawImage(compareImage, 0,0);

				var compHeadx = compareImage.x;
				var compHeady = compareImage.y;
				var compHeadWidth = compareImage.width;
				var compHeadHeight = compareImage.height;

				var objects = new tracking.ObjectTracker(['face']);
					objects.on('track', function(event) {
						  if (event.data.length === 0) {
						    // No objects were detected in this frame.
						    console.log("no head found");
						  } else {
						    event.data.forEach(function(rect) {
						      // rect.x, rect.y, rect.height, rect.width
						 		console.log("HEAD FOUND");
						      compHeadx = rect.x;
						      compHeady = rect.y;
						      compHeadWidth = rect.width;
						      compHeadHeight = rect.height;
						    });
						  }
					});
				tracking.track(compareCanvas, objects);

					
					var headCanvas = document.getElementById("headPicture");	
					var headContext = headCanvas.getContext('2d');
					headCanvas.width = compHeadWidth;
					headCanvas.height = compHeadHeight;
					headContext.drawImage(compareImage, compHeadx, compHeady, compHeadWidth, compHeadHeight, 0, 0, compHeadWidth, compHeadHeight);
					return cutHead(value - 1);
					
			};
		
    } else {
        console.log("end");
    }
};
cutHead(9);

});


