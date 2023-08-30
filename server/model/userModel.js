import {model,Schema} from 'mongoose';

const userModel = new Schema({
    name:{
        type: String
    },
    email :{
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    role:{
        type:String
    },
    picture:{
        type:String
    },
    createdAt:{
        type: Date,
        default: new Date()
    },
    currently_reading:{
        book_id:{
            type:Array,
            default:[]
        }
    },
    finished_reading:{
        book_id:{
            type:Array,
            default:[]
        }
    },
    liked:{
        book_id:{String},
        count:{Number}
    },
    friendList:{
        friends_id:{
            type:Array,
            default:[],
        }
    },
    suggested:{
        friends_id:{
            type:String
        },
        books_id:{
            type:Array,
            default:[]
        }
    }

});

const User = model('user', userModel)
export default User