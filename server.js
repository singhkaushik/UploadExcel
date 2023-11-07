require("dotenv").config();
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mysql = require("mysql");
const multer = require("multer");
const path = require("path");
const readXlsxFile = require("read-excel-file/node"); // Install this package with 'npm install read-excel-file'

// Use express static folder
app.use(express.static(path.join(__dirname, "public")));

// Body-parser middleware use
app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect(function (err) {
  if (err) {
    console.error("error: " + err.message);
    return;
  }
  console.log("Connected to the MySQL server.");
});

// Multer Upload Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "/uploads/"));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Routes

// Route for Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Upload file route
app.post("/uploadfile", upload.single("uploadfile"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  importExcelData2MySQL(
    path.join(__dirname, "/uploads/", req.file.filename),
    res
  );
});

// Import Excel Data to MySQL database
function importExcelData2MySQL(filePath, res) {
  readXlsxFile(filePath).then((rows) => {
    rows.shift(); // Remove header row

    db.query(
      // for customer data upload
      //   "INSERT INTO customer (customer_id,first_name,last_name,age,phone_number,monthly_salary,approved_limit) VALUES ?",
      //   for loan data upload
      "INSERT INTO loan (customer_id,loan_id,loan_amount,tenure,interest_rate,monthly_payment,EMIs_on_Time,start_date,end_date) VALUES ?",
      [rows],
      (error, response) => {
        if (error) {
          console.error(error);
          res.status(500).send("Error importing data to MySQL.");
        } else {
          console.log(response);
          res.status(200).send("Data imported successfully.");
        }
      }
    );
  });
}

const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log(`App listening at http://localhost:${port}`);
});
