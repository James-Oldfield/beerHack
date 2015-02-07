$( document ).ready(function() {
        $(function() {
        $('div[id^=div]').hide();
    $('#showdiv1').click(function() {
        $('div[id^=div]').hide();
        $('#div1').show();
    });
    $('#showdiv2').click(function() {
        $('div[id^=div]').hide();
        $('#div2').show();
    });

    $('#showdiv3').click(function() {
        $('div[id^=div]').hide();
        $('#div3').show();
    });

    $('#showdiv4').click(function() {
        $('div[id^=div]').hide();
    });

});
$(".food_input").change(function(){
    console.log($(".top").offset());
    $(".top").css({"top": "-=550px"});
    console.log($(".top").offset());
});
});
   function blockMove() {
      event.preventDefault() ;
   }