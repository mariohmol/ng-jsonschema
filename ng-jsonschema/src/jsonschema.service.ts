
export class JsonSchemaService {


    MODELS = {};
    Default = {
        _key: '',
        _title: '',
        _description: '',
        _$ref: '',
        _default: '',
        _enum: '',
        _type: '',
        _required: false,
        __ID__: ''
    };
    additional = {
        forObject: {
            _properties: [],
            _additionalProperties: [],
            _disallowAdditional: false,
            _maxProperties: undefined,
            _minProperties: undefined,
            _type: ['Object']
        },
        forString: {
            _format: '',
            _pattern: undefined,
            _maxLength: undefined,
            _minLength: undefined,
            _type: ['String']
        },
        forArray: {
            _items: [],
            _maxItems: undefined,
            _minItems: undefined,
            _uniqueItems: undefined,
            _type: ['Array']
        },
        forInteger: {
            _format: '',
            _maximum: undefined,
            _minimum: undefined,
            _exclusiveMaximum: undefined,
            _exclusiveMinimum: undefined,
            _multipleOf: undefined,
            _type: ['Integer']

        },
        forNumber: {
            _format: '',
            _maximum: undefined,
            _minimum: undefined,
            _exclusiveMaximum: undefined,
            _exclusiveMinimum: undefined,
            _multipleOf: undefined,
            _type: ['Number']

        },
        for$ref: {
            _type: ['$ref'],
            _value: ''
        }
    };

    _id_ = 0;
    fields;

    constructor() {
        this.fields = this.additional;
        /*MODELS.copyCommonProperties = function (newModel, oldModel) {
            if (newModel === undefined || oldModel === undefined)
                return newModel;
            newModel._description = oldModel._description;
            newModel._required = oldModel._required;
            return newModel;
        };*/
    }


    newArray(key) {
        const newArr = { ...this.Default, ...this.additional.forArray };
        this._id_ += 1;
        newArr.__ID__ = '$model' + this._id_;
        newArr._key = key;
        return newArr;
    };

    newBoolean(key) {
        const newBool = { ...this.Default, ...{ _type: ['Boolean'] } };
        this._id_ += 1;
        newBool.__ID__ = '$model' + this._id_;
        newBool._key = key;
        return newBool;
    };

    newInteger(key) {
        const newInt = { ...this.Default, ...this.additional.forInteger };
        this._id_ += 1;
        newInt.__ID__ = '$model' + this._id_;
        newInt._key = key;
        return newInt;
    };

    newNumber(key) {
        const newNum = { ... this.Default, ...this.additional.forNumber };
        this._id_ += 1;
        newNum.__ID__ = '$model' + this._id_;
        newNum._key = key;
        return newNum;
    };

    newNull(key) {
        const newNull = { ...this.Default, ...{ _type: ['Null'] } };
        this._id_ += 1;
        newNull.__ID__ = '$model' + this._id_;
        newNull._key = key;
        return newNull;
    };

    newObject(key, props = null) {
        const newObj = { ...this.Default, ...this.additional.forObject };
        this._id_ += 1;
        newObj.__ID__ = '$model' + this._id_;
        newObj._key = key;

        if (props) {
            newObj._properties = props;
        }

        return newObj;
    };

    newString(key) {
        const newStr = { ...this.Default, ...this.additional.forString };
        this._id_ += 1;
        newStr.__ID__ = '$model' + this._id_;
        newStr._key = key;
        // newStr.disabled = true;
        return newStr;
    };

    new$ref(key, value) {
        const newRef: any = { ...{}, ...this.additional.for$ref };
        this._id_ += 1;
        newRef.__ID__ = '$model' + this._id_;
        newRef._key = key;
        newRef._value = value;
        return newRef;
    };

    copy(data) {
        return JSON.parse(JSON.stringify(data));
    }

    getObjPropertyByKey(obj, key) {
        if (obj && obj._properties && obj._properties.length > 0) {
            let found = false;
            for (let i = 0; i < obj._properties.length; i++) {
                const prop = obj._properties[i];
                for (const kk in prop) {
                    if (!kk) {
                        continue;
                    }
                    const val = prop[kk];
                    if (val._key === key) {
                        found = val;
                    }
                };
                if (found) {
                    return found;
                }
            }
        }
        return false;
    };


