import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiciosDashboard } from 'src/app/interfaces/dashboard.interfaces';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-grafica3',
  templateUrl: './grafica3.component.html',
  styleUrls: ['./grafica3.component.css']
})
export class Grafica3Component implements OnInit {

  constructor(
    private dashboardService: DashboardService,
    private fb: FormBuilder) { }

  public chartData: any[] = [];
  public chartData2: any[] = [];
  title1:string=" Servicios"
  
  title2:string="Días"



  myForm: FormGroup = this.fb.group({
    startDate: ['', Validators.required],
    endDate: ['', Validators.required]
  });
  ngOnInit(): void {

  
  }

  onSave() {
    const startDate = this.myForm.get('startDate')?.value;
    const endDate = this.myForm.get('endDate')?.value;
    console.log(startDate);
    console.log(endDate);
  
    this.dashboardService.getServiciosUtilizados(startDate, endDate).subscribe(data => {
      if (Array.isArray(data)) {
        const total = data.reduce((acc, servicio: ServiciosDashboard) => acc + servicio.total, 0);
  
        const servicios = data.map((servicio: ServiciosDashboard) => {
          const porcentaje = total !== 0 ? (servicio.total / total) * 100 : 0;
          return { name: servicio.servicioInfo.nombre_servicio, value: porcentaje };
        });
  
        this.chartData = servicios;
      } else {
        console.error('Los datos obtenidos no son un array:', data);
      }
    });


    this.dashboardService.getCitasPorDia(startDate, endDate).subscribe(res => {
      // Transformar el resultado para adaptarlo a chartData2
      const dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
      const chartData2 = dias.map(dia => ({ name: dia, value: res.citasPorDia[dia] }));
      
      this.chartData2 = chartData2;
      console.log(res);
    });
    
}

}
