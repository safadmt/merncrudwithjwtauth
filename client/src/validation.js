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
    username: string().trim().required("Username is required")
    .min(3, "Username must be atleast 3 charactors long"),
    email: string().trim().email("Provide a valid email").required("Email is required"),
    password: string().trim("Password is required").required("Password is required")
    .min(8, "Password minimum 8 charactors required")
    .max(50, "Maximu 50 charactors are allowed")
})
export { productSchema , userSchema};
