/// <reference types="@types/google.visualization" />

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-google-chart',
  templateUrl: './google-chart.component.html',
  styleUrls: ['./google-chart.component.css']
})
export class GoogleChartComponent implements OnInit {
  @Input() chartData;
  @Input() chartOptions;
  @Input() chartId: string;
  @Input() chartType: string; //unused for now

  constructor() {
    // Load the Visualization API and the corechart package.
    google.charts.load('current', { 'packages': ['corechart'] });
  }

  ngOnInit() {
    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(() => this.drawChart());
  }

    // Callback that creates and populates a data table, instantiates the pie chart,
    // passes in the data and draws it.
    drawChart() {
      // Create the data table.
      const data = google.visualization.arrayToDataTable(this.chartData);

      // Set chart options
      const options = this.chartOptions;

      // Instantiate and draw our chart, passing in some options.
      const chart = new google.visualization.PieChart(document.getElementById(this.chartId));
      
      chart.draw(data, options);
    }

}
