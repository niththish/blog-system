import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css'],
})
export class AdminNavbarComponent implements OnInit {
  hideUrl: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const currPath = this.route.routeConfig?.path;
    if (currPath === 'admin/login') this.hideUrl = true;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
