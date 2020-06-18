/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function() {

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      let $tweetElement = createTweetElement(tweet);
      $('#tweets-container').append($tweetElement);
    }
  };

  const createTweetElement = function(tweet) {
    const tweetElement = `
      <article class="one-tweet">
        <div class="avatar-name-handle">
          <div class="avatar-name">
            <img src=${tweet["user"]["avatars"]}> 
            <p>${tweet["user"]["name"]}</p>
          </div>
          <p>${tweet["user"]["handle"]}</p>
        </div>
        <p class="tweet-content">${tweet["content"]["text"]}</p>
        <div class="days-ago-edit">
          <p>${tweet["created_at"]}</p>
          <p>some buttons</p>
        </div>
      </article>
    `;
    return tweetElement;
  };

  $('.form-container').on('submit', function(event) {
    event.preventDefault();
    const tweetData = $(this).serialize();
    const decodedTweet = decodeURIComponent(tweetData).substring(5)
    if (!decodedTweet) {
      alert("That's an empty string");
    } else if (decodedTweet.length > 140) {
      alert("That tweets to long buddy");
    } else {
      console.log(decodeURIComponent(tweetData).substring(5));
      $.post('/tweets/',
        tweetData,
        function() {
          console.log('success');
        });
    }
  });

  const loadTweets = function() {
    $.ajax('/tweets/', { method: 'GET' })
      .then(function (loadedTweets) {
        console.log('Success: ', loadedTweets);
        renderTweets(loadedTweets);
      });
  };

  loadTweets();

});