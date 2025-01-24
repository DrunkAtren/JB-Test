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
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/Get?Id=");
                expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
        })

        for (const id of data.UserID) {
            test('Get by ID = ' + id,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/Get?Id="+ id);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }

        test('GetAll',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll");
                expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        })

        test('GetAll Keyword = Empty',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?Keyword=");
                expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
        })

        test('GetAll IsActive = Empty',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?IsActive=");
                expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
        })

        test('GetAll SkipCount = Empty',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?SkipCount=");
                expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
        })

        test('GetAll MaxResultCount = Empty',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?MaxResultCount=");
                expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
        })

        for (const string of data.UserKEYWORD) {
            test('GetAll Keyword = ' + string,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?Keyword="+ string);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }

        for (const toggle of data.UserSWITCH) {
            test('GetAll IsActive = ' + toggle,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?IsActive="+ toggle);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }

        for (const number of data.RoleSKIPCOUNT) {
            test('GetAll SkipCount = ' + number,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?SkipCount="+ number);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }

        for (const number of data.UserNUMBER) {
            test('GetAll MaxResultCount = ' + number,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?MaxResultCount="+ number);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }

        for (const string of data.UserKEYWORD) {
            for (const toggle of data.UserSWITCH) 
            test('GetAll by Keyword = ' + string + " and IsActive = " + toggle,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?Keyword=" + string + "&IsActive="+ toggle);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }

        for (const number of data.UserNUMBER) {
            for (const toggle of data.UserSWITCH) 
            test('GetAll by IsActive = ' + toggle + " and SkipCount = " + number,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?IsActive=" + toggle + "&SkipCount="+ number);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }

        for (const number of data.UserNUMBER)
            for (const number2 of data.RoleSKIPCOUNT) {
            test('GetAll by SkipCount = ' + number2 + " and MaxResultCount = " + number,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?SkipCount=" + number2 + "&MaxResultCount="+ number);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }

        for (const string of data.UserKEYWORD) {
            for (const toggle of data.UserSWITCH) {
                for (const number2 of data.RoleSKIPCOUNT){
            test('GetAll by Keyword = ' + string + " and IsActive = " + toggle + " and SkipCount = " + number2,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?Keyword=" + string + "&IsActive="+ toggle + "&SkipCount=" + number2);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }}}

        for (const toggle of data.UserSWITCH) {
            for (const number2 of data.RoleSKIPCOUNT) {
                for (const number of data.UserNUMBER){
            test('GetAll by IsActive = ' + toggle + " and SkipCount = " + number2 + " and MaxResultCount = " + number,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?IsActive=" + toggle + "&SkipCount="+ number2 + "&MaxResultCount=" + number);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }}}
    });     
});