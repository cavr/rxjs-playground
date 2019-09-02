import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { UserComponent } from '../user';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [HomeComponent, UserComponent],
    imports: [ CommonModule, ReactiveFormsModule ],
    exports: [HomeComponent],    
})
export class HomeModule {}