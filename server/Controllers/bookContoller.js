import content from '../model/content.js'


export const getBooks = async (req,res)=>{
    const page = parseInt(req.query.page) || 1
  const limit =  10
  const skip = (page - 1) * limit;
    try{
        const books = await content.find().skip(skip).limit(limit)
        res.status(200).send(
            {
                books,
                booksCount:result.length
            }
            )
    }catch(err){
        res.status(500).send({
            message:'Internal server error'
        })
    }
}

export const romanceBooks = async (req,res)=>{
    try{
        const books=await content.find({'bookType':'romance'})
        if(!books){
            return res.status(404).send({message:'No Books Found'})
        }else{
            return res.status(200).send({
                books,
                booksCount:books.length
            })
        }
    }catch(err){
        res.status(500).send({message:'Internal server error'})
    }
}