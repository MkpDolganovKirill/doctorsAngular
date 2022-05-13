import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  pageName: string = 'Неизвестная страница';
  @Input() isShow: boolean = false;

  isShowHeaderButton: boolean = false;

  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.router.events.subscribe((routerEvent: any) => {
      if (routerEvent instanceof NavigationEnd) {
        this.changeHeaderTitle(routerEvent.url);
      }
    });
  }

  sendAllert(): void {
    localStorage.clear();
  }

  changeHeaderTitle(url: string): void {
    let array: Array<string> = url.split('/');
    switch (array[1]) {
      case 'main':
        this.pageName = 'Приемы';
        break;
      case 'auth':
        this.pageName = 'Авторизация';
        break;
      default:
        this.pageName = 'Неизвестная страница';
        break;
    }
  }
}
