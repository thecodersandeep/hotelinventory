import { HttpEventType } from '@angular/common/http';
import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit, QueryList, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { Room, RoomList } from '../rooms';
import { ConfigService } from '../services/config.service';
import { RoomsService } from './services/rooms.service';

@Component({
    selector: 'app-rooms',
    templateUrl: './rooms.component.html',
    styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit, AfterViewChecked {

    hotelName = "Hilton Hotel";

    title = "Room List";

    numberOfRooms = 10;

    hideRooms = true;

    toggle() {
        this.hideRooms = !this.hideRooms;
        this.title = "Rooms List";
    }

    rooms: Room = {
        totalRooms: 20,
        availableRooms: 10,
        bookedRooms: 5
    }

    roomList: RoomList[] = [];

    selectedRoom!: RoomList;

    stream = new Observable(observer => {
        observer.next('user1');
        observer.next('user2');
        observer.next('user3');
        observer.next('user4');
        observer.complete();
        // observer.error('error');
    })

    @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

    // @ViewChildren(HeaderComponent) headerChildrenComponent! : QueryList<HeaderComponent>;

    totalBytes = 0;

    // roomCount = this.roomsService.getRooms.pipe(
    //   map((rooms) => rooms.length)
    // )

    constructor(@SkipSelf() private roomsService: RoomsService, 
    private configService: ConfigService) { }

    ngOnInit(): void {

        this.roomsService.getPhotos().subscribe((event) =>{    // Request API Calling
            switch(event.type){
                case HttpEventType.Sent: {
                    console.log("Request has been made!");
                    break;
                }
                case HttpEventType.ResponseHeader: {
                    console.log("Request success");
                    break;
                }
                case HttpEventType.DownloadProgress: {
                    this.totalBytes = event.loaded;
                    break;
                }
                case HttpEventType.Response: {
                    console.log(event.body);
                }
            }
        }
        );

        this.stream.subscribe({
            next: (value) => console.log(value),
            complete: () => console.log('complete'),
            error:(err) => console.log(err)
        })
        this.stream.subscribe((data => console.log(data)));
        this.roomList = this.roomsService.getRooms();
    }

    ngDoCheck(): void {
        console.log('on Changes is called')
    }

    ngAfterViewInit() {
        // console.log(this.headerComponent);
        this.headerComponent.title = "Rooms View";

        // this.headerChildrenComponent.last.title = "Last Title" ;

    }

    ngAfterViewChecked(): void {

    }

    selectRoom(room: RoomList) {
        this.selectedRoom = room;
    }

    addRoom() {
        const room: RoomList = {
            roomNumber: '201',
            roomType: 'Semi-Deluxe Room',
            amenities: 'Air-Condition, Free Wi-Fi, TV, Bathroom, Kitchen',
            price: 5000,
            photos: 'https://unsplash.com/photos/R5v8Xtc0ecg.jpg',
            checkinTime: new Date('15-Dec-2022'),
            checkoutTime: new Date('15-Dec-2022'),
            rating: 4.2,
        }

        // this.roomList.push(room);
        this.roomList = [...this.roomList, room];

    }

}



// getData => addData => getData

// getData => Continuous stream of data => addData 