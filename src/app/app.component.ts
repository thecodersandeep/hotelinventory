import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { RoomsComponent } from './rooms/rooms.component';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'hotelinventoryapp';

  role = 'Users';

  @ViewChild('name', {static: true}) name!: ElementRef;

  constructor(private configService: ConfigService, private router: Router){ }
  
  ngOnInit(): void {
  //  this.router.events.subscribe((event)=> {
  //   console.log(event); 
  //  })

  this.router.events.pipe(
    filter((event)=> event instanceof NavigationStart)
    ).subscribe((event)=> {
    console.log('Navigation Started');
  })
  
  this.router.events.pipe(
    filter((event)=> event instanceof NavigationEnd)
    ).subscribe((event)=> {
    console.log('Navigation Completed');
  })
  
  this.name.nativeElement.innerText = "Welcome to Hilton Hotel";
  }


  // @ViewChild('user', {read: ViewContainerRef}) vcr!: ViewContainerRef;

  // ngAfterViewInit(){
  //   const componentRef = this.vcr.createComponent(RoomsComponent);
  //   componentRef.instance.numberOfRooms= 50;
  // }


}
