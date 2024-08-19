import { object, string, number } from 'yup';

let productSchema = object({
    name: string()
        .min(4, 'Product name must be at least 4 characters long')
        .required('Product name is required'),
    
    price: number()
        .required('Price is required')
        .positive('Price must be a positive number')
        .integer('Price must be an Number'),

    model: string()
        .required('Model is required'),

    description: string()
        .required('Description is required'),

    image: string()// Assuming 'image' is a URL or string; otherwise, adjust accordingly
        .required('Image is required')
});

export { productSchema };
