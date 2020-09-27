import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-results-page',
    templateUrl: './results-page.component.html',
    styleUrls: ['./results-page.component.scss']
})
export class ResultsPageComponent implements OnInit {

    score = 0;

    constructor() {
    }

    ngOnInit(): void {
        const lastResults = JSON.parse(sessionStorage.u_last_results);
        this.score = (lastResults && lastResults.score) ? lastResults.score : 0;
    }

}
