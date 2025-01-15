import { Component, inject, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { VisiteService } from '../../../../_services/visite.service';
@Component({
  selector: 'app-statistique',
  standalone: true,
  imports: [],
  templateUrl: './statistique.component.html',
  styleUrl: './statistique.component.scss'
})
export class StatistiqueComponent implements OnInit {

  private visiteService = inject(VisiteService)

  async ngOnInit() {
    this.visiteService.getVisiteByMouth().subscribe((res)=>{
      const data = res
      console.log(data);
      
    
      new Chart(
        "myChart",
        {
          type: 'bar',
          options: {
            // animation: true,
            plugins: {
              legend: {
                display: true
              },
              tooltip: {
                enabled: true
              }
            }
          },
          data: {
            labels: data.map(row => row.month),
            datasets: [
              {
                label: 'Nombre de visite par mois',
                data: data.map(row => Number(row.count))
              }
            ]
          }
        }
      );
    })
   
  }

}
