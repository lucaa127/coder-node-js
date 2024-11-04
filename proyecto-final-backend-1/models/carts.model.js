import mongoose from 'mongoose';
import { productModel } from './products.model.js';


mongoose.pluralize(null);

const cartSchema = new mongoose.Schema({
	status: String,
	products: { type: [{ _id: {type: mongoose.Schema.Types.ObjectId, ref: 'products'}, qty: Number }], required: true }
});

export const cartModel = mongoose.model('cart', cartSchema);

