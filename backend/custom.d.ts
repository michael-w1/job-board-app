// import { Request } from "express"
// import jwt, {Secret, JwtPayload} from 'jsonwebtoken';
// declare global {
//     declare namespace Express {
//         export interface Request {
//             // For attaching to request
//             userId?: string
//             user?: any
//         }
//     }
// }


// import 'express'
// import jwt from 'jsonwebtoken'

// declare global {
//   namespace Express {
//     interface Request {
//       user?: jwt.JwtPayload // { uid: string; role: string }
//     }
//   }
// }


// export interface User{
//     fullName?: string
//     email?: string 
//     password?: string
//     createdOn?: Date
//     _id?: string 

// }

// declare global {
//     namespace Express {
//       interface Request {
//         user?: User;  // Add the 'user' property to the Request interface
//       }
//     }
//   }