import {
  AfterContentInit,
  forwardRef,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  OnInit,
  QueryList
} from '@angular/core';
import {WizardStepComponent} from './wizard-step/wizard-step.component';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit, AfterContentInit {

  @ContentChildren(WizardStepComponent) wizardSteps: QueryList<WizardStepComponent>;
  private steps: any[];

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.steps = [];
    this.wizardSteps.forEach(item => {
      item.isActive = false;
      item.isDirty = false;
      this.steps.push(item);
    });

    if (this.steps.length > 0) {
      this.steps[0].isActive = true;
      this.steps[0].isDirty = true;
      this.steps[this.steps.length - 1].isLastElement = true;
    }
    // this.cdr.detectChanges();
  }

  next(elem: WizardStepComponent) {
    const index = this.steps.indexOf(elem);
    elem.isActive = false;
    this.steps[index + 1].isActive = true;
    this.steps[index + 1].isDirty = true;
  }

  getIndex(elem: WizardStepComponent) {
    return this.steps.indexOf(elem);
  }

}