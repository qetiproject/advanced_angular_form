import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss'],
  standalone: true,
  imports: [NgTemplateOutlet]
})
export class WeatherWidgetComponent implements OnInit {
  @Input()
  headerTemplate!: TemplateRef<any>;
  
  @Input()
  contentTemplate!: TemplateRef<any>;

  constructor() { }

  ngOnInit(): void {
  }

}
