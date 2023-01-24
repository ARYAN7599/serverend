const port = process.env.PORT || 5000;
const express = require('express');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, "images");

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(cors());
app.use(fileUpload());
app.use('/images', express.static('./images'));

app.post('/upload', function (req, res) {
    let sampleFile;
    let uploadPath;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
console.log("req.files", req.files);
    sampleFile = req.files.newFile;
    console.log("samplefiles",sampleFile);
    uploadPath = __dirname + '/images/' + sampleFile.name;

    sampleFile.mv(uploadPath, function (err) {
        if (err)
            return res.status(500).send(err);

        res.send('File uploaded!');
    });
});

app.get("/", (req, res) => {
    fs.readdir(dirPath, (err, images) => {
        return res.send(images);
    })

});

app.delete("/upload", (req, res) => {
    console.log(`file Deleted`)
    return res.status(200).json({result: true, msg: 'file deleted'})

});

app.listen(port, () => console.log(`${port}`))