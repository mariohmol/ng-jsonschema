import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  models;
  schema;
  data;

  constructor(public fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.models = [
      {

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
      {
        'name': 'Address',
        'nameSpace': 'address',
        'data': {
          'type': ['object']
        }
      },
      {
        'name': 'Person',
        'nameSpace': 'person',
        'data': {
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
        }
      }

    ];

    this.schema = this.models[0];
  }

}
