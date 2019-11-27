import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() listHousingEstates: any[];
  @Output() selectedHousingEstate = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  changeHousingEstate(position: number) {
    this.selectedHousingEstate.emit(this.listHousingEstates[position]);
  }

}
