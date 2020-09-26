import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-problem-page',
    templateUrl: './problem-page.component.html',
    styleUrls: ['./problem-page.component.scss']
})
export class ProblemPageComponent implements OnInit {

    difficulty = 5;

    currentProblem = '0.000051';

    constructor() {
    }

    ngOnInit(): void {
        this.generateProblem();
    }

    generateProblem(): void {
        // Difficulty calculation
        const maxBaseNumber = 499 * Math.pow(2, this.difficulty);
        const minDPShift = 2 + Math.pow(1.5, this.difficulty);
        const maxDPShift = 2 + 2 * Math.pow(1.5, this.difficulty);

        // First we generate a random number
        const baseNumber = Math.round(Math.random() * maxBaseNumber);

        // Now we randomly choose the direction of the decimal point
        // false is for things like 0.000042
        // true is for things like 4200000
        const decPointDirection = Math.random() >= 0.5;

        // Next, we choose randomly how many places we shift that decimal point
        const decPlacesCount = Math.round(Math.round(Math.random() * (maxDPShift - minDPShift)) + minDPShift);

        // All that's left to do is just shift the actual decimal place in the base num
        let shiftedNum;

        if (decPointDirection) {
            shiftedNum = baseNumber / Math.pow(10, decPlacesCount);
        } else {
            shiftedNum = baseNumber * Math.pow(10, decPlacesCount);
        }

        console.log(maxBaseNumber, minDPShift, maxDPShift, baseNumber, decPointDirection, decPlacesCount);

        this.currentProblem = shiftedNum.toFixed(decPlacesCount).replace(/\.?0+$/,'');
    }

}
