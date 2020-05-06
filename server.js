const express = require('express')
const path = require('path')

const app = express();
const PORT = process.env.PORT || 5000;
const prodEnv = app.get('env') == 'production';

app.get('/posts', (req, res) => {
       //res.header("Access-Control-Allow-Origin", "*");
       let posts = getPosts();
       res.json(posts);   
});

if(prodEnv) {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

function getPosts() {
    let postList = [
        {
            "id": 1,
            "title": "Grapes",
            "body": "Grapes is of green color"
        },
        {
            "id": 2,
            "title": "Fuel",
            "body": "Fuel is of black color"
        },
        {
            "id": 3,
            "title": "Banana",
            "body": "Banana is of yellow color"
        }
    ]
    return postList;
}

