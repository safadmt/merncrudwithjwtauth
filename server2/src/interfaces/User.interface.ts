export interface User {
    user_id? : number,
    username : string,
    email : string,
    password : string,
    deleted? : boolean,
    created_at? : Date,
    updated_at? : Date
}

