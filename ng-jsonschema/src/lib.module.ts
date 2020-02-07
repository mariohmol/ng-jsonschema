import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { JsonSchemaComponent } from './jsonschema/jsonschema.component';
import { MainJsonSchemaComponent } from './main/main.component';
import { FieldJsonSchemaComponent } from './field/field.component';

export const CustomDirectives = [
  JsonSchemaComponent,
  MainJsonSchemaComponent,
  FieldJsonSchemaComponent
];

export const NgBrDirectives = {
  JsonSchemaComponent,
  MainJsonSchemaComponent,
  FieldJsonSchemaComponent
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    CustomDirectives
  ],
  exports: [
    CustomDirectives
  ]
})
class NgJsonSchema {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgJsonSchema
    };
  }
}
export {
  NgJsonSchema
}
