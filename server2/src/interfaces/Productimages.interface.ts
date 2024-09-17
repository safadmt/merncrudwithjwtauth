export interface ProductImage {
    image_id? : number
    product_id : number,
    cloudinary_asset_id : string
    image_url : string,
    created_at? : Date
    updated_at? : Date
}