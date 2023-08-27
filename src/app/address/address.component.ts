import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  fullName: string = '';
  address: string = '';
  cardNumber: string = '';

  ngOnInit(): void {}

  submitOrder() {}
}
