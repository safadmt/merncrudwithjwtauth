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


const userSchema = object({
    username: string()
    .min(3, "Username must be atleast 3 charactors long").trim("Username is required")
    .required("Username is required"),
    email: string().email("Provide a valid email").required("Email is required"),
    password: string().min(8, "Password minimum 8 charactors required").required("Password is required")
})
export { productSchema , userSchema};
