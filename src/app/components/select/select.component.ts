import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

    @Input() icon: string;
    @Input() label: string;
    @Input() options: Array<any>;

    @Input() value: any;
    @Output() valueChange = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit(): void {
    }

    changeValue(value) {
        this.value = value;
        this.valueChange.emit(value);
    }

}
