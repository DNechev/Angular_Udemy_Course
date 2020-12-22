import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CourseProject';
  selectedFeature = 'recipe';

  setSelectedFeatureToShow(eventArgs: string) {
    this.selectedFeature = eventArgs;
  }
}
