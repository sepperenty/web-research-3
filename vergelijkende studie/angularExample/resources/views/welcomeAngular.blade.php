<!DOCTYPE html>
<html lang="en" ng-app="angularTest">
<head>
	<meta charset="UTF-8">
	<title>angular</title>



    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" >

</head>
<body>


	<div class="container">


	

	<div ng-controller="cardsController">
	  <div my-customer></div>

	  <div card-info></div>
		
		<input type="hidden" id="token" value="{{ csrf_token() }}">
	  <div card-update></div>

	</div>
		




	</div>


	


	<script src="js/angular.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
	<script src="js/angularBase.js"></script>
</body>
</html>