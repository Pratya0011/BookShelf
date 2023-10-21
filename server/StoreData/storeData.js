import fs from 'fs'
import csv from 'csv-parser'
import content from '../model/content.js';
import { config } from "dotenv";
import mongoose from 'mongoose';

config()

mongoose.connect(process.env.MONGO,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  // Call your function to store data
  storeData()
    .then(() => {
      console.log('Data stored successfully.');
      // Close the MongoDB connection when done
      mongoose.connection.close();
    })
    .catch((error) => {
      console.error('Error storing data:', error);
      // Close the MongoDB connection on error as well
      mongoose.connection.close();
    });
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const storeData = async ()=>{
  const data = []
  try{
    await new Promise((resolve, reject) => {
      fs.createReadStream('books.csv')
        .pipe(csv())
        .on('data', (row) => {
          // Transform the row into an object
          const dataObject = {};
          for (const key in row) {
            dataObject[key] = row[key];
          }
          data.push(dataObject);
        })
        .on('end', () => {
          resolve(); // Resolve the Promise when the stream ends
        })
        .on('error', (error) => {
          reject(error); // Reject the Promise if an error occurs
        });
    });

    // Log the data array after the stream completes
    // await content.create(data);
    const randomArray = [];
  for (let i = 0; i < 10; i++) {
    const randomNumber = Math.floor(Math.random() * 900) + 100;
    randomArray.push(randomNumber);
  }
    const premiumData = data.filter(item=> item.bookType==='mostpopular').map((item)=>{
      item.price = randomArray[Math.floor(Math.random()*randomArray.length)]
      return item
  })
    const restData = data.filter(item=>item.bookType!=='mostpopular')
    let mainData = [...restData,...premiumData]
    await content.create(mainData)
  }catch(err){
    console.log(err)
  }
}
