import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  ngOnInit(): void {
    console.log('Method not implemented.');
  }

  constructor(public fb: FormBuilder) {

  }

}
