import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonSchemaComponent } from './jsonschema/jsonschema.component';
import { MainJsonSchemaComponent } from './main/main.component';

export const CustomDirectives = [
  JsonSchemaComponent,
  MainJsonSchemaComponent
];

export const NgBrDirectives = {
  JsonSchemaComponent,
  MainJsonSchemaComponent
};

@NgModule({
  imports: [
    CommonModule
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
