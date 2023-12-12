import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica3',
  templateUrl: './grafica3.component.html',
  styleUrls: ['./grafica3.component.css']
})
export class Grafica3Component implements OnInit {
  citasPorDia: any[]=[];

  ngOnInit(): void {
    this.citasPorDia = [
      { name: 'Lunes', value: 10 },
      { name: 'Martes', value: 15 },
      { name: 'Miércoles', value: 8 },
      { name: 'Jueves', value: 20 },
      { name: 'Viernes', value: 12 },
    ];
  }



  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showGridLines=false;
  showXAxisLabel = true;
  xAxisLabel = 'Citas por día';
  showYAxisLabel = true;
  yAxisLabel = 'Total';

  colorScheme = {
    domain: ['#ffd9e1', '#ffd9e1', '#ffd9e1', '#ffd9e1']
  };


}
