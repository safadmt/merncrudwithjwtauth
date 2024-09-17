export interface Product {
    product_id? : number
    product_name : string,
    description : string,
    price : number,
    stock_available : number,
    brand_id : number,
    category_id : number,
    created_by : number ,
    deleted: boolean,
    created_at : Date
    updated_at? : Date
}