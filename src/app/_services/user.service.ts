import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';
import { environment } from '../../environments/environment';
import { Observable,  BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {

    private usersSubject$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);

    public users$: Observable<User[]>;


    constructor(private http: HttpClient){
        this.users$ = this.usersSubject$.asObservable();        
    }


    public getUsers():User[]{       
        debugger;
        return this.usersSubject$.value;
    }

    

    public getAll(){        
         this.http.get<User[]>(`${environment.apiUrl}/users`).subscribe((users:User[])=>{
            this.usersSubject$.next(users);
        })
    }

    public addUser(user:User):any{
        return this.newUser(user);
    }   

    private newUser(user:User):Observable<User[]>{        
        return this.http.post<User[]>(`${environment.apiUrl}/users`,user )
    }

    
}