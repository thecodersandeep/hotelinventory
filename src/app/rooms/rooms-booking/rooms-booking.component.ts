import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, observable } from 'rxjs';

@Component({
  selector: 'app-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.css']
})
export class RoomsBookingComponent implements OnInit {

  id: number = 0;

  // id$ !:  this.router.paramMap.pipe(
  //   map(params => params.get('roomid'))
  //   );

  constructor(private router: ActivatedRoute){}

  ngOnInit(): void {

    // this.id$ =

    this.router.params.subscribe(
      (params)=> {
        this.id = params['roomid'];
      }
      );
  }

}
function ngOnInit() {

}

