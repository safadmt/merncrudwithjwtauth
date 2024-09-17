import { object, string, number } from 'yup';

let productSchema = object({
    product_name: string().trim()
        .min(4, 'Product name must be at least 4 characters long')
        .required('Product name is required'),
    
    price: number()
        .required('Price is required')
        .positive('Price must be a positive number')
        .integer('Price must be an Number'),

    description: string().trim()
        .required('Description is required'),
    
    stock_available: number()
    .required('Stock availability is required')
    .positive('Stock available must be a positive number')
    .integer('Stock available must be an integer'),

    brand_id : number().
    required('Brand is reuired')
    .integer('Brand is required'),

    category_id : number().
    required('Category is reuired')
    .integer('Category is required')


});


const userSchema = object({
    username: string().trim().required("Username is required")
    .min(3, "Username must be atleast 3 charactors long"),
    email: string().trim().email("Provide a valid email").required("Email is required"),
    password: string().trim("Password is required").required("Password is required")
    .min(8, "Password minimum 8 charactors required")
    .max(50, "Maximu 50 charactors are allowed")
})
export { productSchema , userSchema};
