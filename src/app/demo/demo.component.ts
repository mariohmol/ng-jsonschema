import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  refModels;
  schema;
  data;

  constructor(public fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.refModels = {
      '1496757761729': {
        'name': 'User',
        'nameSpace': 'user',
        'data': {
          'type': ['object'],
          'properties': {
            'name': {
              'type': ['string']
            }
          }
        }
      },
      '1497245758395': {
        'name': 'Address',
        'nameSpace': 'address',
        'data': {
          'type': ['object']
        }
      }
    };

    this.schema = {
      'type': 'object',
      'properties': {
        'name': {
          'type': 'string',
          'minLength': 3,
          'maxLength': 255
        },
        'age': {
          'type': 'integer',
          'minimum': 18
        }
      },
      'required': [
        'name',
        'age'
      ]
    };
  }

}
