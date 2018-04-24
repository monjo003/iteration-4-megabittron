import {browser, element, by, promise, ElementFinder} from 'protractor';
import {Key} from 'selenium-webdriver';

export class GoalPage {

    navigateTo(): promise.Promise<any> {
        return browser.get('/goals');
    }

    highlightElement(byObject) {
        function setStyle(element, style) {
            const previous = element.getAttribute('style');
            element.setAttribute('style', style);
            setTimeout(() => {
                element.setAttribute('style', previous);
            }, 100);
            return 'highlighted';
        }

        return browser.executeScript(setStyle, element(byObject).getWebElement(), 'color: red; background-color: yellow;');
    }

    getGoalManageTitle() {
        const title = element(by.className('goal-title')).getText();
        this.highlightElement(by.className('goal-title'));

        return title;
    }

    selectEnter() {
        browser.actions().sendKeys(Key.ENTER).perform();
    }

    getUniqueGoal(anID: string) {
        const goal = element(by.id(anID)).getText();
        this.highlightElement(by.id(anID));

        return goal;
    }

    getGoals() {
        return element.all(by.className('goals-card')).count();
    }

    buttonExists(): promise.Promise<boolean> {
        this.highlightElement(by.className('add-new-goal'));
        return element(by.className('add-new-goal')).isPresent();
    }

    clickAddGoalButton(): promise.Promise<void> {
        this.highlightElement(by.className('goal-button'));
        return element(by.className('goal-button')).click();
    }

    pickChoresOption(){
        const input = element(by.className('category-list'));
        input.click();
        this.selectEnter();
    }

    actuallyAddGoal() {
        const input = element(by.className('confirm-add-goal-button'));
        input.click();
    }

}
