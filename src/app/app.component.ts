// external modules
import { Component, OnInit } from '@angular/core';

// internal modules
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService) {}
  title = 'product-store';

  ngOnInit(): void {
    this.checkTokenAtStartup();
    console.log(`checkTokenAtStartup triggered`);
  }

  private checkTokenAtStartup(): void {
    const user = localStorage.getItem('user');
    if (user) {
      // TASK authenticate user with token
      this.userService.setUserLoggedIn();
      console.log(`localStorage checked: token found`);
    }
  }
}
