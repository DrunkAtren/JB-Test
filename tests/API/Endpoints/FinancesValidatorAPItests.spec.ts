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
    test.describe('POST', () => {
        //Project id statyczne 15
        test("RecalculateStatusForProject with ID = " + data.FinancesValidatorID, async({request}) => {  
            const query = new DepartmentFinancesAPI(request);
            const status = await query.PostRequest(tokenValueADMIN,"services/app/FinancesValidator/RecalculateStatusForProject?projectId="+data.FinancesValidatorID,"");
            const body = status[1] 
            expect(status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            console.log(body);
        });
    });   
});