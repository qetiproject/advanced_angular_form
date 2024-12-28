import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'cfc-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  animations: [
    trigger('dropDown', [
      state('void', style({ transform: 'scaleY(0)', opacity: 0 })),
      state('*', style({ transform: 'scaleY(1)', opacity: 1 })),
      transition(':enter', [animate('320ms cubic-bezier(0, 1, 0.45, 1.34)')]),
      transition(':leave', [animate('420ms cubic-bezier(0.88,-0.7, 0.86, 0.85)')]),
    ])
  ]
})
export class SelectComponent implements OnInit {

  @Input()
  label = ''

  @Input()
  value: string | null = null;

  @HostListener('click')
  open() {
    this.isOpen = true;
  }
  
  @Output()
  readonly opened = new EventEmitter<void>();

  @Output()
  readonly closed = new EventEmitter<void>();
  
  isOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onPanelAnimationDone({ fromState, toState }: any) {
    if (fromState === 'void' && toState === null && this.isOpen) {
      this.opened.emit();
    }
    if (fromState === null && toState === 'void' && !this.isOpen) {
      this.closed.emit();
    }
  }

  close(){
    this.isOpen = false;
  }
  
}
