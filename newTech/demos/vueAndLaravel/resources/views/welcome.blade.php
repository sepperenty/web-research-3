<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>vue test</title>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" >
    <script src="js/vue.js"></script>
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
</head>
<body>
    <div class="container">
        <div id="vueExample">
            <h1>Cards</h1>
            
            <card></card>



        </div>
    </div>

<!-- ----------------------------------------------- -->

    

    <div id="cardTemplate">
        <div class="col-md-6">
            <ul v-for="card in list" class="list-group">
                <li class="list-group-item" v-on:click="changeId(card.id)">@{{card.title}}</li>
            </ul>
        </div>
        
        <div class="col-md-6" v-if="selectedCard">
             <div>
                    <h3>@{{selectedCard.title}}</h3>
                  <p>@{{selectedCard.body}}</p>
                  
            </div>

            <hr>
            <input type="hidden" id="token" value="{{ csrf_token() }}">
            <div class="form-group">
                <input v-model="newTitle" class="form-control" type="text" name="title" placeholder="nieuwe titel">
            </div>
             <div class="form-group">
                <input v-model="newBody" class="form-control" type="text" name="body" placeholder="nieuwe inhoud">
             </div>
                 <div class="form-group">
                <button v-on:click="addCard" class="btn">voeg toe</button>
             </div>
            

        </div>
    </div>



   

    <script src="js/base.js"></script>

</body>
</html>