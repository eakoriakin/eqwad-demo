import { Component, ViewChild } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { EqwadComboBox } from 'eqwad-combo-box';

@Component({
    selector: 'app',
    templateUrl: 'app/app/app.component.html',
    directives: [
        ROUTER_DIRECTIVES,
        EqwadComboBox
    ]
})
export class AppComponent {
    fabrics = [
        { name: 'Cotton', id: '1' },
        { name: 'Polyester', id: '2' },
        { name: 'Cotton/Polyester', id: '3' },
        { name: 'Rib Knit', id: '4' }
    ];

    @ViewChild('fabricsComboBox') fabricsComboBox: EqwadComboBox;

    select(item: Object) {
        console.log('select:', item);
    }

    open() {
        console.log('open');
    }

    close() {
        console.log('close');
    }
}
