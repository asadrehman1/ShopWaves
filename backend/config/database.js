const mongoose = require('mongoose');

const connectDatabase = () => {
    main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce');
  console.log("MongoDB is connected with server");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
}
module.exports = connectDatabase;