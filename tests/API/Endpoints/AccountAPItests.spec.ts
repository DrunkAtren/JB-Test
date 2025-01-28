import {test, expect} from '@playwright/test';
import { DepartmentFinancesAPI } from "../../../functions/DepartmentFinancesAPI"

import fs from 'fs'

let tokenValueADMIN
const data = JSON.parse(fs.readFileSync('data/API/APIdata.json', 'utf-8'));

test.describe('Authorized', () => {
    test.beforeEach("Token Auth", async ({ request }) => {
        const query = new DepartmentFinancesAPI(request);
        const accessToken = await query.PostAuthRequest(data.AuthAdmin)
        tokenValueADMIN = accessToken        
    });

    test.describe('Functional', () => {
        test.describe('POST', () => {
            for (const dataAccount of data.AccountPOSTDATA)
                test('IsTenantAvailable by tenancyName = '+ dataAccount, async({request}) => {  
                    console.log(dataAccount)
                    const query = new DepartmentFinancesAPI(request);
                    const status = await query.PostRequest(tokenValueADMIN, "services/app/Account/IsTenantAvailable", {"tenancyName": dataAccount});
                    const body = status[1] 
                    expect(status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                    console.log(body);
            });
        test('Register', async({request}) => {  
            const query = new DepartmentFinancesAPI(request);
            const status = await query.PostRequest(tokenValueADMIN,"services/app/Account/Register", data.AccountPOSTREGISTERDATA);
            const body = status[1] 
            expect(status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            console.log(body);
        })});
    });

    test.describe('Validation', () => {
        test.describe('POST', () => {
            test('IsTenantAvailable by tenancyName = Empty', async({request}) => {
                const query = new DepartmentFinancesAPI(request);
                const status = await query.PostRequest(tokenValueADMIN, "services/app/Account/IsTenantAvailable", {"tenancyName": ""});
                const body = status[1] 
                expect(status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
                console.log(body);
            })
        });
    });
});