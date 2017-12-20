import {
  Component, EventEmitter, forwardRef, Host, Inject, Input, OnInit, Output
} from '@angular/core';
import {
  animate, animation, AnimationReferenceMetadata, style, transition, trigger,
  useAnimation
} from '@angular/animations';

import {WizardComponent} from '../wizard.component';

@Component({
  selector: 'bc-wizard-step',
  animations: [
    trigger('tabAnimation', [
      transition('false => true', [
        useAnimation(animation([
            style({opacity: '{{ from }}'}),
            animate('{{ duration }} {{ timingFunction }}', style({opacity: '{{ to }}'}))
          ],
          {
            params: {
              duration: '.25s',
              timingFunction: 'cubic-bezier(.4, 0, .2, 1)',
              from: '0',
              to: '*'
            }
          }
        ))
      ]),
      transition('true => false', [
        useAnimation(animation([
            style({opacity: '{{ from }}'}),
            animate('{{ duration }} {{ timingFunction }}', style({opacity: '{{ to }}'}))
          ],
          {
            params: {
              duration: '.25s',
              timingFunction: 'cubic-bezier(.4, 0, .2, 1)',
              from: '0',
              to: '*'
            }
          }
        ))
      ])
    ])
  ],
  templateUrl: './wizard-step.component.html',
  styleUrls: ['./wizard-step.component.css']
})
export class WizardStepComponent implements OnInit {

  @Input() public title: string;
  @Input() public nextButtonText: string;
  @Output() private onNext = new EventEmitter();

  public isActive = false;
  public isDirty = false;
  public isLastElement = false;
  public finishButtonText: string;

  public opacityAnimation = animation([
      style({opacity: '{{ from }}'}),
      animate('{{ duration }} {{ timingFunction }}', style({opacity: '{{ to }}'}))
    ],
    {
      params: {
        duration: '.25s',
        timingFunction: 'cubic-bezier(.4, 0, .2, 1)',
        from: '0',
        to: '*'
      }
    }
  );

  constructor(@Host() @Inject(forwardRef(() => WizardComponent)) public wizard: WizardComponent) {
  }

  ngOnInit() {
  }

  next() {
    this.onNext.emit();
    this.wizard.next(this);
  }

  edit() {
    this.wizard.edit(this);
  }

  finish() {
    this.wizard.finish();
  }

  getIndex() {
    return this.wizard.getIndex(this);
  }

}
