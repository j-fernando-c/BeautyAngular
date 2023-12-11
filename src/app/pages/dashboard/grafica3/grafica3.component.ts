import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica3',
  templateUrl: './grafica3.component.html',
  styleUrls: ['./grafica3.component.css']
})
export class Grafica3Component implements OnInit {
  citasPorDia: any[];
  view: [number, number] = [500, 400];
  ngOnInit(): void {
    this.citasPorDia=[
      {
        "dia": "lunes",
        "cantidad": 19
      }
    ]
  }

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showGridLines=false;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  


}
