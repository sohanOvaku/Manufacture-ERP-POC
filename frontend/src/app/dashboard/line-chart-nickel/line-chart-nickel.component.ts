import { Component } from '@angular/core';
import { Chart, TooltipItem } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { OthersService } from 'src/app/services/others.service';

@Component({
  selector: 'app-line-chart-nickel',
  templateUrl: './line-chart-nickel.component.html',
  styleUrls: ['./line-chart-nickel.component.css']
})
export class LineChartNickelComponent {
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

  createChart(apiData: any) {
    const labels = ['Used Nickel', 'Waste Nickel', 'Pending Nickel', 'In Production'];
    const nickelData = [apiData.usedMaterial.nickel, apiData.wasteMaterial.nickel, apiData.pendingMaterial.nickel, apiData.inProgressMaterial.nickel];

    this.chart = new Chart("MyChart2", {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            label: "Nickel",
            data: nickelData,
            backgroundColor: ['#4BC0C0', '#FF9F40', '#9966FF', '#5066EF']
          }
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
