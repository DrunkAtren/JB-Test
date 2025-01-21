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

    test.describe('GET', () => {
        test('GetRoles',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetRoles");
                expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        })

        test('Get by ID = Empty',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/Get");
                expect(get_status[0]).toBe(data.GET_STATUS_NEGATIVE_EXPECTED);
        })

        for (const id of data.UserID) {
            test('Get by ID = ' + id,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/Get?Id="+ id);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }

        // for (const years of data.) {
        //     test('Get by ID = ' + years,async({request}) =>{
        //         const query = new DepartmentFinancesAPI(request);
        //             const get_status = await query.GetRequest(tokenValueADMIN,"User/GetRolesyear="+ id);
        //             expect(get_status[0]).toBe(data.GET_STATUS_EXPECTED);
        //     })
        // }

        // do zrobienia = keywordy w linku
    });     
});