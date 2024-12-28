import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cfc-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {

  @Input()
  value: string | null = null;

  @Output()
  selected = new EventEmitter<OptionComponent>();

  @HostListener('click')
  select(){
    this.isSelected = true;
    this.selected.emit(this)
  }

  @HostListener('class.selected')
  protected isSelected = false;

  constructor() { }

  ngOnInit(): void {
  }

  deselect(){
    this.isSelected = false;
  }

}
