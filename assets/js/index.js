$(document).ready(function () {
  //Creating the Card  
  function Card(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  };
  //Array containing all the ranks
  var rank = new Array("A", "2", "3", "4", "5", "6", "7", "8", "9", "10",
    "J", "Q", "K");
  //Array with the card types using the unicode representations.
  var types = new Array("&clubs;", "&diams;", "&hearts;", "&spades;");

  //Array with the expected total number of cards 
  this.deck = new Array(52);
  var i;
  var j;
  var cname;
  for (i = 0; i < types.length; i++) {
    for (j = 0; j < rank.length; j++) {
      this.deck[i * rank.length + j] = new Card(rank[j], types[i]);
     
      displayCard(types[i], types[i].substring(1, types[i].length - 1) , rank[j]);
    }
  }
  //This function helps to display the card. 
  //The function accepts card type and number to display each card dynamically.
  function displayCard(card, name, number) {
    
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
function picknspread(){
  $("#cards .card").each(function(){
    var prevIndex = $(this).index() - 1;
    //$(this).prev(".card").a;
    var c =  110 + $(this).index() * 2 ;
    console.log(c );
    $(this).css({ "transform": "rotate(" + c + "deg)", "left": $(this).index() * 5});
    $(this).attr("data-rotate", c);
  });
}
  function lineupV(){
    $("#cards .card").each(function(){
      $(this).addClass("lineup").css("top", 0 + 60 *  $(this).index());

      $("section").addClass("section-half");
      $("#cards").addClass("half");
      $("#selected_cards").addClass("half");

      $(this).on('mouseenter', function(){
        $(this).addClass("pop-right");
      });
      $(this).on('mouseleave', function(){
        $(this).removeClass("pop-right");
      });
  });
  }

  lineupV();

  function lineupH(){
    $("#cards .card").each(function(){
      $(this).addClass("lineup").css("left", 0 + 30 *  $(this).index());
      $(this).on('mouseenter', function(){
        $(this).addClass("pop-up");
      });
      $(this).on('mouseleave', function(){
        $(this).removeClass("pop-up");
      });
  });
  }

  //lineupH();

   function resetLineUpCards () {
    $("#cards .card").each(function () {
        $(this).removeClass("lineup").addClass("lineup");
    });
  };

  function chooseRandomCards(){
    randomCards = jQuery("#cards .card").get().sort(function(){ 
      return Math.round(Math.random())-0.5
    }).slice(0,5).clone();

    $('#selected_cards').html(randomCards);
  }



});