import { Component } from '@angular/core';
import { OthersService } from '../services/others.service';
import { ToastrService } from 'ngx-toastr';
import { CommonMethods } from '../common-methods';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  ironWastePercentage: number = 0;
  nickelWastePercentage: number = 0;

  isFloorManager:Boolean =false;

  constructor(private otherService:OthersService,private _toastrService: ToastrService){
    this.isFloorManager = CommonMethods.getItem("role") === "FLOOR_MANAGER"? true : false;
  }
  
  ngOnInit(): void {
    this.getStatistics();
  }

  getStatistics() {
    this.otherService.getOrderStats().subscribe(data =>{ 
      const usedIron = data.usedMaterial.iron;
      const usedNickel = data.usedMaterial.nickel;
      const totalMaterial = usedIron + usedNickel;
      const abswasteIron = Math.abs(data.wasteMaterial.iron);  // Use absolute value
      const abswasteNickel = Math.abs(data.wasteMaterial.nickel); 

      // Calculate waste percentages
      this.ironWastePercentage = Math.round((abswasteIron / totalMaterial) * 100 * 100.0) / 100.0;
      this.nickelWastePercentage = Math.round((abswasteNickel / totalMaterial) * 100 * 100.0) / 100.0;
    });
  }

}
