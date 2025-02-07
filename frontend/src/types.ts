import {MouseEvent, ChangeEvent } from "react"; 

export interface Job {
    title: string;
    content: string;
    company: string;
    _id?: string;
    userId?: string;
    createdOn?: string;  
}

export interface User{
    _id: string;
    // fullName: string;
    email: string;
    // password: string;
    // createdOn: string;
}

export interface JobRowProps{
    title: string
    date: string,
    content: string, 
    company: string, 
    onEdit (e: MouseEvent) : void, 
    onDelete(e: MouseEvent): void, 
    tableIndex: number,
    jobPoster: string, 
    currentUser: string
}

export interface UserInfoProps{
    userInfo: User, 
    onLogout (): void
}

// export interface EditJobProps{
//     jobData: Job
// }

export interface PasswordInputProps{
    value: string 
    onChange (e : ChangeEvent<HTMLInputElement>) : void, 
    placeholder : string

}

// export interface NavBarProps{
//     userInfo: User,
//     onSearchJob(query : string) : void,
//     handleClearSearch() : void, 

// }