const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

global.bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb',
  parameterLimit: 100000
}))
app.use(bodyParser.json({
  limit: '50mb',
  parameterLimit: 100000
}))

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;

let gfs;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
  gfs = new mongoose.mongo.GridFSBucket(connection.db, {
    bucketName: "fs"
  });
})

// Code for uploading files

const storage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
      };
      resolve(fileInfo);
    });
  }
});

const upload = multer({
  storage
});

app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req)
  res.status(200).json({ id: req.file.id })
});

// Example of front-end download
// <a href={'http://localhost:5000/download/5fb7e411d4e3bb63c0b6e7d2'} target="_blank" download>Download</a>
app.get("/download/:id", (req, res) => {
  gfs
    .find({ _id: new mongoose.Types.ObjectId(req.params.id) })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist"
        });
      }

      res.setHeader('Content-Type', files[0].contentType);
      res.setHeader('Content-Disposition', 'attachment; filename=' + files[0].filename);
      res.setHeader('Content-Length', files[0].length);
      gfs.openDownloadStream(new mongoose.Types.ObjectId(req.params.id)).pipe(res);
    });
});

// Code for uploading files - End

const userRouter = require('./routes/user');
// to use the file
app.use('/users', userRouter);
const courseRouter = require('./routes/course');
app.use('/courses', courseRouter);

const positionRouter = require('./routes/position');
// allow for the application to use the position router
app.use('/positions', positionRouter);

const socialInitiativeRouter = require('./routes/socialinitiative');
app.use('/initiatives', socialInitiativeRouter);

const applicationRouter = require('./routes/application');
app.use('/applications', applicationRouter)

const postRouter = require('./routes/posts');
app.use('/posts', postRouter)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
