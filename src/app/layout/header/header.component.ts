import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StorageService } from 'src/app/auth/storage.service';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/auth/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() listHousingEstates: any[];
  @Output() selectedHousingEstate = new EventEmitter();
  public serviceGuard: User;

  constructor(private storageService: StorageService,
    private _loginService: LoginService) { }

  ngOnInit() {
    this.serviceGuard = this.storageService.getCurrentSession();
  }

  changeHousingEstate(position: number) {
    this.selectedHousingEstate.emit(this.listHousingEstates[position]);
  }

  public logout(): void {
    this._loginService.logout()
      .subscribe(
        data => {
          this.storageService.logout();
        },
        error => {
          console.info(error);
        }
      );
  }

}
