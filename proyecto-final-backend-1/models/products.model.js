import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

mongoose.pluralize(null);

const productSchema = new mongoose.Schema({
	code: String,
	title: String,
	status:String,
	price: Number,
	description: String,
	category: String,
    stock: Number,
    thumbnails: Array,
	idNumber: Number
});

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model('products', productSchema);

