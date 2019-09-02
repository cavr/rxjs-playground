import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';
import { MarvelListComponent } from './marvel-list/';
import { DetailComponent } from './detail/detail.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'marvel',
    component: MarvelListComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'detail/:id',
    component: DetailComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {path: '**', redirectTo: ''}
]

export const routing = RouterModule.forRoot(appRoutes);