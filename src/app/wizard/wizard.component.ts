import {
  AfterContentInit, Component, ContentChildren, EventEmitter, forwardRef, Input, OnInit, Output, QueryList
} from '@angular/core';

import {WizardStepComponent} from './wizard-step/wizard-step.component';

@Component({
  selector: 'bc-wizard',
  template: `
    <div style="border: 1px solid #d9d9d9; border-bottom: none !important;">
      <ng-content></ng-content>
    </div>`
})
export class WizardComponent implements OnInit, AfterContentInit {

  @Output() private onFinish = new EventEmitter;
  @Input() private finishButtonText: string;

  @ContentChildren(forwardRef(() => WizardStepComponent)) wizardSteps: QueryList<WizardStepComponent>;
  private steps: any[];

  private currentActiveStep: WizardStepComponent;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.steps = [];
    this.wizardSteps.forEach(item => {
      this.steps.push(item);
    });

    if (this.steps.length > 0) {
      this.steps[0].isActive = true;
      this.steps[0].isDirty = true;
      this.currentActiveStep = this.steps[0];
      this.steps[this.steps.length - 1].isLastElement = true;
      this.steps[this.steps.length - 1].finishButtonText = this.finishButtonText || 'Finish';
    }
  }

  next(elem: WizardStepComponent) {
    const index = this.steps.indexOf(elem);
    elem.isActive = false;
    this.steps[index + 1].isActive = true;
    this.currentActiveStep = this.steps[index + 1];
    this.steps[index + 1].isDirty = true;
  }

  edit(elem) {
    this.currentActiveStep.isActive = false;
    elem.isActive = true;
    this.currentActiveStep = elem;
  }

  getIndex(elem: WizardStepComponent) {
    return this.steps.indexOf(elem);
  }

  finish() {
    this.onFinish.emit();
  }

}
