import { Component, OnInit } from '@angular/core';
import { HousingestateService } from 'src/app/services/housingestate.service';
import { HousingEstate } from 'src/app/models/housingestate';
import { Apartments } from 'src/app/models/apartment';
import { DomSanitizer } from '@angular/platform-browser';
import { SocketService } from 'src/app/services/socket.service';
import { Subscription } from 'rxjs';

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
  public HousingEstate: any;
  public housingEstateID: number;
  public sub: Subscription;
  public horusAlerts = [];
  public housingEstateAsoc = true;

  constructor(private _service: HousingestateService,
    private sanitizer: DomSanitizer,
    private socketService: SocketService) { }

  ngOnInit() {
    this.getHousingEstates();
    this.getAlerts();
  }

  getAlerts() {
    this.sub = this.socketService.onAlerts()
      .subscribe(data => {
        this.horusAlerts.unshift(data);
      });
  }

  getSafeUrlCamera(IP: string, code: string) {
    return IP + '/zm/?view=watch&mid=' + code + '&scale=14&showControls=false';
  }

  getSelectedHousingEstate(selectedHousingEstate: any) {
    this.HousingEstate = selectedHousingEstate;
    this.housingEstateID = this.HousingEstate.id;
    if (this.HousingEstate.location) {
      let arrayCoord = this.HousingEstate.location.split(",");
      this.lat = parseInt(arrayCoord[0]);
      this.lng = parseInt(arrayCoord[1]);
    }
    this.dataAptoFound = [];
  }

  getHousingEstates() {
    this._service.getHousingEstates()
      .subscribe(
        data => {
          this.dataHousingEstate = data;
        },
        error => {
          this.housingEstateAsoc = false;
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

  call(phone_number: string) {
    this._service.call(phone_number)
      .subscribe(
        data => {
          console.info('data', data);
        },
        error => {
          console.info('Error: ', error);
        }
      );
  }

  onSearchChange(searchValue: string) {
    this.search = searchValue;
  }

  callKeyboard(number: string) {
    this.call(number);
  }

  callApartment(number: string) {
    this.call(number);
  }

  openDoor(door: number) {
    this._service.openDoor(door)
      .subscribe(
        data => {
          console.info(data);
        },
        error => {
          console.info('Error: ', error);
        }
      );
  }

  closeDoor(door: number) {
    this._service.closeDoor(door)
      .subscribe(
        data => {
          console.info(data);
        },
        error => {
          console.info('Error: ', error);
        }
      );
  }

  searchApartment() {
    if (this.search && this.search != '') {
      this._service.getSearchApartment(this.housingEstateID, this.search)
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
