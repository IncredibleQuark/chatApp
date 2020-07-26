import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username: string;
  public submitted: boolean;
  public usernameTaken: boolean;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  public async login(formControl): Promise<void> {
    this.submitted = true;
    if (!formControl.valid) {
      return;
    }

    localStorage.setItem('username', this.username);
    await this.router.navigate(['/']);
  }

}
