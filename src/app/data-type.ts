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