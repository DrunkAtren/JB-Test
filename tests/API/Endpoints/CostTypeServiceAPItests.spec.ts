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
        test('GetAll',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/CostTypeService/GetAll");
                expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
            
        test('GetAllParentsAndChildren',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/CostTypeService/GetAllParentsAndChildren");
                expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        })
        
        test('GetAllyear = Empty',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/CostTypeService/GetAllyear");
                expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        })

        for (const years of data.CostTypeServiceYEAR) {
            test('GetAllyear = ' + years,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/CostTypeService/GetAllyear?year="+years);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }

        test('Get by ID = Empty',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/CostTypeService/Get");
                expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        })
        for (const id of data.CostTypeServiceID) {
            test('Get by ID = '+id,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/CostTypeService/Get?id="+id);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }
        test('GetPostCostType by ID = Empty',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/CostTypeService/GetPostCostType");
                expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        })

        for (const id of data.CostTypeServiceCOSTTYPEID) {
            test('GetPostCostType by ID = ' + id,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/CostTypeService/GetPostCostType?id=" + id);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }

        test('GetCostTypesWithParent',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/CostTypeService/GetCostTypesWithParent");
                expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        })

        test('GetCostTypesWithParentYear = Empty',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/CostTypeService/GetCostTypesWithParentYear");
                expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        })

        for (const years of data.CostTypesWithParentYEAR) {
            test('GetCostTypesWithParentYear = ' + years,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/CostTypeService/GetCostTypesWithParentYear?year=" + years);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }
        });               
    });
