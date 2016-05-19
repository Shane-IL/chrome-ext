$(function() {
    var SearchTypes = {
        Web: "Web",
        Images: "Images",
        Videos: "Videos"

    };
    var AnimalTypes = {
        Cats: "Cats",
        Dogs: "Dogs"
    };
    var $prettyBox =  $(".pretty-box");
    var $nextButton = $(".next-image-button");
    var $searchButton = $(".search-button");
    var $animalButton = $(".animal-button");
    var $dogButton = $(".dog-type");
    var $webSearchButton = $(".web-search");
    var $searchInput = $(".search-input");
    var currentSearchType = SearchTypes.Web;
    var currentAnimalType = AnimalTypes.Dogs;
    var currentBackgroundImage = ImagesManager.getRandomAnimalPic(currentAnimalType);

    $webSearchButton.toggleClass('selected', true);
    $dogButton.toggleClass('selected', true);

    changeBackground();

    $nextButton.click(function () {
        changeBackground();
    });

    $searchButton.click(function (e) {
        var $target = $(e.target);
        if(currentSearchType !== SearchTypes[$target.text()]){
            currentSearchType = SearchTypes[$target.text()];
            $searchButton.toggleClass('selected', false);
            $target.toggleClass('selected', true);
        }
    });

    $animalButton.click(function (e) {
        var $target = $(e.target);
        if(currentAnimalType !== AnimalTypes[$target.text()]){
            currentAnimalType = AnimalTypes[$target.text()];
            $animalButton.toggleClass('selected', false);
            $target.toggleClass('selected', true);
            changeBackground();
        }
    });

    $searchInput.keyup(function (e) {
        if (e.keyCode === 13) {
            var searchTerms = $searchInput.val();
            var searchUrl;
            switch(currentSearchType){
                case SearchTypes.Web:
                    searchUrl = "https://www.google.com/search?q="+searchTerms;
                    break;
                case SearchTypes.Images:
                    searchUrl = "https://www.google.com/search?tbm=isch&q="+searchTerms;
                    break;
                case SearchTypes.Videos:
                    searchUrl = "https://www.google.com/search?tbm=vid&q="+searchTerms;
                    break;
            }
            window.open(searchUrl, '_blank')
        }
    });

    function changeBackground(){
        currentBackgroundImage = ImagesManager.getRandomAnimalPic(currentAnimalType, currentBackgroundImage.id);
        $prettyBox.css("background-image", "url("+currentBackgroundImage.image+")");
    }

});

var ImagesManager = new function(){

    var localImages = {
        Dogs: {
            1: "./local-images/dogs/dogs1.jpg",
            2: "./local-images/dogs/dogs2.jpg",
            3: "./local-images/dogs/dogs3.jpg",
            4: "./local-images/dogs/dogs4.jpg",
            5: "./local-images/dogs/dogs5.jpg",
            6: "./local-images/dogs/dogs6.jpg",
            7: "./local-images/dogs/dogs7.jpg",
            8: "./local-images/dogs/dogs8.jpg",
            9: "./local-images/dogs/dogs9.jpg",
            10: "./local-images/dogs/dogs10.jpg"
        },
        Cats: {
            1: "./local-images/cats/cats1.jpg",
            2: "./local-images/cats/cats2.jpg",
            3: "./local-images/cats/cats3.jpg",
            4: "./local-images/cats/cats4.jpg",
            5: "./local-images/cats/cats5.jpg",
            6: "./local-images/cats/cats6.jpg",
            7: "./local-images/cats/cats7.jpg",
            8: "./local-images/cats/cats8.jpg",
            9: "./local-images/cats/cats9.jpg",
            10: "./local-images/cats/cats10.jpg",
        }
    };


    this.getRandomAnimalPic = function(animalType, currentPicId){
        var randomId = generateRandomId(localImages[animalType], currentPicId);
        return {id: randomId, image: localImages[animalType][randomId]};
    };

    function countProperties(obj) {
        return Object.keys(obj).length;
    }

    function generateRandomId(collection, exception){
        var collectionLength = countProperties(collection);
        var randomId = Math.floor((Math.random() * collectionLength+1));
        if(exception){
            return (randomId === exception) ? generateRandomId(collection, exception) : randomId;
        }
        return randomId;

    }
}();

