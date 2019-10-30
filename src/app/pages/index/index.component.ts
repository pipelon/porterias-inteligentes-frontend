import { Component, OnInit } from '@angular/core';
import { HousingestateService } from 'src/app/services/housingestate.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private _service: HousingestateService) { }

  ngOnInit() {
    this.getHousingEstates();
  }

  getHousingEstates() {
    this._service.getHousingEstates()
      .subscribe(
        data => {
          console.info('data: ', data);
        },
        error => {
          console.info('Error: ', error);
        }
      );
  }

}
