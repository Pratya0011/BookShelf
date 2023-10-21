import {model, Schema} from 'mongoose';

const contentSchema = new Schema({
    _id:{
        type: String
    },
    title :{
        type:String
    },
    author:{
        type:String
    },
    image:{
        type:String
    },
    description:{
        type:String
    },
    bookType:{
        type:String
    },
    publishedDate:{
        type: String
    },
    price:{
        type:Number,
        default: 0
    },
    publisher:{
        type:String
    },
    likes:{
        type:Number
    },
    comments:[
        {
        name:{
          type: String
        },
        comment:{
          type: String
        }
      }
    ],
    __v:{
        type: String
    }
})

const content = model('content', contentSchema)
export default content