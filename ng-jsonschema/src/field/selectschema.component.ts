import { Component, Input } from '@angular/core';
import { JsonSchemaService } from '../jsonschema.service';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'ng-jsonschema-selectschema',
    templateUrl: './selectschema.component.html',
    providers: []
})
export class SelectSchemaJsonSchemaComponent {
    @Input()
    configs;

    @Input()
    modelRef;

    @Input()
    modelChangesCallback;

    @Input()
    openMenu;

    @Input()
    selectedEntity;

    @Input()
    setArrayType

    JsonSchema = new JsonSchemaService();

    // change the model type
    changeModelType(type, entity, event) {
        entity = this.selectedEntity;
        if (event.ctrlKey) {
            if (entity._type.indexOf(type) >= 0) {
                // unselect current type
                if (entity._type.length > 1) {
                    const index = entity._type.indexOf(type);
                    entity._type.splice(index, 1);
                    this.manageModelProps(type, entity, 'remove');
                }
            } else {
                entity._type.push(type);
                this.manageModelProps(type, entity, 'add');
            }
        } else {
            for (let i = 0; i < entity._type.length; i++) {
                this.manageModelProps(entity._type[i], entity, 'remove');
            }
            entity._type = [type];
            this.manageModelProps(type, entity, 'add');
        }

        this.modelChangesCallback(entity);
        if (event) {
            event.stopPropagation();
        }
        // if (this.openMenu) {
        //     this.openMenu();
        // }
    };

    manageModelProps(type, entity, action) {
        let fieldsObj = {};
        switch (type) {
            case 'Object':
                fieldsObj = this.JsonSchema.copy(this.JsonSchema.fields.forObject);
                break;
            case 'String':
                fieldsObj = this.JsonSchema.copy(this.JsonSchema.fields.forString);
                break;
            case 'Array':
                fieldsObj = this.JsonSchema.copy(this.JsonSchema.fields.forArray);
                break;
            case 'Integer':
                fieldsObj = this.JsonSchema.copy(this.JsonSchema.fields.forInteger);
                break;
            case 'Number':
                fieldsObj = this.JsonSchema.copy(this.JsonSchema.fields.forNumber);
                break;
            case '$ref':
                fieldsObj = this.JsonSchema.copy(this.JsonSchema.fields.for$ref);
                break;
        }
        for (const key in fieldsObj) {
            if (!key) {
                continue;
            }
            const val = fieldsObj[key];
            if (action === 'remove') {
                if (entity.hasOwnProperty(key) && key !== '_type') {
                    delete entity[key];
                }
            } else if (action === 'add') {
                if (!entity.hasOwnProperty(key)) {
                    entity[key] = val;
                }
            }
        };
    }

    keys(obj) {
        return Object.keys(obj);
    }
}
