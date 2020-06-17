$(document).ready(function() {
  const $tweet = $('#tweet-text');
  $tweet.on('keyup', function() {
    let charLeft = (140 - (this.value.length));
    // console.log(this.parentNode.childNodes[3].childNodes[3]);
    // const counterNode = this.parentNode.childNodes[3].childNodes[3];
    // $('counter').html("ayyyy");
    let charCount = $('.counter');
    charCount.text(charLeft);
    if (charLeft < 0) {
      $('.counter').css('color', 'red');
    }
    if (charLeft >= 0) {
      $('.counter').css('color', '#545149');
    }
  });
});