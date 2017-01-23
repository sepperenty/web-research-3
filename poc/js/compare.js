(function(){


	$("#click").on("click", function(){

			/*
				Get info about uploaded face with id
			*/

			/*var request = new XMLHttpRequest();

			request.open('GET', 'https://api.kairos.com/v2/media/5a78e2adf19493ded08cbb45');

			request.setRequestHeader('app_id', 'fadfef96');
			request.setRequestHeader('app_key', 'e2825031129c5b0ed11121739edc0e00');

			request.onreadystatechange = function () {
			  if (this.readyState === 4) {
			    console.log('Status:', this.status);
			    console.log('Headers:', this.getAllResponseHeaders());
			    console.log('Body:', this.responseText);
			  }
			};

			request.send();*/

			/*
				Post face to gallery
			*/

			var link = $("#linkToUplaod").val();
			var nameOfLink = $("#nameOfLink").val();

			if((link != "") || (nameOfLink != "")){
					var request = new XMLHttpRequest();

					request.open('POST', 'https://api.kairos.com/enroll');

					request.setRequestHeader('Content-Type', 'application/json');
					request.setRequestHeader('app_id', 'fadfef96');
					request.setRequestHeader('app_key', 'e2825031129c5b0ed11121739edc0e00');

					request.onreadystatechange = function () {
					  if (this.readyState === 4) {
					    console.log('Status:', this.status);
					    console.log('Headers:', this.getAllResponseHeaders());
					    console.log('Body:', this.responseText);
					  }
					};

					var body = {
					  'image': link,
					  'subject_id': nameOfLink,
					  'gallery_name': 'presidentialGallery'
					};

					request.send(JSON.stringify(body));
			}else{
				console.log("vul link in");
				$("#linkToUplaod").css("background-color", "red");
				$("#nameOfLink").css("background-color", "red");
			}

			



	});

	$("#showGallery").click(function(){

			/*
				Show all faces stored in gallery
			*/

			var request = new XMLHttpRequest();

			request.open('POST', 'https://api.kairos.com/gallery/view');

			request.setRequestHeader('Content-Type', 'application/json');
			request.setRequestHeader('app_id', 'fadfef96');
			request.setRequestHeader('app_key', 'e2825031129c5b0ed11121739edc0e00');

			request.onreadystatechange = function () {
			  if (this.readyState === 4) {
			    console.log('Status:', this.status);
			    console.log('Headers:', this.getAllResponseHeaders());
			    console.log('Body:', this.responseText);
			    var json = JSON.parse(this.responseText);
			    $(".personages").empty();
			    for(var person in json.subject_ids){
			    	$(".personages").append("<li>"+json.subject_ids[person]+"</li>");
			    }
			  }
			};

			var body = {
			  'gallery_name': 'presidentialGallery'
			};

			request.send(JSON.stringify(body));

	});


	$("#delete").click(function(){

		var name = $("#nameToDelete").val();

		if(name != ""){

			var request = new XMLHttpRequest();

		request.open('POST', 'https://api.kairos.com/gallery/remove_subject');

		request.setRequestHeader('Content-Type', 'application/json');
		request.setRequestHeader('app_id', 'fadfef96');
		request.setRequestHeader('app_key', 'e2825031129c5b0ed11121739edc0e00');

		request.onreadystatechange = function () {
		  if (this.readyState === 4) {
		    console.log('Status:', this.status);
		    console.log('Headers:', this.getAllResponseHeaders());
		    console.log('Body:', this.responseText);
		  }
		};

		var body = {
		  'gallery_name': 'presidentialGallery',
		  'subject_id': name
		};

		request.send(JSON.stringify(body));

		}
		else{
			console.log("vul naam in");
			$("#nameToDelete").css("background-color", "red");
		}

	});


	$("#recognize").on("click", function(){

		var tocheck = $("#faceToCheck").val();

		if(tocheck != ""){
			var request = new XMLHttpRequest();

			request.open('POST', 'https://api.kairos.com/recognize');

			request.setRequestHeader('Content-Type', 'application/json');
			request.setRequestHeader('app_id', 'fadfef96');
			request.setRequestHeader('app_key', 'e2825031129c5b0ed11121739edc0e00');

			request.onreadystatechange = function () {
			  if (this.readyState === 4) {
			    console.log('Status:', this.status);
			    console.log('Headers:', this.getAllResponseHeaders());
			    console.log('Body:', this.responseText);
			    var json = JSON.parse(this.responseText);
			    
			    
			    if(json.images != null){
			    	var name = json.images[0].transaction.subject_id;
			    	$("#result").html(name);
			    	console.log(name);
			    }else{
			    	$("#result").html("no faces found in the image");
			    }
			  }
			};

			var body = {
			  'image': tocheck,
			  'gallery_name': 'presidentialGallery',
			  'threshold': '0.63'
			};

			request.send(JSON.stringify(body));
		}else{
			console.log("vul link in");
			$("#faceToCheck").css("background-color", "red");
		}

		

	});

})();
