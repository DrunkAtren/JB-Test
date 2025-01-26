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
        test('Get',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/ActivityTypeService/Get");
                expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        })

        test('Get by ID = Empty',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/ActivityTypeService/Get?id=");
                expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
        })

        for (const id of data.ActivityTypeServiceID) {
            test('Get by ID = ' + id,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/ActivityTypeService/Get?id="+ id);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }

        test('GetAll',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/ActivityTypeService/GetAll");
                expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        })
    });

    test.describe('POST', () => {
        test('Create with template '+ data.ActivityTypeServicePOSTDATA.name, async({request}) => {  
            const query = new DepartmentFinancesAPI(request);
            const status = await query.PostRequest(tokenValueADMIN,"services/app/ActivityTypeService/Create", data.ActivityTypeServicePOSTDATA);
            const body = status[1] 
            const id = body.result
            expect(status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            console.log(body);
            const status2 = await query.DeleteRequest(tokenValueADMIN,  "services/app/ActivityTypeService/Delete?id="+ id);
            expect(status2[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        });
    });

    test.describe('DELETE', () => {
        test('Delete with template '+ data.ActivityTypeServiceDELETEPOSTDATA.name, async({request}) => {  
            const query = new DepartmentFinancesAPI(request);
            const status = await query.PostRequest(tokenValueADMIN,"services/app/ActivityTypeService/Create", data.ActivityTypeServiceDELETEPOSTDATA);
            const body = status[1] 
            const id = body.result
            expect(status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            console.log(body);
            const status2 = await query.DeleteRequest(tokenValueADMIN,  "services/app/ActivityTypeService/Delete?id="+ id);
            expect(status2[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        });
    });          
});