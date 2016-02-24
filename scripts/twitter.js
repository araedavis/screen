(function(module){
  var twitter = {};

  twttr.widgets.load();
  // twitter.auth = function(callback){
  //   $.ajax({
  //     url: 'https://api.twitter.com/1.1/statuses/update.json',
  //     type: 'POST',
  //     success: function(data, status, xhr){
  //       console.log(data);
  //       //callback call goes here
  //     }
  //   });
  // };


  module.twitter = twitter;
})(window);
