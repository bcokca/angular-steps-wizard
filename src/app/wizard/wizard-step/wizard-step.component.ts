import {ChangeDetectorRef, Component, forwardRef, Host, Inject, Input, OnInit} from '@angular/core';
import {WizardComponent} from '../wizard.component';

@Component({
  selector: 'app-wizard-step',
  templateUrl: './wizard-step.component.html',
  styleUrls: ['./wizard-step.component.css']
})
export class WizardStepComponent implements OnInit {

  @Input() public title: string;
  @Input() public previewMode: boolean;
  public isActive = false;
  public isDirty = false;
  public isLastElement = false;

  constructor(@Host() @Inject(forwardRef(() => WizardComponent)) public wizard: WizardComponent,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  next() {
    this.wizard.next(this);
  }

  finish() {
    console.log('finished');
  }

  getIndex() {
    return this.wizard.getIndex(this);
  }

}
