import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonMethods } from 'src/app/common-methods';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isMobileMenu(){
    return true;
  }
  role: string | null = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.role = CommonMethods.getItem(this.role);
  }


  logout(): void {
    console.log("logout called");
    
    // Clear session data
    CommonMethods.removeItem('name');
    CommonMethods.removeItem('email');
    CommonMethods.removeItem('role');
    CommonMethods.removeItem('auth');

    // Optionally, remove all items (if required)
    // CommonMethods.clearAllItems();

    // Redirect to login page
    // this.router.navigate([]);
    this.router.navigateByUrl('auth').then(() => {
      window.location.reload();  // Force a full page reload
    });
  }
  
}
