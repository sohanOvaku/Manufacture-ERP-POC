import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit{
  public chart: any;
  ngOnInit(): void {
    this.createChart();
  }
  createChart(){
  
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        // labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
				// 				 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
        labels: ['Dec 2024', 'Jan 2025', 'Feb 2025'],
	       datasets: [
          {
            label: "Order Pending",
            data: [0, 4, 0], // Orders pending per month
            backgroundColor: 'blue'
          },
          {
            label: "Order Complete",
            data: [0, 3, 0], // Orders completed per month
            backgroundColor: 'limegreen'
          }
        ]
        //  [
        //   {
        //     label: "Sales",
        //     data: ['467','576', '572', '79', '92',
				// 				 '574', '573', '576'],
        //     backgroundColor: 'blue'
        //   },
        //   {
        //     label: "Profit",
        //     data: ['542', '542', '536', '327', '17',
				// 					 '0.00', '538', '541'],
        //     backgroundColor: 'limegreen'
        //   }  
        // ]
      },
      options: {
        aspectRatio:2.1
      }
      
    });
  }
}
