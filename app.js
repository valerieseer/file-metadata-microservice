const express = require('express');
const multer = require('multer');

const app = express();
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage }).single('user-image');
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.post('/image-size',function(req, res){
    upload(req, res, function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }

        var obj = {
          "image-size": req.file.size + ' bytes'
        }
        res.send(obj);
    });
});

app.listen(port, function () {
  	console.log('Listening on port ' + port);
});

// Saving this for later reference
// app.get('/',function(req,res){
//     res.sendFile(__dirname + '/public/index.html');
// });
