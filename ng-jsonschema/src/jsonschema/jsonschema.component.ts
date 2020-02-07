import { Component, OnInit, Input } from '@angular/core';
import { JsonSchemaService } from '../jsonschema.service';

@Component({
    //  tslint:disable-next-line: component-selector
    selector: 'ng-jsonschema',
    templateUrl: './jsonschema.component.html',
    providers: []
})
export class JsonSchemaComponent implements OnInit {
    @Input()
    $schema: any = {};

    @Input()
    $refModels: any = {};

    $models;


    //  restrict: 'A',
    //  scope: {
    //      $data: '=data',
    //      $mode: '@mode',
    //      $msg: '@msg',
    //      $models: '=models',
    //      readonly: '@readonly'
    //  },
    //  templateUrl: 'index-json-schema.html',

    configs: any = {
        showMoreOptn: '',
        currModelType: [],
        extraArrayOptn: '',
        menuOpen: true
    };
    modelRef: any = {
        model: 0
    };
    $mode;
    $data;
    entity;
    selectedEntity;
    JsonSchema = new JsonSchemaService();

    ngOnInit() {
        this.initRootElement();
        //  initialize the root
        // this.data = JsonSchema.schema2obj(schema);
        // this.data.root$$ = true; 
    }

    str(data) {
        return JSON.stringify(data, function (k, v) { if (v === undefined) { return null; } return v; }, '     ');
    }

    initRootElement() {
        this.$mode = this.$mode ? this.$mode : 'object';
        if (this.$data) {
            this.entity = this.$data;
            this.JsonSchema._id_ = this.getLastModelId(this.$data, 0);
            return;
        }
        this.$data = this.JsonSchema.newObject('##ROOT##');
        this.$data.root$$ = true;

        //  initiate the entity used in all html templates;update whenever $data is changes (new opject is created)
        this.entity = this.$data;
    }

    //  generates a model based on the type and key
    generateModel(type, key) {
        let newModel;
        switch (type) {
            case 'Array':
                newModel = this.JsonSchema.newArray(key);
                break;
            case 'Boolean':
                newModel = this.JsonSchema.newBoolean(key);
                break;
            case 'Integer':
                newModel = this.JsonSchema.newInteger(key);
                break;
            case 'Number':
                newModel = this.JsonSchema.newNumber(key);
                break;
            case 'Null':
                newModel = this.JsonSchema.newNull(key);
                break;
            case 'Object':
                newModel = this.JsonSchema.newObject(key);
                break;
            case 'String':
                newModel = this.JsonSchema.newString(key);
                break;
            case '$ref':
                newModel = this.JsonSchema.new$ref(key);
                break;
        }
        return newModel;
    }

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

    openMenu(entity, e) {
        const target = e.currentTarget;
        // this.showSelector = true;
        this.modelChangesCallback(entity);
        const left = e.clientX;
        let top = e.clientY + 15;
        const popHeight = 270; // max height of the popup
        const winHeight = window.innerHeight;
        if (winHeight - top < popHeight) {
            top = winHeight - popHeight;
        }
        // TODO: angular.element(target).parents('.json-schema').find('#model-type-selector')
        // .css({ 'top': top + 'px', 'left': left + 'px' }).show();
        e.preventDefault();
        e.stopPropagation();
    };

    // recursively fine the parent and add the entity
    addNewProp(entity, data, e, forArray) {
        if (forArray) {
            this.addNewPropArrObj(entity, data, e);
            return;
        }
        const apic = this.JsonSchema.newString('');

        entity._properties.push({ '': apic });
        setTimeout(function () {
            // TODO: angular.element(e.currentTarget).parents('.objCont').find('.propCont').last().find('.model-key').focus();
        });
        return;

        /*if (entity.__ID__ === data.__ID__) {
             let apic = JsonSchema.newString('');
             data._properties.push({"": apic});
             $timeout(function () {
                 angular.element(e.currentTarget).parents('.objCont').find('.propCont').last().find('.model-key').focus();
             });
         } else if (data._properties && data._properties.length >= 0) {
             for (let i = 0; i < data._properties.length; i++) {
                 let o = data._properties[i];
                 angular.forEach(o, function (val, key) {
                     $scope.addNewProp(entity, val, e);
                 });
             }
         }*/
    };

    // Add property when array type is Object
    addNewPropArrObj(entity, data, e) {
        if (!entity._items) {
            return;
        }
        const apic = this.JsonSchema.newString('');
        entity._items[0]._properties.push({ '': apic });
        setTimeout(function () {
            // TODO: angular.element(e.currentTarget).parents('.objCont').find('.propCont').last().find('.model-key').focus();
        });
    };

