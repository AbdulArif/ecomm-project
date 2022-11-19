export interface SignUp{
    [x: string]: any;
    name: string,
    password: string,
    email: string,
    addedDate: Date,
    updatedDate: Date
}

export interface Login{
    email: string,
    password: string
}
// export interface Product{
//     id: Number
//     name: string
//     price: string
//     color: string
//     category: string
//     description: string
//     image: string
// }
export interface Product{
    id?:string;
    code?:string;
    name?:string;
    price?:number;
    color?: string
    category?:string;
    description?:string;
    image?:string;
    quantity?:number;
    inventoryStatus?:string;
    rating?:number;
}