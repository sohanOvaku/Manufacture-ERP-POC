import { Component } from '@angular/core';
import { Chart, TooltipItem } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { OthersService } from 'src/app/services/others.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent {
  public chart: any;
  constructor(private otherService:OthersService,private _toastrService: ToastrService){}
    
  ngOnInit(): void {
    this.fetchChartData();
  }

  fetchChartData() {
    this.otherService.getOrderStats().subscribe(data =>{ 
      this.createChart(data);
    });
  }
  // createChart(){
  
  //   this.chart = new Chart("MyChart1", {
  //     type: 'doughnut', //this denotes tha type of chart

  //     data: {// values on X-Axis
  //       labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
	// 							 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	//        datasets: [
  //         {
  //           label: "Sales",
  //           data: ['467','576', '572', '79', '92',
	// 							 '574', '573', '576'],
  //           backgroundColor: 'blue'
  //         },
  //         {
  //           label: "Profit",
  //           data: ['542', '542', '536', '327', '17',
	// 								 '0.00', '538', '541'],
  //           backgroundColor: 'limegreen'
  //         }  
  //       ]
  //     },
  //     options: {
  //       aspectRatio:1.1
  //     }
      
  //   });
  // }


  createChart(apiData: any) {
    const labels = ['Used Iron', 'Waste Iron', 'Pending Iron', 'In Production'];
    const ironData = [apiData.usedMaterial.iron, apiData.wasteMaterial.iron, apiData.pendingMaterial.iron, apiData.inProgressMaterial.iron];

    this.chart = new Chart("MyChart1", {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            label: "Iron",
            data: ironData,
            backgroundColor: ['#FF6384', '#FFCE56', '#36A2EB', '#36D9EB']
          },
          // {
          //   label: "Nickel",
          //   data: nickelData,
          //   backgroundColor: ['#4BC0C0', '#FF9F40', '#9966FF']
          // }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem: TooltipItem<'pie'>) {
                let value = tooltipItem.raw as number;
                let unit = "kg";
                if (value >= 1000) {
                  value = value / 1000; // Convert to tons
                  unit = "tons";
                }
                return `${tooltipItem.label}: ${value.toFixed(2)} ${unit}`;
              }
            }
          }
        },
        aspectRatio: 1.1
      }
    });
  }
}
