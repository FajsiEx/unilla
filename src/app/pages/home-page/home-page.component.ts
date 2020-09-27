import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
    options = {
        difficulty: 1,
        theme: 'dark'
    };

    secretDiffClickCounter = 0;
    secretDiffUnlocked = false;

    difficultyOptions = [
        {
            icon: 'far fa-smile',
            value: 1
        }, {
            icon: 'far fa-meh',
            value: 3
        }, {
            icon: 'far fa-frown',
            value: 4
        }
    ];

    themeOptions = [
        {
            icon: 'far fa-sun',
            value: 'light'
        }, {
            icon: 'far fa-moon',
            value: 'dark'
        }
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
        this.onOptionChange();
    }

    onOptionChange(): void {
        localStorage.u_options = JSON.stringify(this.options);

        this.changeTheme();

        if (this.options.difficulty === 4 && !this.secretDiffUnlocked) {
            this.secretDiffClickCounter++;
            if (this.secretDiffClickCounter > 5) {
                this.secretDiffUnlocked = true;
                this.difficultyOptions.push({
                    icon: 'far fa-flushed',
                    value: 7.5
                });
            }
        } else {
            this.secretDiffClickCounter = 0;
        }
    }

    changeTheme(): void {
        const lightTheme = {
            '--color-bg': '#fff',
            '--color-bg-l1': '#ddd',
            '--color-text': '#000'
        };
        const darkTheme = {
            '--color-bg': '#000',
            '--color-bg-l1': '#222',
            '--color-text': '#fff'
        };

        let selectedTheme;
        if (this.options.theme === 'light') {
            selectedTheme = lightTheme;
        } else {
            selectedTheme = darkTheme;
        }

        Object.keys(selectedTheme).forEach(property => {
            document.documentElement.style.setProperty(
                property,
                selectedTheme[property]
            );
        });
    }

}
