import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonSchemaComponent } from './jsonschema/jsonschema.component';

export const CustomDirectives = [
  JsonSchemaComponent
];

export const NgBrDirectives = {
  JsonSchemaComponent
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
