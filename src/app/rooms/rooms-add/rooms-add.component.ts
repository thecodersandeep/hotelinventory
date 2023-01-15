import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RoomList } from 'src/app/rooms';
import { RoomsService } from '../services/rooms.service';
// import { rxjs } from ''; 

@Component({
  selector: 'app-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.css']
})
export class RoomsAddComponent implements OnInit{

  room: RoomList= {
    roomType: '',
    amenities: '',
    price: 0,
    photos: '',
    checkinTime: new Date,
    checkoutTime: new Date,
    rating: 0,
    roomNumber: ''
  }

constructor(private roomService: RoomsService){}

ngOnInit(): void {
    
}

successMessage: string= ''; 
data: any;


AddRoom(roomsForm: NgForm) {
    this.roomService.addRoom(this.room)
    // .subscribe(()=> this.successMessage = 'Room added successfully')
    roomsForm.reset();
  }  
}