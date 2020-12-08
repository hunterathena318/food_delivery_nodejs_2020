const Merchant = require("../../../models/merchant")
const Restaurant = require("../../../models/Restaurant")
const Device = require("../../../models/device.model")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

module.exports = {
    Mutation: {
        createMerchant: async (_,{merchantInput}) =>  {
            const ex_merchant = await Merchant.findOne({ email: merchantInput.email })
            if(ex_merchant) throw new Error("Merchant already exist")
            let hash = await bcrypt.hash(merchantInput.password, 10)
            const newMerchant = new Merchant({
                ...merchantInput,
                password: hash
            })
            await newMerchant.save()
            return {
                ...newMerchant._doc,

                
                id: newMerchant._id
            }
        },
        merchantLogin: async (_, { loginInput }) => {
            const { email, password, fcmTokenMerchant, uniqueId } = loginInput;
            // console.log(userValidate.loginValidate({ email, password }).error);
            // console.log(email, password);
            const merchant = await Merchant.findOne({ email });
            if (!merchant) throw new Error("Email does not exist");
            const isEqual = await bcrypt.compare(password, merchant.password);
            if (!isEqual) throw new Error("Wrong password");
            const token = jwt.sign({ merchantId: merchant._id, email: merchant.email }, process.env.JWT_KEY, {
                expiresIn: '2h'
            })
            await Device.findOneAndUpdate(
              { uniqueId },
              { merchant, fcmTokenMerchant },
              { new: true, upsert: true }
            );
            return {
              merchantId: merchant._id,
              fName: merchant._doc.fName,
              lName: merchant._doc.lName,
              authToken: token,
              tokenExpiration: 2
            }
        }
    },
    Merchant: {
        createdRestaurants: async ({ _id }) => {
          return await Restaurant.findOne({ merchant: _id })
        }
    }
}