    // callback after the model changed
    modelChangesCallback(entity) {
        this.configs.currModelType = entity._type;
        this.selectedEntity = entity;
        if (entity._type.indexOf('Array') >= 0) {
            this.configs.showMoreOptn = 'array';
            if (entity._type.indexOf('$ref') >= 0) {
                this.configs.showMoreOptn = 'Array$ref';
                this.modelRef.model = '';
            }
        } else if (entity._type.indexOf('$ref') >= 0) {
            this.configs.showMoreOptn = '$ref';
            this.modelRef.model = '';
        } else {
            this.configs.showMoreOptn = '';
        }
        this.configs.extraArrayOptn = false;
    };

    setArrayType(type, entity, e) {
        const newM = this.generateModel(type, 'arrayEle');
        entity = this.selectedEntity;
        entity._items[0] = newM;
        if (type === '$ref') {
            this.configs.extraArrayOptn = true;
            this.modelRef.model = '';
        } else {
            this.configs.extraArrayOptn = false;
        }
        e.stopPropagation();
    };

    setModelFor$Ref() {
        if (this.configs.extraArrayOptn) {
            this.selectedEntity._items[0]._value = this.modelRef.model;
            console.log(this.selectedEntity);
        } else {
            this.selectedEntity._value = this.modelRef.model;
        }
    }

    removeEntity(entity) {
        const res = this.removeModel(this.$data, entity.__ID__);
        if (res !== undefined) {
            this.$data._properties.splice(res, 1);
        }
    }

    removeModel(data, id, i = null) {
        if (data.__ID__ === id) {
            return i;
        }

        let res;
        for (let j = 0; j < data._type.length; j++) {
            const type = data._type[j];
            switch (type) {
                case 'Object':
                    for (let ii = 0; ii < data._properties.length; ii++) {
                        const o = data._properties[ii];
                        for (const key in o) {
                            if (!key) {
                                continue;
                            }
                            const val = o[key];
                            res = this.removeModel(val, id, ii);
                            if (res !== undefined) {
                                data._properties.splice(ii, 1);
                            }
                        };
                    }
                    break;
                case 'Array':
                    if (data._items[0] && data._items[0]._properties) {
                        for (let ii = 0; ii < data._items[0]._properties.length; ii++) {
                            const o = data._items[0]._properties[ii];
                            for (const key in o) {
                                if (!key) {
                                    continue;
                                }
                                const val = o[key];
                                res = this.removeModel(val, id, ii);
                                if (res !== undefined) {
                                    data._items[0]._properties.splice(ii, 1);
                                }
                            };
                        }
                    }
                    break;
            }
        }

    }

    convertObj2Schema() {
        const schema = this.JsonSchema.obj2schema(this.$data, this.$models);
        console.log(this.$data);
        this.$schema = {
            original: JSON.stringify(schema, null, '    '),
            dup: JSON.stringify(schema, null, '    ')
        };

    }

    convertSchema2Obj() {
        if (this.$schema && this.$schema.original !== this.$schema.dup) {
            this.$data = this.JsonSchema.schema2obj(this.$schema.original, undefined, undefined, true, this.$models);
        }
    }

    // $scope.$watch(function() {
    //     return $scope.$data;
    // }, function() {
    //     initRootElement();
    // });

    getLastModelId(data, lastId) {
        const id = data.__ID__;
        const idNum = parseInt(id.substring(6, id.length), 10);
        if (idNum >= lastId) {
            lastId = idNum;
        }

        switch (data._type) {
            case 'Object':
                for (let i = 0; i < data._properties.length; i++) {
                    const o = data._properties[i];
                    for (const key in o) {
                        if (!key) {
                            continue;
                        }
                        const val: any = o[key];
                        if (typeof val === 'object' && val.__ID__) {
                            lastId = this.getLastModelId(val, lastId);
                        }
                    };
                }
                break;
            case 'Array':
                if (data._items[0] && data._items[0]._properties) {
                    for (let i = 0; i < data._items[0]._properties.length; i++) {
                        const o = data._items[0]._properties[i];
                        for (const key in o) {
                            if (!key) {
                                continue;
                            }
                            const val = o[key];
                            if (typeof val === 'object' && val.__ID__) {
                                lastId = this.getLastModelId(val, lastId);
                            }
                        };
                    }
                } else if (data._items[0]) {
                    lastId = this.getLastModelId(data._items[0], lastId);
                }
                break;
        }

        return lastId;
    }
}
