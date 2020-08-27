declare const allure: any;

export class AllureHelpers {

    async attachLog(desc: string, resp: Object) {
        return allure.createAttachment(desc, () => JSON.stringify(resp), "text/plain")();
    }


    async step(step: number | string, description: string, testFunctions: Function = () => { }) {
        let self = this;
        step = typeof step === 'string' ? step : 'Step:' + step;
        allure._allure.startStep('[' + step + ']' + description);
        try {
            await testFunctions();
        }
        catch (e) {
            allure._allure.endStep('failed');
            throw e
        }
        allure._allure.endStep('passed');
    }
}