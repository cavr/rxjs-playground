import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarvelService } from '../_services/marvel.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  private detail$:Observable<Object>;

  constructor(private route:ActivatedRoute, private marvelService: MarvelService) { }

  ngOnInit() {
    this.route.params.subscribe(param => this.detail$ = this.marvelService.getDetail(param.id));
  }

}
