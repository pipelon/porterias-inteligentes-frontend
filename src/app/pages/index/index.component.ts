import { Component, OnInit } from '@angular/core';
import { HousingestateService } from 'src/app/services/housingestate.service';
import { HousingEstate } from 'src/app/models/housingestate';
import { Apartments } from 'src/app/models/apartment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public dataHousingEstate: HousingEstate;
  public dataAptoFound: Apartments[] = [];
  public phone_number: string = '';
  public lat: number;
  public lng: number;
  public zoom: number = 10;
  public search: string = '';

  constructor(private _service: HousingestateService) { }

  ngOnInit() {
    this.getHousingEstates();
  }

  getHousingEstates() {
    this._service.getHousingEstates()
      .subscribe(
        data => {
          this.dataHousingEstate = data;
          if (this.dataHousingEstate.location) {
            let arrayCoord = this.dataHousingEstate.location.split(",");
            this.lat = parseInt(arrayCoord[0]);
            this.lng = parseInt(arrayCoord[1]);
          }
          console.info(this.dataHousingEstate);
        },
        error => {
          console.info('Error: ', error);
        }
      );
  }

  selectedNumber(tecla: string) {
    let pn = this.phone_number.concat(tecla);
    this.phone_number = pn;
  }

  deletedNumber() {
    let pn = this.phone_number.slice(0, -1);
    this.phone_number = pn;
  }

  call() {
    console.info(this.phone_number);
  }

  onSearchChange(searchValue: string) {
    this.search = searchValue;
  }

  callApartmentll(number: string) {
    console.info('number', number);
  }
  searchApartment() {
    if (this.search && this.search != '') {
      this._service.getSearchApartment(this.search)
        .subscribe(
          data => {
            this.dataAptoFound = data;
          },
          error => {
            this.dataAptoFound = [];
            console.info('Error: ', error);
          }
        );
    }
  }


}
