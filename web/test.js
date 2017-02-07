//Simple page getting info from Dybamo Table
//Returns results in text, this is to demo synthetic tests.
var AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-west-1",
  endpoint: "dynamodb.eu-west-1.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient();
var output = "Movies from 1985\n";
var params = {
    TableName : "Movies",
    KeyConditionExpression: "#yr = :yyyy",
    ExpressionAttributeNames:{
        "#yr": "year"
    },
    ExpressionAttributeValues: {
        ":yyyy":1984
    }
};

require("http").createServer(function(request, response){
                response.writeHeader(200, {"Content-Type": "text/plain"});
docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
        output += " -" + item.year + ": " + item.title + "\n";
        });
    }
});
response.write("Movies from 1985\n" + output);
response.end();
output="";
 }).listen(8080);
