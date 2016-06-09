"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var EqwadComboBoxComponent = (function () {
    function EqwadComboBoxComponent(renderer) {
        var _this = this;
        this.items = [];
        this.placeholder = '';
        this.onSelect = new core_1.EventEmitter();
        this.onOpen = new core_1.EventEmitter();
        this.onClose = new core_1.EventEmitter();
        this.value = [];
        this._isOpened = false;
        this._isFocused = false;
        this._isHovered = false;
        this._documentClickListener = renderer.listenGlobal('document', 'click', function (event) {
            // Close list if user clicks outside.
            if (!_this._isHovered && _this._isOpened) {
                _this._close();
            }
            if (!_this._isHovered && _this._isFocused) {
                _this._isFocused = false;
            }
        });
    }
    EqwadComboBoxComponent.prototype.ngOnDestroy = function () {
        // Remove listeners.
        this._documentClickListener();
    };
    EqwadComboBoxComponent.prototype.open = function () {
        this._setListWidth();
        this._isOpened = true;
    };
    EqwadComboBoxComponent.prototype.close = function () {
        this._isOpened = false;
    };
    EqwadComboBoxComponent.prototype._open = function () {
        this._isOpened = !this._isOpened;
        if (this._isOpened) {
            this._setListWidth();
            this._isFocused = true;
            this.onOpen.emit(null);
        }
        else {
            this.onClose.emit(null);
        }
    };
    EqwadComboBoxComponent.prototype._close = function () {
        if (!this._isOpened) {
            return;
        }
        this._isOpened = false;
        this.onClose.emit(null);
    };
    EqwadComboBoxComponent.prototype._mouseenter = function () {
        this._isHovered = true;
    };
    EqwadComboBoxComponent.prototype._mouseleave = function () {
        this._isHovered = false;
    };
    EqwadComboBoxComponent.prototype._select = function (item, event) {
        for (var i = 0; i < this.listElement.nativeElement.children.length; i++) {
            this.listElement.nativeElement.children[i].className = 'eq-combo-box-list__item';
        }
        event.target.className = event.target.className + ' eq-combo-box-list__item_is-selected';
        this.value = [item];
        this.textElement.nativeElement.value = item[this.itemTextField];
        this.onSelect.emit(item);
        this._close();
    };
    EqwadComboBoxComponent.prototype._setListWidth = function () {
        // Set list width equal to ComboBox width.
        this.listElement.nativeElement.style.width = this.comboBoxElement.nativeElement.offsetWidth + 'px';
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], EqwadComboBoxComponent.prototype, "itemValueField", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], EqwadComboBoxComponent.prototype, "itemTextField", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], EqwadComboBoxComponent.prototype, "items", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], EqwadComboBoxComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', (typeof (_a = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _a) || Object)
    ], EqwadComboBoxComponent.prototype, "onSelect", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', (typeof (_b = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _b) || Object)
    ], EqwadComboBoxComponent.prototype, "onOpen", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', (typeof (_c = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _c) || Object)
    ], EqwadComboBoxComponent.prototype, "onClose", void 0);
    __decorate([
        core_1.ViewChild('comboBoxElement'), 
        __metadata('design:type', Object)
    ], EqwadComboBoxComponent.prototype, "comboBoxElement", void 0);
    __decorate([
        core_1.ViewChild('listElement'), 
        __metadata('design:type', Object)
    ], EqwadComboBoxComponent.prototype, "listElement", void 0);
    __decorate([
        core_1.ViewChild('textElement'), 
        __metadata('design:type', Object)
    ], EqwadComboBoxComponent.prototype, "textElement", void 0);
    EqwadComboBoxComponent = __decorate([
        core_1.Component({
            selector: 'eq-combo-box',
            template: "\n        <div class=\"eq-combo-box\" #comboBoxElement\n            [ngClass]=\"{ 'eq-combo-box_is-opened': _isOpened, 'eq-combo-box_is-focused': _isFocused }\"\n            (mouseenter)=\"_mouseenter()\"\n            (mouseleave)=\"_mouseleave()\"\n        >\n            <div class=\"eq-combo-box__wrapper\">\n                <input class=\"eq-combo-box__text\" #textElement\n                    type=\"text\"\n                    autocomplete=\"off\"\n                    [placeholder]=\"placeholder\"\n                    readonly\n                />\n                <div class=\"eq-combo-box__open\" (click)=\"_open()\">\n                    <i class=\"fa fa-caret-down\"></i>\n                </div>\n            </div>\n        </div>\n        <div class=\"eq-combo-box-list\" #listElement\n            [ngClass]=\"{ 'eq-combo-box-list_is-opened': _isOpened, 'eq-combo-box-list_is-focused': _isFocused }\"\n            (mouseenter)=\"_mouseenter()\"\n            (mouseleave)=\"_mouseleave()\"\n        >\n            <div class=\"eq-combo-box-list__item\"\n                *ngFor=\"let item of items\"\n                (click)=\"_select(item, $event)\"\n            >{{item[itemTextField]}}\n            </div>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [(typeof (_d = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _d) || Object])
    ], EqwadComboBoxComponent);
    return EqwadComboBoxComponent;
    var _a, _b, _c, _d;
}());
exports.EqwadComboBoxComponent = EqwadComboBoxComponent;

//# sourceMappingURL=eqwad-combo-box.component.js.map
