import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
    options = {
        problemCount: 10,
        secondsPerProblem: 30
    };

    constructor() {
    }

    ngOnInit(): void {
        this.loadOptionsFromStorage();
    }

    loadOptionsFromStorage(): void {
        try {
            const loadedOptions = JSON.parse(localStorage.u_options);

            if (
                !parseInt(loadedOptions.problemCount, 10) ||
                !loadedOptions.secondsPerProblem
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
