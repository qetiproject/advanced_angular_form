import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { WeatherWidgetComponent } from '../weather-widget/weather-widget.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  standalone: true,
  imports: [CommonModule, WeatherWidgetComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WeatherComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
