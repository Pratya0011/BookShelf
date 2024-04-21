import { model, Schema } from "mongoose";

const contentSchema = new Schema({
  _id: {
    type: String,
  },
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  bookType: {
    type: String,
  },
  publishedDate: {
    type: String,
  },
  price: {
    type: Number,
    default: 0,
  },
  publisher: {
    type: String,
  },
  likes: {
    type: Number,
  },
  comments: [
    {
      name: {
        type: String,
      },
      comment: {
        type: String,
      },
    },
  ],
  ratings: {
    type: Number,
    default: 0,
  },
  ratings_count: {
    type: Number,
    default: 0,
  },
  want_to_read: {
    type: Number,
    default: 0,
  },
  currentle_reading: {
    type: Number,
    default: 0,
  },
  have_read: {
    type: Number,
    default: 0,
  },
  __v: {
    type: String,
  },
});

const content = model("content", contentSchema);
export default content;
