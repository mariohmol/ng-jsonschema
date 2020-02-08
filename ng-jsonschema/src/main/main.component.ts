import { Component, Input, OnInit } from '@angular/core';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'ng-jsonschema-main',
    templateUrl: './main.component.html',
    providers: []
})
export class MainJsonSchemaComponent implements OnInit {
    @Input()
    entity;

    @Input()
    openMenu;

    @Input()
    removeEntity;

    showDetailsPan = false;
    ctrl = {
        expanded: true
    };

    ngOnInit() {
        console.log(this.entity);
    }

    keys(obj) {
        return Object.keys(obj);
    }

    checkTypeObject(entity) {
        return entity._items && entity._items[0] && entity._items[0]._type[0] && entity._items[0]._type[0] === 'Object';
    }
}
