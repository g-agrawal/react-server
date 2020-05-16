const express = require('express')
const path = require('path')
const { MongoClient } = require('mongodb');

//const mongoDbUrl = "mongodb+srv://opensky_1:1_skyopen@openskycluster-9y8gp.gcp.mongodb.net/test?retryWrites=true&w=majority";
const mongoDbUrl = "mongodb://opensky_1:1_skyopen@openskycluster-shard-00-00-9y8gp.gcp.mongodb.net:27017,openskycluster-shard-00-01-9y8gp.gcp.mongodb.net:27017,openskycluster-shard-00-02-9y8gp.gcp.mongodb.net:27017/test?ssl=true&replicaSet=OpenSkyCluster-shard-0&authSource=admin&retryWrites=true&w=majority";

const app = express();
const PORT = process.env.PORT || 5000;
const prodEnv = app.get('env') == 'production';
var posts = [];

const client = new MongoClient(mongoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(function(err, db) {
        if (err) {
            console.log('error on connecting to DB - ');
            console.log(err);
            throw err;
        }
        var dbo = db.db("openskydb");
        dbo.collection("posts").find({}, { projection: { _id:0, id: 1, title: 1, body: 1 } }).toArray(function(err, result) {
          if (err) {
              console.log("error on finding records in database");
              throw err;
          }
          posts = result;
          db.close();
        });
      });  

app.get('/posts', (req, res) => {    
    res.json(posts); 
});

app.get('/addPosts', (req, res) => {
    MongoClient.connect(mongoDbUrl, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        let posts = getPosts();``
        dbo.collection("posts").insertMany(posts, function(dberr, dbres) {
          if (dberr) throw dberr;
          console.log("Number of posts inserted: " + dbres.insertedCount);
          db.close();
        });
      });
    
});

if(prodEnv) {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});

