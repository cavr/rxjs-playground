import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MarvelService } from '../_services/marvel.service';
import { Observable } from 'rxjs';
import { debounce, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-marvel-list',
  templateUrl: './marvel-list.component.html',
  styleUrls: ['./marvel-list.component.css']
})
export class MarvelListComponent implements OnInit {

  private marvelForm:FormGroup;

  private marvelResult:Observable<Array<any>>

  constructor(private formBuilder:FormBuilder, private marvelService: MarvelService) {
   
   }

  ngOnInit() {
    this.marvelForm = this.formBuilder.group({
      search: [''],     
    });
    this.marvelResult = this.marvelService.marvelResult$;
    this.onChanges();
  }

  private onChanges(){
    this.marvelForm.get('search').valueChanges.pipe(debounceTime(500)).subscribe((value)=>{
      this.marvelService.getMarvelList(value);
    })
  }

}
