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
        for (const years of data.DashboardServiceYEAR) {
            test('GetInYear = ' + years,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/DashboardService/GetInYear?year="+ years);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })}
        }); 
    });

    test.describe('Validation', () => {
        test.describe('GET', () => {
            test('GetInYear = Empty',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/DashboardService/GetInYear?year=");
                    expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
            })

            for (const years of data.ValidationNUMBERDATA) {
                test('GetInYear = ' + years,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/DashboardService/GetInYear?year="+ years);
                        expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
            })}
        }); 
    })    
});

test.describe('Unauthorized', () => {
    test.describe('GET', () => {
    for (const years of data.DashboardServiceYEAR) {
        test('GetInYear = ' + years,async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/DashboardService/GetInYear?year="+ years);
                expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
        })}
    }); 
});