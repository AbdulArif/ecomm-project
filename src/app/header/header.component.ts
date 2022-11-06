import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuType: String ='default'

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        console.warn(val.url)
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          console.log("In seller area")
          this.menuType = "seller"
        }
        else {
          console.log("OutSide seller area")
          this.menuType = "default"
        }
      }
    })
  }

  logOut(){
    localStorage.removeItem('seller')
    this.router.navigate(['/'])
  }

}
