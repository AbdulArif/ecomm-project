import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuType: String = 'default'
  sellerName: String = ''

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
          var sellerStore = localStorage.getItem('seller') 
          if(sellerStore){
            let sellerData = sellerStore && JSON.parse(sellerStore)[0]
            this.sellerName = sellerData.name
          }
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
