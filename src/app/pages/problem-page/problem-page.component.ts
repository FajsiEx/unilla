import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-problem-page',
    templateUrl: './problem-page.component.html',
    styleUrls: ['./problem-page.component.scss']
})
export class ProblemPageComponent implements OnInit {

    difficulty = 1;

    baseNum = 0;
    decPointDirection = false;
    correctAnsPow = 0;
    currentProblem = '0.000051';

    answerBase: number;
    answerPow: number;

    constructor() {
    }

    ngOnInit(): void {
        this.generateProblem();
    }

    validate(): boolean {
        if (this.answerBase !== this.baseNum) {
            console.log('[INVALID] Base nums do not match', this.answerBase, this.baseNum);
            return false;
        }

        if (this.answerBase.toString().split('.')[0].length !== 1) {
            // Only 1 decimal place is allowed before the "."
            console.log('[INVALID] Not 1 char before the dec place', this.answerBase.toString().split('.'));
            return false;
        }

        if (this.answerPow !== this.correctAnsPow) {
            console.log('[INVALID] Answer pow not correct. Should be', this.correctAnsPow);
            return false;
        }

        console.log('Validate success!');
        return true;
    }

    generateProblem(): void {
        // Difficulty calculation
        if (this.difficulty > 7.5) {
            // Anything higher than this is actually insane
            this.difficulty = 7.5;
        }

        const minBaseNumberLength = Math.round(1 + Math.pow(1.1, this.difficulty));
        const maxBaseNumberLength = Math.round(1 + 2 * Math.pow(1.1, this.difficulty));
        const minDPShift = 1 + Math.pow(1.5, this.difficulty);
        const maxDPShift = 1 + 2 * Math.pow(1.5, this.difficulty);

        // First we generate a random number
        const baseNumberLength = Math.round(Math.round(Math.random() * (maxBaseNumberLength - minBaseNumberLength)) + minBaseNumberLength);
        const baseNumber = Math.round(Math.random() * 10 * Math.pow(10, baseNumberLength)) / Math.pow(10, baseNumberLength);
        if (baseNumber < 1 || baseNumber >= 10) {
            this.generateProblem();
            return;
        } // We don't want any of that out of range shajt
        this.baseNum = baseNumber;

        // Now we randomly choose the direction of the decimal point
        // true is for things like 4200000
        // false is for things like 0.000042
        const decPointDirection = Math.random() >= 0.5;
        this.decPointDirection = decPointDirection;

        // Next, we choose randomly how many places we shift that decimal point
        const decPlacesCount = Math.round(Math.round(Math.random() * (maxDPShift - minDPShift)) + minDPShift);

        // All that's left to do is just shift the actual decimal place in the base num
        let shiftedNum;

        const baseNumWholePlaces = baseNumber.toString().split('.')[0];
        const baseNumDecimalPlaces = baseNumber.toString().split('.')[1];

        if (decPointDirection) {
            shiftedNum = baseNumWholePlaces + baseNumDecimalPlaces + '0'.repeat(decPlacesCount - baseNumDecimalPlaces.length);
            this.correctAnsPow = decPlacesCount;
        } else {
            try {
                shiftedNum = '0.' + '0'.repeat(decPlacesCount - baseNumDecimalPlaces.length) + baseNumWholePlaces + baseNumDecimalPlaces;

                let i = 0;
                let firstNumIndex = 0;
                for (const char of shiftedNum.toString()) {
                    if (parseInt(char, 10) > 0) {
                        firstNumIndex = i;
                        break;
                    }
                    i++;
                }
                console.log('FNI is', firstNumIndex);

                this.correctAnsPow = -(firstNumIndex - 1);
            } catch (e) {
                console.error(e);
            }
        }

        console.log(`DIFF:${this.difficulty} // Solution: ${this.baseNum} * 10^${this.correctAnsPow}`);

        this.difficulty += 0.1;

        this.currentProblem = shiftedNum;
    }

}
