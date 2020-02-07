import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { JsonSchemaComponent } from './jsonschema/jsonschema.component';
import { MainJsonSchemaComponent } from './main/main.component';
import { FieldJsonSchemaComponent } from './field/field.component';
import { SelectSchemaJsonSchemaComponent } from './field/selectschema.component';
import { StateService } from './state.service';

export const CustomDirectives = [
  JsonSchemaComponent,
  MainJsonSchemaComponent,
  FieldJsonSchemaComponent,
  SelectSchemaJsonSchemaComponent
];

export const NgBrDirectives = {
  JsonSchemaComponent,
  MainJsonSchemaComponent,
  FieldJsonSchemaComponent,
  SelectSchemaJsonSchemaComponent
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
  ],
  providers: [
    StateService
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
