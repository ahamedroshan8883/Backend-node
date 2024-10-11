const customAPIError = require("../Error/customAPIError");
const cartModel = require("../Models/cartModel");
const userModels = require("../Models/userModels");

const AddCartItem = async (req,res,next)=>{
    const reqBody = req.body;
    const user = await userModels.findOne({email:reqBody.user})
    console.log(reqBody);
    
    try{
        // return error if there is no user found
        if(!user){
           return next(new customAPIError("User not found",404));
        }
        
        const ExistingCart = await cartModel.findOne({user:reqBody.user});
        // If a cart already existing at that email it will add that particular product.
            console.log(ExistingCart);
            
        
        if(!ExistingCart){
            const cart ={
                products:[{
                    id:reqBody.id,
                    title:reqBody.title,
                    image:reqBody.image,
                    price:reqBody.price,
                    quantity:reqBody.quantity,
                    selectedSize:reqBody.selectedSize
                }],
                totalQuantity:reqBody.quantity,
                totalPrice:Number(reqBody.quantity)*Number(reqBody.price),
                user:reqBody.user
        }
            //cart dosen't exist create a cart. 
            await cartModel.create(cart);
            return res.status(200).send("Successfully added");
        }else{
            const prodcutIndex = ExistingCart.products.findIndex(item=>item.id===reqBody.id &&  reqBody.selectedSize===item.selectedSize );            
            const ExistingProduct = ExistingCart.products[prodcutIndex];
            console.log(ExistingProduct);
            if(prodcutIndex !==-1){
                ExistingProduct.quantity += reqBody.quantity;
                ExistingCart.totalQuantity = Number(ExistingCart.totalQuantity)+Number(reqBody.quantity);
                ExistingCart.totalPrice += Number(reqBody.quantity)*Number(reqBody.price);
                await ExistingCart.save();
                res.status(200).send("Successfully added")
            }else{
                ExistingCart.products.push(reqBody);
                ExistingProduct.quantity += reqBody.quantity;
                ExistingCart.totalQuantity = Number(ExistingCart.totalQuantity)+Number(reqBody.quantity);
                ExistingCart.totalPrice += Number(reqBody.quantity)*Number(reqBody.price);
                res.status(200).send("Successfully added")
            }
        }
    }catch(error){
        next(new customAPIError(error,500));
    }
}
const getCartByUser = async(req,res,next)=>{
    try{
        console.log(req.params.user);
        
        const Cart = await cartModel.findOne({user:req.params.user});
        res.status(200).json(Cart);
    }catch(error){
        next(new customAPIError(error,500));
    }
}

const IncreaseQuantity = async(req,res,next)=>{
    const reqBody = req.body;
    const Cart = await cartModel.findOne({user:reqBody.user});
    try{
        const productIndex = Cart.products.findIndex(item=>item.id===reqBody.id && item.selectedSize===reqBody.selectedSize);
        const product = Cart.products[productIndex];
        // console.log(product);
        
        if(productIndex!==-1){
            if(product.quantity>=1){
                product.quantity+=1;
                Cart.totalQuantity+=1;
                Cart.totalPrice+=Number(product.price);
                await Cart.save();
                res.status(201).send("Item quantity Decreased");
            }
        }else{
            return next(new customAPIError("no product found",404));
        }
    }catch(error){
        next(new customAPIError(error,500));
    }
}
const DecreaseQuantity = async(req,res,next)=>{
    const reqBody = req.body;
    const Cart = await cartModel.findOne({user:reqBody.user});
    try{
        const productIndex = Cart.products.findIndex(item=>item.id===reqBody.id && item.selectedSize===reqBody.selectedSize);
        const product = Cart.products[productIndex];
        // console.log(product);
        
        if(productIndex!==-1){
            if(product.quantity>1){
                product.quantity-=1;
                Cart.totalQuantity-=1;
                Cart.totalPrice-=Number(product.price);
                await Cart.save();
                res.status(201).send("Item quantity Decreased");
            }else{
                console.log(product);
                Cart.products.remove(product);
                Cart.totalQuantity-=1;
                Cart.totalPrice-=Number(product.price);
                await Cart.save();
                res.status(201).send("Item removed");
            }
        }else{
            return next(new customAPIError("no product found",404));
        }
    }catch(error){
        next(new customAPIError(error,500));
    }
}
const RemoveCartItem = async (req, res, next) => {
    const { user, id, selectedSize } = req.body.product; // Extracting fields from req.body
    
        try {
             // Find the cart of the user
        const Cart = await cartModel.findOne({ user: user });
        // Find the cart removing product 
        const productToRemove = Cart.products.find(item => (item.id === id && item.selectedSize === selectedSize));
        console.log(productToRemove);
        
        if (!Cart) {
            return next(new customAPIError("No cart found", 404));
        }

        // Filter out the product with the matching id and selectedSize
        Cart.products = Cart.products.filter(
            item => !(item.id === id && item.selectedSize === selectedSize)
        );
        Cart.totalQuantity -= productToRemove.quantity;
        Cart.totalPrice -= productToRemove.quantity*productToRemove.price;
        await Cart.save();
        
             
        if(!Cart){
            return next(new customAPIError("no item found"),404);
        }
        res.status(200).send("item removed successfully");
    }catch(error){
        next(new customAPIError(error,500));
    }
}

const clearCart = async(req, res, next) => {
    try {
        console.log(req);
        
        const Cart = await cartModel.findOneAndDelete({ user: req.body.user });
        console.log(Cart);
        
        if (Cart) {
            res.status(200).send("Cart successfully deleted");
        } else {
            next(new customAPIError("Cart not found", 404)); // Error handling for not found
        }
    } catch (error) {
        next(new customAPIError(error.message, 500)); // Error handling for server errors
    }
};

module.exports= {AddCartItem,IncreaseQuantity,DecreaseQuantity,RemoveCartItem,getCartByUser,clearCart};