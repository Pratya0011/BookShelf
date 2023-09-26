import content from "../model/content.js";
import User from "../model/userModel.js";


export const currentlyReading = async(req,res)=>{
    const {id} = req.params
    const {bookId} = req.query

    try{
        if(!id || !bookId){
            res.status(404).send({
                message:'No user found'
            })
        }else{
            const user = await User.findById(id)
            if (!user) {
                return res.status(404).send({
                    message: 'User not found',
                });
            }
            if(user.currently_reading.book_id.includes(bookId)){
                res.status(409).send({
                    message:'Already reading the book'
                })
                //Remove from finished reading
            }else{
                const user = await User.findOneAndUpdate(
                    { _id: id },
                    {$push:{"currently_reading.book_id":bookId}},
                    {new:true}
                );
                const contentPromise = user.currently_reading.book_id.map(async(data)=>{
                    const list = await content.findById(data)
                    return list
                });
                const books = await Promise.all(contentPromise)
                res.status(200).send({
                    books,
                    booksCount: books.length
                })
            }
        }
    }catch(err){
        res.status(500).send({
            message:'Internal server error'
        })
    }
}

// export const finishedReading = async (req,res)=>{
//     const {id} = req.params
//     const {bookId} = req.query

//     try{
//         if(!id || !bookId){
//             res.status(400).send({
//                 message:'User not found'
//             })
//         }else{
//             const user = await User.findById(id)
//             if(!user){
//                 res.status(404).send({
//                     message: 'User not found'
//                 })
//         }
//         if()
//     }
// }
// }