    obj2schema(entity, models) {
        const schema: any = {};
        schema.type = [];
        for (let x = 0; x < entity._type.length; x++) {
            const type = entity._type[x];
            switch (type) {
                case 'Object':
                    schema.type.push('object');
                    if (entity._description) {
                        schema.description = entity._description;
                    }
                    if (entity._minProperties >= 0) {
                        schema.minProperties = entity._minProperties;
                    }
                    if (entity._maxProperties >= 0) {
                        schema.maxProperties = entity._maxProperties;
                    }
                    if (entity._disallowAdditional) {
                        schema.additionalProperties = !entity._disallowAdditional;
                    }
                    if (entity._properties.length > 0) {
                        schema.properties = {};
                        schema.required = [];
                        for (let i = 0; i < entity._properties.length; i++) {
                            const o = entity._properties[i];
                            for (const key in o) {
                                if (!key) {
                                    continue;
                                }
                                const val = o[key];
                                if (val && val._type) {
                                    const res = this.obj2schema(val, models);
                                    schema.properties[val._key] = res;
                                    if (val._required) {
                                        schema.required.push(val._key);
                                    }
                                }
                            };
                        }
                        if (schema.required.length === 0) {
                            delete schema.required;
                        }
                    }
                    break;
                case 'String':
                    schema.type.push('string');
                    if (entity._description) {
                        schema.description = entity._description;
                    }
                    if (entity._minLength >= 0) {
                        schema.minLength = entity._minLength;
                    }
                    if (entity._maxLength >= 0) {
                        schema.maxLength = entity._maxLength;
                    }
                    if (entity._pattern) {
                        schema.pattern = entity._pattern;
                    }
                    if (entity._format) {
                        schema.format = entity._format;
                    }
                    if (entity._default) {
                        schema.default = entity._default;
                    }
                    if (entity._enum) {
                        const _enum = '[' + entity._enum + ']';
                        try {
                            schema.enum = JSON.parse(_enum);
                        } catch (e) {
                            delete schema.enum;
                        }
                    }
                    break;
                case 'Array':
                    schema.type.push('array');
                    if (entity._description) {
                        schema.description = entity._description;
                    }
                    if (entity._default) {
                        schema.default = entity._default;
                    }
                    if (entity._uniqueItems) {
                        schema.uniqueItems = entity._uniqueItems;
                    }
                    if (entity._minItems >= 0) {
                        schema.minItems = entity._minItems;
                    }
                    if (entity._maxItems >= 0) {
                        schema.maxItems = entity._maxItems;
                    }
                    if (entity._items && entity._items[0]) {
                        schema.items = this.obj2schema(entity._items[0], models);
                    }
                    break;
                case 'Integer':
                case 'Number':
                    schema.type.push(type === 'Integer' ? 'integer' : 'number');
                    if (entity._description) {
                        schema.description = entity._description;
                    }
                    if (entity._default) {
                        schema.default = entity._default;
                    }
                    if (entity._minimum >= 0) {
                        schema.minimum = entity._minimum;
                    }
                    if (entity._maximum >= 0) {
                        schema.maximum = entity._maximum;
                    }
                    if (entity._exclusiveMinimum) {
                        schema.exclusiveMinimum = entity._exclusiveMinimum;
                    }
                    if (entity._exclusiveMaximum) {
                        schema.exclusiveMaximum = entity._exclusiveMaximum;
                    }
                    if (entity._multipleOf >= 0) {
                        schema.multipleOf = entity._multipleOf;
                    }
                    if (entity._format) {
                        schema.format = entity._format;
                    }
                    if (entity._enum) {
                        const _enum = '[' + entity._enum + ']';
                        try {
                            schema.enum = JSON.parse(_enum);
                        } catch (e) {
                            delete schema.enum;
                        }
                    }
                    break;
                case 'Boolean':
                    schema.type.push('boolean');
                    if (entity._description) {
                        schema.description = entity._description;
                    }
                    if (entity._default) {
                        try {
                            const bool = JSON.parse(entity._default);
                            if (typeof bool === 'boolean') {
                                schema.default = bool;
                            }
                        } catch (e) {

                        }

                    }
                    break;
                case 'Null':
                    schema.type.push('null');
                    if (entity._description) {
                        schema.description = entity._description;
                    }
                    if (entity._default) {
                        schema.default = entity._default;
                    }
                    break;
                case '$ref':
                    let path = '';
                    if (models && models[entity._value] && models[entity._value].nameSpace) {
                        path = models[entity._value].nameSpace;
                    }
                    schema.$ref = '#/definitions/' + path;
                    delete schema.type;
            }
        }
        if (schema.type && schema.type.length === 1) {
            const t = schema.type[0];
            schema.type = t;
        }
        return schema;
    }


