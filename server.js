const express = require('express')
const http = require('http')
const path = require('path')
const { MongoClient, ObjectID } = require('mongodb');

//const mongoDbUrl = "mongodb+srv://opensky_1:1_skyopen@openskycluster-9y8gp.gcp.mongodb.net/test?retryWrites=true&w=majority";
//const mongoDbUrl = "mongodb://opensky_1:1_skyopen@openskycluster-shard-00-00-9y8gp.gcp.mongodb.net:27017,openskycluster-shard-00-01-9y8gp.gcp.mongodb.net:27017,openskycluster-shard-00-02-9y8gp.gcp.mongodb.net:27017/test?ssl=true&replicaSet=OpenSkyCluster-shard-0&authSource=admin&retryWrites=true&w=majority";
const mongoDbUrl = "mongodb://new-user-1:new-password-1@newpostscluster-shard-00-00-fu1f4.mongodb.net:27017,newpostscluster-shard-00-01-fu1f4.mongodb.net:27017,newpostscluster-shard-00-02-fu1f4.mongodb.net:27017/test?ssl=true&replicaSet=NewPostsCluster-shard-0&authSource=admin&retryWrites=true&w=majority";
const app = express();
const PORT = process.env.PORT || 5000;
const prodEnv = app.get('env') == 'production';
var posts = [];  

app.use(express.json());

const client = new MongoClient(mongoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(function(err, db) {
    if (err) {
        console.log('error on connecting to DB - ');
        console.log(err);
        throw err;
    }
    var dbo = db.db("openskydb");
    dbo.collection("posts").find({}).toArray(function(err, result) {
        if (err) {
            console.log("error on finding records in database");
            throw err;
        }
        db.close();
        posts = result;  
    });
});    


app.get('/refresh', (req, res) => {      
    const client = new MongoClient(mongoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(function(err, db) {
        if (err) {
            console.log('error on connecting to DB');
            res.json({isSuccess: false, message: 'Error on connecting database'});
            throw err;
        }
        var dbo = db.db("openskydb");
        dbo.collection("posts").find({}).toArray(function(err, result) {
            if (err) {
                console.log("Error on fetching records from database");
                res.json({isSuccess: false, message: 'Updated successfully !!'});
                throw err;
            }
            db.close();
            posts = result;
            res.json({isSuccess: true, message: 'Updated successfully !!'}); 
        });
    });              
});
app.get('/posts', (req, res) => {  
    if(prodEnv) {
        const client = new MongoClient(mongoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        client.connect(function(err, db) {
            if (err) {
                console.log('error on connecting to DB - ');
                console.log(err);
                throw err;
            }
            var dbo = db.db("openskydb");
            dbo.collection("posts").find({}).toArray(function(err, result) {
                if (err) {
                    console.log("error on finding records in database");
                    throw err;
                }
                db.close();
                res.json(result);  
            });
        }); 
    }
    else {
        res.json(posts);
    }      
});
app.post('/addPost', (req, res) => {
    const client = new MongoClient(mongoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(function(err, db) {
        if (err) {
            console.log("error on connecting database for adding record");
            throw err;
        }
        var dbo = db.db("openskydb");
        let post = req.body;

        if(post._id){
            console.log('existing record');
            const objectId = new ObjectID(post._id);
            dbo.collection("posts").replaceOne({ "_id": objectId}, { "title": post.title, "description": post.description }, function(addErr, addResult) {
                if (addErr) {
                  console.log("error on updating record in database");
                  throw addErr;
              }
              db.close();
              res.json({message: addResult.insertedId});
              console.log("Updated successfully");
            }); 
        }
        else {
            console.log('New record');
            dbo.collection("posts").insertOne(post, function(addErr, addResult) {
                if (addErr) {
                  console.log("error on adding record in database");
                  throw addErr;
              }
              db.close();
              res.json({message: addResult.insertedId});
              console.log("Number of posts inserted: " + addResult.insertedCount);
            });   
        }         
    });
});

app.delete('/deletePost/:_id', (req, res) => {
    console.log(req.params._id);
    const client = new MongoClient(mongoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(function(err, db) {
        if (err) {
            console.log("error on connecting database for adding record");
            throw err;
        }
        var dbo = db.db("openskydb");
        const objectId = new ObjectID(req.params._id);
        var myquery = { _id: objectId };
        dbo.collection("posts").deleteOne(myquery, function(err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            db.close();
            res.json({message: 'Server response - deleted successfully'});
        }); 
    });
});

if(prodEnv) {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});

function getPosts() {
    let postList = [
        {
            "title": "Grapes",
            "description": "Grapes is of green color"
        },
        {
            "title": "Fuel",
            "description": "Fuel is of black color"
        },
        {
            "title": "Banana",
            "description": "Banana is of yellow color"
        }
    ]
    return postList;
}

