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
        test.describe('GET', () => {
            for (const id of data.PersonServiceID) {
                test('Get by ID = ' + id,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/PersonService/Get?Id="+ id);
                        expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                })
            }

            test('GetAll',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/PersonService/GetAll");
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })

            test('GetAllActive',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/PersonService/GetAllActive");
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        })

        test.describe('POST', () => {
            test("Create with name '" + data.PersonServicePOSTDATA.name +"'", async({request}) => {  
                const query = new DepartmentFinancesAPI(request);
                const status = await query.PostRequest(tokenValueADMIN,"services/app/PersonService/Create",data.PersonServicePOSTDATA);
                const body = status[1] 
                expect(status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                console.log(body);
            });

            for (const number of data.PersonServiceID) {
                for (const toggle of data.PersonServiceSWITCH) 
                test("SetIsActive by Id = " + number + " and isActive = "+ toggle, async({request}) => {  
                    const query = new DepartmentFinancesAPI(request);
                    const status = await query.PostRequest(tokenValueADMIN,"services/app/PersonService/SetIsActive?id=" + number + "&isActive="+ toggle,"");
                    const body = status[1] 
                    expect(status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                    console.log(body);
                });
            }
        })
    })

    test.describe('Validation', () => {
        test.describe('GET', () => {
            test('Get by ID = Empty',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/PersonService/Get");
                    expect(get_status[0]).toBe(data.GET_STATUS_NEGATIVE_EXPECTED);
            })
        })
    })
});