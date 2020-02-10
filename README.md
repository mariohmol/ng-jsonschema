# ng-jsonschema

JSON Schema Builder for Angular

A simple GUI tool to enable designing and building JSON schemas


[![Build Status](https://travis-ci.org/mariohmol/ng-jsonschema.svg?branch=master)](https://travis-ci.org/mariohmol/ng-jsonschema)

Supports: Angular2 to Angular9

## Live example:  

* https://stackblitz.com/edit/ng-jsonschema

This project was tested integrated with the following techs:

* angular
* angular-material
* ionic3 (masks is not fully working, that is an issue for that, but pipes/directives/validators/mask works)

<!-- See the demo working project:

![Demo Image](/src/assets/print.png) -->


## Installation

To install this library with npm, run:

` npm install --save ng-jsonschema`

 
## Usage

### Configuration

Import module in root

```ts
import { NgJsonSchema } from 'ng-jsonschema';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ....,
    NgJsonSchema
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```


Then setup your component:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<ng-jsonschema [models]="models"></ng-jsonschema>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public MASKS = MASKS;
  
  constructor() { 
    this.models = [
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
  }

}
```


# Demo

Demo component files are included in Git Project.

Demo Project:
[https://github.com/mariohmol/ng-jsonschema/tree/master/src/app/demo)


# TODO

There is some issues to work with, check it out

## Collaborate

Fork this project then install global libs:

*  npm i -g rimraf ng-packagr @angular/compiler-cli @angular/compiler tslib ngc

Finally working in the project folder:

* npm i
* npm run build:lib
* npm run dist
* npm run start

# License

MIT(./LICENSE)


## References

* https://github.com/bjdash/JSON-Schema-Builder/