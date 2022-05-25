import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public pageName: string = 'Неизвестная страница';
  public ButtonShow: boolean = false;

  constructor(
    private router: Router,
    public mainService: MainService,
    private snackBar: MatSnackBar,
  ) {}

  public ngOnInit(): void {
    this.router.events.subscribe((routerEvent: any) => {
      if (routerEvent instanceof NavigationEnd) {
        this.changeHeaderTitle(routerEvent.url);
      }
    });
    this.mainService.showSnackBar.subscribe((res) => {
      if (res) {
        this.snackBar.open(res.message, res.action, { ...res.optional });
      }
    });
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['/auth']);
  }

  changeHeaderTitle(url: string): void {
    const lastPathSegment = url.split('/').pop();
    this.ButtonShow = false;
    switch (lastPathSegment) {
      case 'main':
        this.ButtonShow = true;
        this.pageName = 'Приемы';
        break;
      case 'auth':
        this.pageName = 'Авторизация';
        break;
      case 'registration':
        this.pageName = 'Регистрация';
        break;
      default:
        this.pageName = 'Неизвестная страница';
        break;
    }
  }
}
