import User from "../model/userModel.js";

export const addToCart = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(400).send({
        error: "No user with  the user id exist in db",
        message: "Cannot add to cart",
      });
    } else {
      const checkForValue = user.cart.some(
        (item) => item.book_id === body.book_id
      );
      if (checkForValue) {
        const item = user.cart.find((item) => item.book_id === body.book_id);
        const updatedPrice = item.price + body.price;
        const newItemCount = item.count + body.count;
        const filter = { _id: id, "cart.book_id": body.book_id };
        const update = {
          $set: {
            "cart.$.price": updatedPrice,
            "cart.$.count": newItemCount,
          },
        };

        const options = { new: true };

        await User.findOneAndUpdate(filter, update, options);
        res.status(200).send({
          success: true,
          message: "Item added to cart",
        });
      } else {
        await User.findByIdAndUpdate(
          id,
          {
            $push: { cart: body },
          },
          { new: true }
        );
        res.status(200).send({
          success: true,
          message: "Item added to cart",
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      error: error,
      message: "Internal Server Error",
    });
  }
};
