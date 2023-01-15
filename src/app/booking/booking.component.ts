import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { BookingService } from './booking.service';
import { CustomValidator } from './validators/custom-validator';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  bookingForm!: FormGroup;

  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }

  constructor(private configService: ConfigService, 
              private fb: FormBuilder,
              private bookingService: BookingService,
              private route: ActivatedRoute 
              ) {  }

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('roomid');
    this.bookingForm = this.fb.group({
      roomId: new FormControl({ value: roomId, disabled: true }, {validators:[Validators.required]}),
      guestEmail: ['', { updateOn: 'blur' , validators: [Validators.required, Validators.email]}],
      checkinDate: [''],
      checkoutDate: [''],
      bookingStatus: [''],
      bookingAmount: [''],
      bookingDate: [''],
      mobileNumber: ['', {updateOn: 'blur'}],
      guestName: ['', [Validators.required, Validators.minLength(5), CustomValidator.ValidateName, 
        CustomValidator.ValidateSpecialChar('*')]],
      Address: this.fb.group({
        addressLine1: ['', { validators:[Validators.required]}],
        addressLine2: [''],
        city: ['',{ validators:[Validators.required]}],
        state: ['',{ validators:[Validators.required]}],
        country: [''],
        zipCode: [''],
      }),
      guests: this.fb.array([this.fb.group({
        guestName: [''],
        age: new FormControl(''),
        tnc: new FormControl(false, { validators: [Validators.requiredTrue] }),
      })]),                       
    }
    // {
    //   updateOn: 'blur'
    // }
    );
    this.getBookingData();

    // this.bookingForm.valueChanges.subscribe((data)=>{
    //   console.log(data);
    // })

    this.bookingForm.valueChanges.pipe(
      mergeMap((data) => this.bookingService.bookRoom(data)) 
      ).subscribe((data) => console.log(data));
  }

  addBooking() {
    console.log(this.bookingForm.getRawValue());
    // this.bookingService.bookRoom(this.bookingForm.getRawValue()
    // ).subscribe((data)=> {console.log(data)});

    this.bookingForm.reset({
      roomId: '2',
      guestEmail: '',
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      Address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false,
    });
  }

getBookingData(){
this.bookingForm.patchValue({
  // roomId: '2',
  guestEmail: 'test@gmail.com',
  checkinDate: new Date('10-Jan-2022'),
  // checkoutDate: '',
  bookingStatus: '',
  bookingAmount: '',
  bookingDate: '',
  mobileNumber: '',
  guestName: '',
  Address: {
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
  },
  guests: [],
  tnc: false,
})

  }

  addGuest() {
    this.guests.push(
      this.fb.group({ guestName: [''], age: new FormControl('') }),
    )
  }

  addPassport(){
    this.bookingForm.addControl('passport', new FormControl(''));
  }

  deletePassport(){
    if(this.bookingForm.get('passport')){
      this.bookingForm.removeControl('passport');
    }   
  }

  removeGuest(i : number){
    this.guests.removeAt(i);
  }
}