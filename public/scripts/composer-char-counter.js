$(document).ready(function() {
  const $tweet = $('#tweet-text');
  $tweet.on('keyup', function() {
    let charLeft = (140 - (this.value.length));
    let $charCount = $('.counter');
    $charCount.text(charLeft);
    if (charLeft < 0) {
      $charCount.css('color', 'red');
    } else {
      $charCount.css('color', '#545149');
    }
  });
});