import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-refactored-spoon',
  templateUrl: './refactored-spoon.component.html',
  styleUrls: ['./refactored-spoon.component.css']
})
export class RefactoredSpoonComponent {
  @Input() title: string;

  chartColumns = [
    { label: 'meal', type: 'string' },
    { label: 'calories', type: 'number' },
    { type: 'string', role: 'annotation' }
  ];

  chartRows = [
    {c: [{v: 'breakfast'}, {v: 400}, {v: 'Annotated'}]},
    {c: [{v: 'lunch'}, {v: 550}, {v: 'Annotated'}]},
    {c: [{v: 'dinner'}, {v: 700}, {v: 'Annotated'}]}
  ];

  chartOptions = {
    'title': 'Calories per meal'
  };

  chartId = 'new_chart';

  chartType = 'LineChart';
}