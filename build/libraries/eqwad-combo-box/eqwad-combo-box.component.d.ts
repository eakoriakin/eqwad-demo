import { Renderer, OnDestroy, EventEmitter } from 'angular2/core';
export declare class EqwadComboBoxComponent implements OnDestroy {
    itemValueField: string;
    itemTextField: string;
    items: Array<Object>;
    placeholder: string;
    onSelect: EventEmitter<any>;
    onOpen: EventEmitter<any>;
    onClose: EventEmitter<any>;
    private comboBoxElement;
    private listElement;
    private textElement;
    value: Array<Object>;
    private _isOpened;
    private _isFocused;
    private _isHovered;
    private _documentClickListener;
    constructor(renderer: Renderer);
    ngOnDestroy(): void;
    open(): void;
    close(): void;
    private _open();
    private _close();
    private _mouseenter();
    private _mouseleave();
    private _select(item, event);
    private _setListWidth();
}
