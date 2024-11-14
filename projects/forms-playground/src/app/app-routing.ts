import { Routes } from '@angular/router';
import { TaskFormComponent } from './playgrounds/task-form/task-form.component';
import { WeatherWidgetComponent } from './playgrounds/weather-widget/weather-widget.component';
import { WeatherComponent } from './playgrounds/weather/weather.component';

export const routes: Routes = [
  
  {
    path: 'task-form',
    component: TaskFormComponent
  },
  {
    path: 'weather',
    component: WeatherComponent
  }
];