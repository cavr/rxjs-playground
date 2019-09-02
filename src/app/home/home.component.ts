import { Component, OnInit, OnDestroy } from '@angular/core';

import { User } from '../_models';
import { UserService } from '../_services';
import { Observable, Subscription } from 'rxjs';


@Component({ templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit , OnDestroy{
    users$: Observable<User[]>;
    newUser: User = null;
    users: User[] = null;
    constructor(private userService: UserService){};

    ngOnInit() {
       this.users$ = this.userService.users$;

       this.userService.getAll();

    }

    ngOnDestroy() {

        const subscribe:Subscription = this.users$.subscribe(()=>null);

        subscribe.unsubscribe();

    }

    getUsers(){    

        this.users = this.userService.getUsers();
    }

    setNewUser(user:any){       
        this.newUser = user;
        this.userService.getAll();   
    }
}
