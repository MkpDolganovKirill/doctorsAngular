import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  pageName: string = 'Неизвестная страница';
  ButtonShow: boolean = false;

  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.router.events.subscribe((routerEvent: any) => {
      if (routerEvent instanceof NavigationEnd) {
        this.changeHeaderTitle(routerEvent.url);
      }
    });
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigateByUrl('/auth');
  }

  changeHeaderTitle(url: string): void {
    const lastPathSegment = url.split('/').pop();
    switch (lastPathSegment) {
      case 'main':
        this.ButtonShow = true;
        this.pageName = 'Приемы';
        break;
      case 'auth':
        this.ButtonShow = false;
        this.pageName = 'Авторизация';
        break;
      case 'registration':
        this.ButtonShow = false;
        this.pageName = 'Регистрация';
        break;
      default:
        this.ButtonShow = false;
        this.pageName = 'Неизвестная страница';
        break;
    }
  }
}
