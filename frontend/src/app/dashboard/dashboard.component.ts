import { Component } from '@angular/core';
import { OthersService } from '../services/others.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  ironWastePercentage: number = 0;
  nickelWastePercentage: number = 0;

  constructor(private otherService:OthersService,private _toastrService: ToastrService){}
  
  ngOnInit(): void {
    this.getStatistics();
  }

  getStatistics() {
    this.otherService.getOrderStats().subscribe(data =>{ 
      const usedIron = data.usedMaterial.iron;
      const usedNickel = data.usedMaterial.nickel;
      const wasteIron = data.wasteMaterial.iron;
      const wasteNickel = data.wasteMaterial.nickel;
      const abswasteIron = Math.abs(data.wasteMaterial.iron);  // Use absolute value
      const abswasteNickel = Math.abs(data.wasteMaterial.nickel); 

      console.log("usedIron: ",usedIron);
      console.log("usedNickel: ",usedNickel);
      console.log("wasteIron: ",wasteIron);
      console.log("wasteNickel: ",wasteNickel);
      console.log("abswasteIron: ",abswasteIron);
      console.log("abswasteNickel: ",abswasteNickel);
      console.log("ironWastePercentage: ",(wasteIron / usedIron) * 100);
      console.log("ironWastePercentage: ",(wasteNickel / usedNickel) * 100);
      
      console.log("absironWastePercentage: ",(abswasteIron / usedIron) * 100);
      console.log("absironWastePercentage: ",(abswasteNickel / usedNickel) * 100);
      

      // Calculate waste percentages
      // this.ironWastePercentage = (abswasteIron / usedIron) * 100;
      // this.nickelWastePercentage = (abswasteNickel / usedNickel) * 100;
      this.ironWastePercentage = Math.round((abswasteIron / usedIron) * 100 * 100.0) / 100.0;
this.nickelWastePercentage = Math.round((abswasteNickel / usedNickel) * 100 * 100.0) / 100.0;
    });
  }

}
