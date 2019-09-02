import { Component, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



import { UserService } from '../_services';
import { EventEmitter } from '@angular/core';
import { User } from '../_models';


@Component({selector:'user-form', templateUrl: 'user.component.html'})
export class UserComponent implements OnInit {
    userForm: FormGroup;
    loading= false;
    submitted = false;
    returnUrl: string;
    error = '';

    @Output()
    setNewUser: EventEmitter<User> = new EventEmitter<User>();

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService
    ){}

    ngOnInit(){
        this.userForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required]
        });
                
    }

    get f() { return this.userForm.controls; }

    sendNewUser(){        
        const user = Object.keys(this.f).reduce((accum:object, current:string) => ({
            ...accum,
            [current]: this.f[current].value
        }),{});

        debugger;

        this.setNewUser.emit(user);
    }

    onSubmit() {
        this.submitted = true;

        if(this.userForm.invalid){
            return;
        }

        this.loading = true;

        const user:any = Object.keys(this.f).reduce((accum:any,element:any)=>{
            return {
                ...accum,
                [element]: this.f[element].value
            }
        },{});

        this.userService.addUser(user).subscribe((element)=>{
           this.setNewUser.emit(element);
        });

        this.loading = false;
    }
}