import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse , HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http'; 
import { Observable, of, throwError} from 'rxjs';
import { delay, mergeMap, materialize, dematerialize} from 'rxjs/operators';

import { User } from '../_models';


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
     users: User[] = [
        { id:1, username:'test', password: 'test', firstName:'Test', lastName:'User' }
    ];
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        
        
        const authHeader = request.headers.get('Authorization');
        const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');

        return of(null).pipe(mergeMap(()=>{            

            if(request.url.endsWith('/users/authenticate') && request.method ==='POST'){
                const user = this.users.find(x => x.username === request.body.username && x.password === request.body.password);
                if(!user){ return error('Username or password is incorrect')};
                return ok({
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    token: `fake-jwt-token`                    
                });
                
            }

            if(request.url.endsWith('/users') && request.method === 'GET'){
                if(!isLoggedIn){
                    return unathorised();
                }
                return ok(this.users);
            }

            if(request.url.endsWith('/users') && request.method === 'POST'){               
                if(!isLoggedIn){
                    return unathorised();
                }
                this.users = [...this.users, request.body];
                return ok(request.body)
            }

            return next.handle(request);

        }), materialize(), delay(500), dematerialize())
    

    function ok(body){
        return of(new HttpResponse({status: 200, body}));
    }

    function unathorised(){
        return throwError({status: 401, error: {message: 'Unaauthorise'}});
    }

    function error(message){
        return throwError({status:400, error:{message}});
    }
    }
}

export const fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
}