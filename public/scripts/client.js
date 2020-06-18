/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function() {

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      let $tweetElement = createTweetElement(tweet);
      $('#tweets-container').prepend($tweetElement);
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
        <p class="tweet-content">${escape(tweet["content"]["text"])}</p>
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
      $.post('/tweets/',
        tweetData,
        function() {
          loadTweets();
        });
    }
  });

  const loadTweets = function() {
    $('#tweets-container').empty();
    $.ajax('/tweets/', { method: 'GET' })
      .then(function(loadedTweets) {
        renderTweets(loadedTweets);
      });
  };

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  loadTweets();
});