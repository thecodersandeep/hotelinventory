import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { RoomList } from 'src/app/rooms';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  addRoom(room: RoomList) {
   
  }

  roomList: RoomList[] =
    [{
      roomNumber: '110',
      roomType: 'Deluxe Room',
      amenities: 'Air-Condition, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 500,
      photos: 'https://unsplash.com/photos/R5v8Xtc0ecg.jpg',
      checkinTime: new Date('14-Dec-2022'),
      checkoutTime: new Date('14-Dec-2022'),
      rating: 4.5
    },
    {
      roomNumber: '115',
      roomType: 'Deluxe Room',
      amenities: 'Air-Condition, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 1000,
      photos: 'https://unsplash.com/photos/R5v8Xtc0ecg.jpg',
      checkinTime: new Date('14-Dec-2022'),
      checkoutTime: new Date('14-Dec-2022'),
      rating: 3.6
    },
    {
      roomNumber: '120',
      roomType: 'Private Room',
      amenities: 'Air-Condition, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 10000,
      photos: 'https://unsplash.com/photos/R5v8Xtc0ecg.jpg',
      checkinTime: new Date('14-Dec-2022'),
      checkoutTime: new Date('14-Dec-2022'),
      rating: 2.5
    }
    ];

  constructor(private http: HttpClient) {
    console.log("Rooms Service Initialized...");
  }

  getRooms() {
    return this.roomList;
  }

  getPhotos() {   // Request API Calling method
    const request = new HttpRequest('GET', `https://jsonplaceholder.typicode.com/photos`,
      { reportProgress: true }
    );
    return this.http.request(request);

  }

}