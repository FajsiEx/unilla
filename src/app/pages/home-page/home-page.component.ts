import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
    options = {
        difficulty: 1,
    };

    difficultyOptions = [
        {
            icon: 'far fa-smile',
            value: 1
        }, {
            icon: 'far fa-meh',
            value: 2
        }, {
            icon: 'far fa-frown',
            value: 3
        },
        // { // The hidden diff for now :)
        //     icon: 'far fa-flushed',
        //     value: 4
        // }
    ];

    constructor() {
    }

    ngOnInit(): void {
        this.loadOptionsFromStorage();
    }

    loadOptionsFromStorage(): void {
        try {
            const loadedOptions = JSON.parse(localStorage.u_options);

            if (
                !parseInt(loadedOptions.difficulty, 10)
            ) {
                throw('Malformed options');
            }

            this.options = loadedOptions;
        } catch (e) {
            console.warn('Failed to load options from the storage', e);
        }
    }

    onOptionChange(): void {
        localStorage.u_options = JSON.stringify(this.options);
    }

}
