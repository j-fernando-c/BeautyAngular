import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiciosDashboard } from 'src/app/interfaces/dashboard.interfaces';
import { DashboardService } from 'src/app/services/dashboard.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grafica3',
  templateUrl: './grafica3.component.html',
  styleUrls: ['./grafica3.component.css']
})
export class Grafica3Component implements OnInit {

  public chartData: any[] = [];
  public chartData3: any[] = [];
  title1: string = " Servicios";
  title2: string = "Días";

  myForm: FormGroup;

  constructor(
    private dashboardService: DashboardService,
    private fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      startDate: [''],
      endDate: ['']
    });
  }

  ngOnInit(): void {
    this.onSave();
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
    const today = new Date();
  
    // Me muestra Datos de un mes antes
    const startDate1 = new Date(today);
    startDate1.setMonth(today.getMonth() - 1);
    const endDate1 = new Date(today);

    // Me muestra quince días despúes
    const startDate2 = new Date(today);
    const endDate2 = new Date(today);
    endDate2.setDate(today.getDate() + 15);

    const formStartDate = this.myForm.get('startDate')?.value;
    const formEndDate = this.myForm.get('endDate')?.value;

    // Usar fechas del formulario si están presentes con operadores ternarios
    const finalStartDate1 = formStartDate ? new Date(formStartDate) : startDate1;
    const finalEndDate1 = formEndDate ? new Date(formEndDate) : endDate1;
    const finalStartDate2 = formStartDate ? new Date(formStartDate) : startDate2;
    const finalEndDate2 = formEndDate ? new Date(formEndDate) : endDate2;

    //Para poder enviarlas como strings
    const startDate1String = finalStartDate1.toISOString();
    const endDate1String = finalEndDate1.toISOString();
    const startDate2String = finalStartDate2.toISOString();
    const endDate2String = finalEndDate2.toISOString();

    this.dashboardService.getServiciosUtilizados(startDate1String, endDate1String).subscribe(data => {
      if (Array.isArray(data)) {
        const total = data.reduce((acc, servicio: ServiciosDashboard) => acc + servicio.total, 0);

        const servicios = data.map((servicio: ServiciosDashboard) => {
          const porcentaje = total !== 0 ? (servicio.total / total) * 100 : 0;
          return { name: servicio.servicioInfo.nombre_servicio, value: porcentaje };
        });

        servicios.sort((a, b) => b.value - a.value);

        this.chartData = servicios;
      } else {
   
      }
    });

    this.dashboardService.getCitasPorDia(startDate2String, endDate2String).subscribe({
      next: (res: any) => {
        const dias = Object.keys(res.citasPorDia);
        const chartData3 = dias.map(dia => ({ name: dia, value: res.citasPorDia[dia] }));
    
        this.chartData3 = [{ name: 'Citas', series: chartData3 }];
      },
      error: (error) => {
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
