var friends = require("../data/friends.js");



module.exports = function (app){
  //route that views friends
  app.get("/api/friends", function (req,res) {
    console.log("reading api..");
    res.json(friends);
  });
  
  app.post("/api/friends", function(req,res){
    // determine best match
    var bestMatch = {
      name: "",
      photo: "",
      friendDiff: 1000 //tracks the diff btw answers
    };

    // get all the user Data from the survey
    var userData = req.body;
    var userScores = userData.scores;

    // calculating totalDifference btw user and [friends]
    var totalDifference = 0;
    // loop through [friends]
    for (var i = 0; i < friends.length; i++) {
      // console.log(friends[i]);
      totalDifference = 0;
      // loop through scores while looping through [friends]
      for (var j = 0; j < friends[i].scores[j]; j++) {
        // difference between current user's scores against those from other users,
        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j])); 

        if (totalDifference <= bestMatch.friendDiff) {
          //conditional determines best match and sets the info to display
          bestMatch.name =friends[i].name;
          bestMatch.photo =friends[i].photo;
          bestMatch.friendDiff =totalDifference;
        };
      };
    };
    // saves userData
    friends.push(userData);
    // json of the best match
    res.json(bestMatch);
  });
};