

(function(){


		$(document).ready(function(){
		var faces = [];
				var cutHead = function(value) {
					console.log("cuthead");

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
										      rect.source = compareFileSource;
										  
										    });
										  }
									});
								tracking.track(compareCanvas, objects);

									
									var headCanvas = document.getElementById("headPicture");	
									var headContext = headCanvas.getContext('2d');
									headCanvas.width = compHeadWidth;
									headCanvas.height = compHeadHeight;
									headContext.drawImage(compareImage, compHeadx, compHeady, compHeadWidth, compHeadHeight, 0, 0, compHeadWidth, compHeadHeight);
									var face = {source:compareFileSource, url:headCanvas.toDataURL()};
									faces.push(face);
									return cutHead(value - 1);
							};
				    } else {
				        console.log("end");
				        console.log(faces);
				    }
				};
			
			
			cutHead(8);

			var uploadDateUrl = "";

			$("#checkPicture").on("click", function(){

			 		var newImageSource = $("#linkToUplaod").val();
					var newImage = new Image();
					newImage.src=newImageSource;

			 		var newImageCanvas = document.createElement('canvas');
					var newImageContext = newImageCanvas.getContext('2d');
					newImageCanvas.width = newImage.width;
					newImageCanvas.height = newImage.height;
					newImageContext.drawImage(newImage, 0,0);

				 	newImage.onload = function(){
				 		console.log(newImage.height);
				 		var newImageCanvas = document.createElement('canvas');
						var newImageContext = newImageCanvas.getContext('2d');
						newImageCanvas.width = newImage.width;
						newImageCanvas.height = newImage.height;
						newImageContext.drawImage(newImage, 0,0);

						var newImageHeadX = newImage.x;
						var newImageHeadY = newImage.y;
						var newImageHeadWidth = newImage.width;
						var newImageHeadHeight = newImage.height;

						var objects = new tracking.ObjectTracker(['face']);
										objects.on('track', function(event) {
											  if (event.data.length === 0) {
											    // No objects were detected in this frame.
											    console.log("no head found");
											  } else {
											    event.data.forEach(function(rect) {
											      // rect.x, rect.y, rect.height, rect.width
											 		console.log("HEAD FOUND");
											      newImageHeadX = rect.x;
											      newImageHeadY = rect.y;
											      newImageHeadWidth = rect.width;
											      newImageHeadHeight = rect.height;
											      rect.source = newImageSource;
											    });
											  }
										});
						tracking.track(newImageCanvas, objects);

							var headCanvas = document.getElementById("headPicture");	
							var headContext = headCanvas.getContext('2d');
							headCanvas.width = newImageHeadWidth;
							headCanvas.height = newImageHeadHeight;
							headContext.drawImage(newImage, newImageHeadX, newImageHeadY, newImageHeadWidth, newImageHeadHeight, 0, 0, newImageHeadWidth, newImageHeadHeight);
							uploadDateUrl = headCanvas.toDataURL();
				 		
				 	};

			});

			$("#woIsIt").on('click', function(){

					/*console.log(uploadDateUrl);
					console.log(faces);*/

					var bestOne = 100;
					var correctSource = ""

					for(var i = 0; i<faces.length; i++){
					  		var diff = resemble(uploadDateUrl).compareTo(faces[i].url).ignoreColors().scaleToSameSize().onComplete(function(data){

					  		if(bestOne > data.rawMisMatchPercentage)
					  		{
					  			bestOne = data.rawMisMatchPercentage;
					  			correctSource = faces[i].source;
					  		}
						});
					}

					console.log(bestOne);
					$("#CorrectImage").attr("src", correctSource);

			});



		});

})();


