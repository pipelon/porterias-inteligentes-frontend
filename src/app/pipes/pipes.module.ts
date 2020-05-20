import { NgModule } from '@angular/core';
import { GatesstatesPipe } from './gatesstates.pipe';
import { SafeurlPipe } from './safeurl.pipe';

@NgModule({
  declarations: [GatesstatesPipe, SafeurlPipe],
  exports: [ GatesstatesPipe, SafeurlPipe ]
})
export class PipesModule { }
