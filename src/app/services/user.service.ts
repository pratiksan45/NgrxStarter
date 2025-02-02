import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user.models";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class UserService{
    private url = 'https://jsonplaceholder.typicode.com/users';

    constructor(
        private http : HttpClient
    ){}

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.url)
    }

    updateUser(user: Partial<User>): Observable<User> {  
        // console.log(`${this.apiUrl}/${user.id}`, user)    ;  
        return this.http.patch<User>(`${this.url}/${user.id}`, user)
    }
}