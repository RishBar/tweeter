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
    const numDaysAgo = Math.round((Date.now() - tweet["created_at"]) / 86400000);
    let daysAgoString;
    if (numDaysAgo === 0) {
      daysAgoString = "Today";
    } else if (numDaysAgo === 1) {
      daysAgoString = '1 day ago';
    } else {
      daysAgoString = `${numDaysAgo} days ago`;
    }
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
          <p>${daysAgoString}</p>
          <span class=“reaction”>
            <i class="fa fa-flag" aria-hidden="true"></i>
            <i class="fa fa-retweet" aria-hidden="true"></i>
            <i class="fa fa-heart" aria-hidden="true"></i>
          </span>
        </div>
      </article>
    `;
    return tweetElement;
  };

  $('.form-container').on('submit', function(event) {
    event.preventDefault();
    const tweetData = $(this).serialize();
    const decodedTweet = decodeURIComponent(tweetData).substring(5);
    $('.error-empty').slideUp();
    $('.error-toolong').slideUp();
    if (!decodedTweet) {
      $('.error-empty').slideDown();
    } else if (decodedTweet.length > 140) {
      $('.error-toolong').slideDown();
    } else {
      $.post('/tweets/',
        tweetData,
        function() {
          loadTweets();
        });
      $("#tweet-text").val("");
      $(".counter").val(140);
    }
  });

  $('.arrow').on('click', function(event) {
    if ($('.new-tweet').is(':hidden')) {
      console.log('u click its hidden');
      $('.new-tweet').slideDown();
      $('tweet-text').scrollTop();
      $('#tweet-text').focus();
    } else {
      $('.new-tweet').slideUp();
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
  $('.error-empty').hide();
  $('.error-toolong').hide();
  $('.new-tweet').hide();

  loadTweets();
});