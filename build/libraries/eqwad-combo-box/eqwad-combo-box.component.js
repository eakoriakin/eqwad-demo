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
var eqwad_combo_box_filter_pipe_1 = require('./eqwad-combo-box-filter.pipe');
var EqwadComboBox = (function () {
    function EqwadComboBox(renderer) {
        var _this = this;
        this.items = [];
        this.placeholder = '';
        this.onSelect = new core_1.EventEmitter();
        this.onOpen = new core_1.EventEmitter();
        this.onClose = new core_1.EventEmitter();
        this.value = [];
        this._text = '';
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
    EqwadComboBox.prototype.ngOnDestroy = function () {
        // Remove listeners.
        this._documentClickListener();
    };
    EqwadComboBox.prototype.open = function () {
        this._checkItems();
        this._positionList();
        this._isOpened = true;
    };
    EqwadComboBox.prototype.close = function () {
        this._isOpened = false;
    };
    EqwadComboBox.prototype._open = function () {
        this._checkItems();
        this._isOpened = !this._isOpened;
        if (this._isOpened) {
            this._positionList();
            this._isFocused = true;
            this.onOpen.emit(null);
        }
        else {
            this.onClose.emit(null);
        }
    };
    EqwadComboBox.prototype._close = function () {
        if (!this._isOpened) {
            return;
        }
        this._isOpened = false;
        this.onClose.emit(null);
    };
    EqwadComboBox.prototype._mouseenter = function () {
        this._isHovered = true;
    };
    EqwadComboBox.prototype._mouseleave = function () {
        this._isHovered = false;
    };
    EqwadComboBox.prototype._select = function (item, event) {
        for (var i = 0; i < this.listElement.nativeElement.children.length; i++) {
            this.listElement.nativeElement.children[i].className = 'eq-combo-box-list__item';
        }
        event.target.className = event.target.className + ' eq-combo-box-list__item_is-selected';
        this.value = [item];
        this.textElement.nativeElement.value = item[this.itemTextField];
        this.onSelect.emit(item);
        this._close();
    };
    EqwadComboBox.prototype._positionList = function () {
        this.listElement.nativeElement.style.width = this.comboBoxElement.nativeElement.offsetWidth + 'px';
        this.listElement.nativeElement.style.left = this.comboBoxElement.nativeElement.offsetLeft + 'px';
    };
    EqwadComboBox.prototype._textChange = function (text) {
        this._text = text;
        this._checkItems();
    };
    EqwadComboBox.prototype._checkItems = function () {
        this._hasItems = new eqwad_combo_box_filter_pipe_1.EqwadComboBoxFilter().transform(this.items, this.itemTextField, this._text).length > 0;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], EqwadComboBox.prototype, "itemValueField", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], EqwadComboBox.prototype, "itemTextField", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], EqwadComboBox.prototype, "items", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], EqwadComboBox.prototype, "placeholder", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', (typeof (_a = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _a) || Object)
    ], EqwadComboBox.prototype, "onSelect", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', (typeof (_b = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _b) || Object)
    ], EqwadComboBox.prototype, "onOpen", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', (typeof (_c = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _c) || Object)
    ], EqwadComboBox.prototype, "onClose", void 0);
    __decorate([
        core_1.ViewChild('comboBoxElement'), 
        __metadata('design:type', Object)
    ], EqwadComboBox.prototype, "comboBoxElement", void 0);
    __decorate([
        core_1.ViewChild('listElement'), 
        __metadata('design:type', Object)
    ], EqwadComboBox.prototype, "listElement", void 0);
    __decorate([
        core_1.ViewChild('textElement'), 
        __metadata('design:type', Object)
    ], EqwadComboBox.prototype, "textElement", void 0);
    EqwadComboBox = __decorate([
        core_1.Component({
            selector: 'eq-combo-box',
            pipes: [eqwad_combo_box_filter_pipe_1.EqwadComboBoxFilter],
            template: "\n        <div class=\"eq-combo-box\" #comboBoxElement\n            [ngClass]=\"{\n                'eq-combo-box_is-opened': _isOpened,\n                'eq-combo-box_is-focused': _isFocused,\n                'eq-combo-box_has-items': _hasItems\n            }\"\n            (mouseenter)=\"_mouseenter()\"\n            (mouseleave)=\"_mouseleave()\">\n            <div class=\"eq-combo-box__wrapper\">\n                <input class=\"eq-combo-box__text\" #textElement\n                    type=\"text\"\n                    autocomplete=\"off\"\n                    [ngModel]=\"_text\"\n                    (ngModelChange)=\"_textChange($event)\"\n                    [placeholder]=\"placeholder\"/>\n                <div class=\"eq-combo-box__open\" (click)=\"_open()\">\n                    <i class=\"fa fa-caret-down\"></i>\n                </div>\n            </div>\n        </div>\n        <div class=\"eq-combo-box-list\" #listElement\n            [ngClass]=\"{\n                'eq-combo-box-list_is-opened': _isOpened,\n                'eq-combo-box-list_is-focused': _isFocused,\n                'eq-combo-box-list_has-items': _hasItems\n            }\"\n            (mouseenter)=\"_mouseenter()\"\n            (mouseleave)=\"_mouseleave()\">\n            <div class=\"eq-combo-box-list__item\"\n                *ngFor=\"let item of (items | eqwadComboBoxFilter:itemTextField:_text)\"\n                (click)=\"_select(item, $event)\">\n                {{item[itemTextField]}}\n            </div>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [(typeof (_d = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _d) || Object])
    ], EqwadComboBox);
    return EqwadComboBox;
    var _a, _b, _c, _d;
}());
exports.EqwadComboBox = EqwadComboBox;

//# sourceMappingURL=eqwad-combo-box.component.js.map
