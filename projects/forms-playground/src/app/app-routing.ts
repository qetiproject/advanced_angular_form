import { Routes } from '@angular/router';
import { TaskFormComponent } from './playgrounds/task-form/task-form.component';
import { WeatherWidgetComponent } from './playgrounds/weather-widget/weather-widget.component';
import { WeatherComponent } from './playgrounds/weather/weather.component';
import { ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [
  
  {
    path: 'task-form',
    component: TaskFormComponent
  },
  {
    path: 'weather',
    component: WeatherComponent
  },
  {
    path: 'reactive-forms',
    title: 'Reactive Forms Playground',
    loadComponent:
      () => import('./playgrounds/reactive-forms/reactive-forms-page/reactive-forms-page.component')
        .then(m => m.ReactiveFormsPageComponent)
  },
];