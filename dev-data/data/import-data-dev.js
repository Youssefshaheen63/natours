const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Review = require('./../../models/reviewModel');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose.connect(DB).then((con) => console.log('DB connection Successfully'));

// Read Data
const data = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));

const importData = async () => {
  try {
    await Review.create(data);
    console.log('Dat Successfully loaded');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async () => {
  try {
    await Review.deleteMany();
    console.log('Dat Successfully deleted');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