    copyProps(obj, newModel) {
        for (const key in newModel) {
            if (!key) {
                continue;
            }
            const val = newModel[key];
            if (!obj.hasOwnProperty(key)) {
                obj[key] = val;
            }
        });
    }

    schema2obj(schema, key, required, isRoot, modelObjs) {
        if (!schema) {
            schema = this.newObject('##ROOT##');
            schema.root$$ = true;
            return schema;
        }
        if (typeof schema === 'string') {
            try {
                schema = JSON.parse(schema);
            } catch (e) {
                return null;
            }
        }
        if (key === undefined) {
            key = '##ROOT##';
        }

        if (!required) {
            required = false;
        }


        let obj;
        if (!(schema.type instanceof Array)) {
            schema.type = [schema.type];
        }
        // let types = schema.type;
        for (let x = 0; x < schema.type.length; x++) {
            const type = schema.type[x];
            switch (type) {
                case 'object':
                    const newObjectModel = this.copy(this.newObject(key));
                    if (obj && obj._type && obj._type.length > 0) {
                        obj._type.push(newObjectModel._type[0]);
                        this.copyProps(obj, newObjectModel);
                    } else {
                        obj = newObjectModel;
                    }

                    if (schema.description) {
                        obj._description = schema.description;
                    }
                    if (schema.minProperties >= 0) {
                        obj._minProperties = schema.minProperties;
                    }
                    if (schema.maxProperties >= 0) {
                        obj._maxProperties = schema.maxProperties;
                    }
                    if (schema.hasOwnProperty('additionalProperties')) {
                        obj._disallowAdditional = !schema.additionalProperties;
                    }
                    for (const kk in schema.properties) {
                        if (!kk) {
                            continue;
                        }
                        const entity = schema.properties[kk];
                        let req = false;
                        if (schema.required) {
                            req = schema.required.indexOf(kk) >= 0 ? true : false;
                        }
                        const childObj = {};
                        childObj[kk] = this.schema2obj(entity, kk, req, false, modelObjs);
                        obj._properties.push(childObj);
                    };
                    break;
                case 'array':
                    const newArrayModel = this.copy(this.newArray(key));
                    if (obj && obj._type && obj._type.length > 0) {
                        obj._type.push(newArrayModel._type[0]);
                        this.copyProps(obj, newArrayModel);
                    } else {
                        obj = newArrayModel;
                    }

                    if (schema.description) {
                        obj._description = schema.description;
                    }
                    if (schema.default) {
                        obj._default = schema.default;
                    }
                    if (schema.hasOwnProperty('uniqueItems')) {
                        obj._uniqueItems = obj.uniqueItems;
                    }
                    if (schema.hasOwnProperty('minItems')) {
                        obj._minItems = schema.minItems;
                    }
                    if (schema.hasOwnProperty('maxItems')) {
                        obj._maxItems = schema.maxItems;
                    }

                    if (schema.items) {
                        obj._items = [];
                        let req = false;
                        if (schema.required) {
                            req = schema.required.indexOf(key) >= 0 ? true : false;
                        }
                        obj._items.push(this.schema2obj(schema.items, '', req, false, modelObjs));
                    }
                    break;
                case 'string':
                    const newStringModel = this.copy(this.newString(key));
                    if (obj && obj._type && obj._type.length > 0) {
                        obj._type.push(newStringModel._type[0]);
                        this.copyProps(obj, newStringModel);
                    } else {
                        obj = newStringModel;
                    }
                    if (schema.description) {
                        obj._description = schema.description;
                    }
                    if (schema.minLength >= 0) {
                        obj._minLength = schema.minLength;
                    }
                    if (schema.maxLength >= 0) {
                        obj._maxLength = schema.maxLength;
                    }
                    if (schema.pattern) {
                        obj._pattern = schema.pattern;
                    }
                    if (schema.format) {
                        obj._format = schema.format;
                    }
                    if (schema.default) {
                        obj._default = schema.default;
                    }
                    if (schema.hasOwnProperty('enum') && schema.enum.length > 0) {
                        let _enum = JSON.stringify(schema.enum);
                        _enum = _enum.substr(1, _enum.length - 2);
                        _enum = _enum.replace(/,/g, ',\n');
                        obj._enum = _enum;
                    }
                    break;
                case 'integer':
                case 'number':
                    let newNumberModel;
                    if (type === 'integer') {
                        newNumberModel = this.copy(this.newInteger(key));
                    } else {
                        newNumberModel = this.copy(this.newNumber(key));
                    }
                    if (obj && obj._type && obj._type.length > 0) {
                        obj._type.push(newNumberModel._type[0]);
                        this.copyProps(obj, newNumberModel);
                    } else {
                        obj = newNumberModel;
                    }

                    if (schema.description) {
                        obj._description = schema.description;
                    }
                    if (schema.default) {
                        obj._default = schema.default;
                    }
                    if (schema.minimum >= 0) {
                        obj._minimum = schema.minimum;
                    }
                    if (schema.maximum >= 0) {
                        obj._maximum = schema.maximum;
                    }
                    if (schema.exclusiveMinimum) {
                        obj._exclusiveMinimum = schema.exclusiveMinimum;
                    }
                    if (schema.exclusiveMaximum) {
                        obj._exclusiveMaximum = schema.exclusiveMaximum;
                    }
                    if (schema.multipleOf >= 0) {
                        obj._multipleOf = schema.multipleOf;
                    }
                    if (schema.format) {
                        obj._format = schema.format;
                    }
                    if (schema.hasOwnProperty('enum') && schema.enum.length > 0) {
                        let _enum = JSON.stringify(schema.enum);
                        _enum = _enum.substr(1, _enum.length - 2);
                        _enum = _enum.replace(/,/g, ',\n');
                        obj._enum = _enum;
                    }
                    break;
                case 'boolean':
                    const newBooleanModel = this.copy(this.newBoolean(key));
                    if (obj && obj._type && obj._type.length > 0) {
                        obj._type.push(newBooleanModel._type[0]);
                        this.copyProps(obj, newBooleanModel);
                    } else {
                        obj = newBooleanModel;
                    }
                    if (schema.description) {
                        obj._description = schema.description;
                    }
                    if (schema.default) {
                        obj._default = schema.default;
                    }
                    break;
                case 'null':
                    const newNullModel = this.copy(this.newNull(key));
                    if (obj && obj._type && obj._type.length > 0) {
                        obj._type.push(newNullModel._type[0]);
                        this.copyProps(obj, newNullModel);
                    } else {
                        obj = newNullModel;
                    }
                    // schema.type = 'null';
                    if (schema.description) {
                        obj._description = schema.description;
                    }
                    if (schema.default) {
                        obj._default = schema.default;
                    }
                    break;
            }
            if (!type && schema.$ref) {
                const value = schema.$ref.substring(14, schema.$ref.length);
                let modelKey = '';
                if (modelObjs) {
                    for (const kk in modelObjs) {
                        if (!kk) {
                            continue;
                        }
                        const model = modelObjs[kk];
                        if (model.nameSpace === value) {
                            modelKey = kk;
                        }
                    };
                }

                obj = this.new$ref(key, modelKey);
            }
        }

        obj._required = required;
        if (isRoot) {
            obj.root$$ = true;
        }

        return obj;
    }

    getModeldefinitions(models) {
        const modelRefs = {};
        for (const key in models) {
            if (!key) {
                continue;
            }
            const model = models[key];
            modelRefs[model.nameSpace] = model.data;
        };
        return modelRefs;
    }

}
