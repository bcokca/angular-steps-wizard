/**
 * Created by bcokca on 12/20/17.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WizardComponent} from './wizard.component';
import {WizardStepComponent} from './wizard-step/wizard-step.component';


export * from './wizard.component';
export * from './wizard-step/wizard-step.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    WizardComponent,
    WizardStepComponent
  ],
  exports: [
    WizardComponent,
    WizardStepComponent
  ]
})
export class WizardModule {

}
