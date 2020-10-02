const Merchant = require("../../../models/merchant")
const bcrypt = require("bcrypt")

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
        }
    }
}