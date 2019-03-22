$(document).ready(function () {
  //Creating the Card  
  function Card(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  };

  function picknspread() {
    $("#cards .card").each(function () {
      var prevIndex = $(this).index() - 1;
      //$(this).prev(".card").a;
      var c = 110 + $(this).index() * 2;
      console.log(c);
      $(this).css({ "transform": "rotate(" + c + "deg)", "position": "absolute", "left": $(this).index() * 5 });
      $(this).attr("data-rotate", c);
    });
  }
  
  function resetStackCards() {
    $("#cards .card").each(function () {
      $(this).removeClass("lineup").css("style", "");
    });
  };
  function stackVertical() {
    resetStackCards();
    $("#cards .card").each(function () {
      $(this).addClass("lineup").css({ "top" : 0 + 60 * $(this).index(), "left": "0"});
      $(this).parent("#cards").attr("data-active", "stack-vertical");
      $(this).on('mouseenter', function () {
        $(this).addClass("pop-right");
      });
      $(this).on('mouseleave', function () {
        $(this).removeClass("pop-right");
      });
    });
  }

  // lineupV();

  function stackHorizontal() {
    resetStackCards();
    $("#cards .card").each(function () {
      $(this).addClass("lineup").css({ "left" : 0 + 30 * $(this).index(), "top": "0"});
      $(this).parent("#cards").attr("data-active", "stack-horizontal");
      $(this).on('mouseenter', function () {
        $(this).addClass("pop-up");
      });
      $(this).on('mouseleave', function () {
        $(this).removeClass("pop-up");
      });
    });
  }
  

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  $.fn.shuffleElements = function () {

    var allElems = this.get(),
      getRandom = function (max) {
        return Math.floor(Math.random() * max);
      },
      shuffled = $.map(allElems, function () {
        var random = getRandom(allElems.length),
          randEl = $(allElems[random]).clone(true)[0];
        allElems.splice(random, 1);
        return randEl;
      });

    this.each(function (i) {
      $(this).replaceWith($(shuffled[i]));
    });
    var activeEff = $(document).find("#cards").attr("data-active");
   

    switch (activeEff) {
      case "stack-horizontal":
        stackHorizontal();
        return $(shuffled);
        break;
      case "stack-vertical":
        stackVertical();
        return $(shuffled);
        break;
      default:
        return $(shuffled);
    }
    

  };


  //lineupH();



  function displayCards(obj) {
   // $("#cards").empty();
    var rank, types;

    if (obj.shuffle === true) {
      //Array containing all the ranks
      rank = shuffle(["A", "2", "3", "4", "5", "6", "7", "8", "9", "10",
        "J", "Q", "K"]);
      //Array with the card types using the unicode representations.
      types = shuffle(["&clubs;", "&diams;", "&hearts;", "&spades;"]);

    } else {
      //Array containing all the ranks
      rank = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10",
        "J", "Q", "K"];
      //Array with the card types using the unicode representations.
      types = ["&clubs;", "&diams;", "&hearts;", "&spades;"];

    }

    //Array with the expected total number of cards 
    this.deck = [52];
    var i;
    var j;
    var cname;
    for (i = 0; i < types.length; i++) {
      for (j = 0; j < rank.length; j++) {
        this.deck[i * rank.length + j] = new Card(rank[j], types[i]);

        buildCards(types[i], types[i].substring(1, types[i].length - 1), rank[j]);
      }
    }
  }
  //This function helps to display the card. 
  //The function accepts card type and number to display each card dynamically.
  function buildCards(card, name, number) {

    $('#cards').append(
      $('<div/>', { 'class': 'card ' + name, 'data-card-name': name, 'data-card-num': number }).append(
        $('<div/>', { 'class': 'top' }).append(
          $('<span/>', { 'class': 'number', html: number }),
          $('<span/>', { 'class': 'icon', html: card })
        ),
        $('<div/>', { 'class': 'lg_icon', html: card }),
        $('<div/>', { 'class': 'bottom' }).append(
          $('<span/>', { 'class': 'icon rotate', html: card }),
          $('<span/>', { 'class': 'number rotate', html: number })
        )
      ));

   
  }



  displayCards({ shuffle: false });

  $("#shuffle").on("click", function () { $('#cards .card').shuffleElements(); });
  $("#stack-h").on("click", function () { stackHorizontal(); });
  $("#stack-v").on("click", function () { stackVertical();  });
  $("#reset").on("click", function () { $('#cards').empty(); displayCards({ shuffle: false });  });

});