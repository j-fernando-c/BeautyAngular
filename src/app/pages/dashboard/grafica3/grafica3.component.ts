import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiciosDashboard } from 'src/app/interfaces/dashboard.interfaces';
import { DashboardService } from 'src/app/services/dashboard.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grafica3',
  templateUrl: './grafica3.component.html',
  styleUrls: ['./grafica3.component.css']
})
export class Grafica3Component implements OnInit {

  constructor(
    private dashboardService: DashboardService,
    private fb: FormBuilder) {

  }

  public chartData: any[] = [];
  public chartData3: any[] = [];
  title1: string = " Servicios"

  title2: string = "Días"



  myForm: FormGroup = this.fb.group({
    startDate: ['', Validators.required],
    endDate: ['', Validators.required]
  });
  ngOnInit(): void {


  }
  // options Primer grafico
  showXAxis: boolean = true;
  animations: boolean = true
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  onSave() {
    const startDate = this.myForm.get('startDate')?.value;
    const endDate = this.myForm.get('endDate')?.value;
    console.log('Fecha antes de procesar:', startDate, endDate),

    // ...

    this.dashboardService.getServiciosUtilizados(startDate, endDate).subscribe(data => {
      if (Array.isArray(data)) {
        const total = data.reduce((acc, servicio: ServiciosDashboard) => acc + servicio.total, 0);

        const servicios = data.map((servicio: ServiciosDashboard) => {
          const porcentaje = total !== 0 ? (servicio.total / total) * 100 : 0;
          return { name: servicio.servicioInfo.nombre_servicio, value: porcentaje };
        });

        // Ordenar el array de servicios de mayor a menor
        servicios.sort((a, b) => b.value - a.value);

        this.chartData = servicios;
      } else {
        console.error('Los datos obtenidos no son un array:', data);
      }
    });

    this.dashboardService.getCitasPorDia(startDate, endDate).subscribe({
      next: (res: any) => {
        const dias = Object.keys(res.citasPorDia);
        const chartData3 = dias.map(dia => ({ name: dia, value: res.citasPorDia[dia] }));
    
        this.chartData3 = [{ name: 'Citas', series: chartData3 }];
        console.log(this.chartData3)
      },
      error: (error) => {
        // Muestra mensajes de error específicos usando SweetAlert
        if (error.status === 400 && error.error && error.error.error) {
          Swal.fire({
            icon: 'error',
            iconColor: '#f44336',
            title: 'Error de validación',
            text: error.error.error,
          });
        } else {
          Swal.fire({
            icon: 'error',
            iconColor: '#f44336',
            title: 'Error',
            text: 'Error al procesar la solicitud',
          });
        }
      }
    });
    
  }
}
