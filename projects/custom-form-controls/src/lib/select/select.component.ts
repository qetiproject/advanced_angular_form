import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cfc-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
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
  
  isOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
