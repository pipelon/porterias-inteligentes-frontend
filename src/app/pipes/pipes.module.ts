import { NgModule } from '@angular/core';
import { GatesstatesPipe } from './gatesstates.pipe';

@NgModule({
  declarations: [GatesstatesPipe],
  exports: [ GatesstatesPipe ]
})
export class PipesModule { }
