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
//     id: number
//     name: string
//     price: string
//     color: string
//     category: string
//     description: string
//     image: string
// }
export interface Product{
    id?:number;
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

export interface Cart{
    name:string,
    price:number,
    category:string,
    color:string,
    image:string,
    description:string,
    id:number| undefined,
    quantity:undefined | number,
    productId:number| undefined,
    userId:number| undefined
  }

  export interface PriceSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
  }
  
  export interface Order {
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:string,
    id:number|undefined
  }