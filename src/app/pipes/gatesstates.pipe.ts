import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gatesstates'
})
export class GatesstatesPipe implements PipeTransform {

  transform(value: any, state: number, state_description: string): any {
    
    return "<button type='btn btn-success'>" + value + "</buton>";
  }

}
