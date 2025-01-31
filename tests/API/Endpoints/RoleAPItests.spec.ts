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
            test('GetRoles',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetRoles");
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
            
            for (const permission of data.RolePERMISSION) {
                test('GetRoles by Permission = ' + permission,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/GetRoles?Permission="+ permission);
                        expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                })
            }

            test('GetAllPermissions',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/GetAllPermissions");
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })

            test('GetRoleForEdit',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/GetRoleForEdit");
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })

            for (const id of data.RoleID) {
                test('GetRoleForEdit by Id = ' + id,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/GetRoleForEdit?Id="+ id);
                        expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                })
            }

            test('Get',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/Get");
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })

            for (const id of data.RoleID) {
                test('Get by Id = ' + id,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/Get?Id="+ id);
                        expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                })
            }

            test('GetAll',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/GetAll");
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })

            for (const string of data.RoleKEYWORD) {
                test('GetAll by Keyword = ' + string,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/GetAll?Keyword="+ string);
                        expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                })
            }

            for (const number of data.RoleSKIPCOUNT) {
                test('GetAll by SkipCount = ' + number,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/GetAll?SkipCount="+ number);
                        expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                })
            }

            for (const maxcount of data.RoleMAXRESULTCOUNT) {
                test('GetAll by MaxResultCount = ' + maxcount,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/GetAll?MaxResultCount="+ maxcount);
                        expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                })
            }

            for (const string of data.RoleKEYWORD) {
                for (const number of data.RoleSKIPCOUNT) 
                test('GetAll by Keyword = ' + string + " and SkipCount = " + number,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/GetAll?Keyword=" + string + "&SkipCount="+ number);
                        expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                })
            }

            for (const string of data.RoleKEYWORD) {
                for (const number of data.RoleSKIPCOUNT) {
                    for (const maxcount of data.RoleMAXRESULTCOUNT){
                test('GetAll by Keyword = ' + string + " and SkipCount = " + number + " and MaxResultCount = " + maxcount,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/GetAll?Keyword=" + string + "&SkipCount="+ number + "&MaxResultCount=" + maxcount);
                        expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                })};
            }}
        });

        test.describe('POST', () => {
            test("Create with Template '"+data.RolePOSTDATA.description+"'", async({request}) => {  
                const query = new DepartmentFinancesAPI(request);
                const status = await query.PostRequest(tokenValueADMIN,"services/app/Role/Create",data.RolePOSTDATA);
                const body = status[1] 
                const id = body.result.id
                expect(status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                console.log(body);
                const status2 = await query.DeleteRequest(tokenValueADMIN,"services/app/Role/Delete?Id="+ id);
                expect(status2[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            });
        });  
        
        test.describe('DELETE', () => {
            test("Delete with Template '"+data.RolePOSTDATA.description+"'", async({request}) => {  
                const query = new DepartmentFinancesAPI(request);
                const status = await query.PostRequest(tokenValueADMIN,"services/app/Role/Create",data.RolePOSTDATA);
                const body = status[1] 
                const id = body.result.id
                expect(status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                console.log(body);
                const status2 = await query.DeleteRequest(tokenValueADMIN,"services/app/Role/Delete?Id="+ id);
                expect(status2[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            });
        });

        test.describe('PUT', () => {
            test('Put with template 1', async({request}) =>{
                const query = new DepartmentFinancesAPI(request);   
                    const post_status = await query.PostRequest(tokenValueADMIN,"services/app/Role/Create",data.RolePOSTDATA);
                    const body = post_status[1]
                    expect(post_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                    console.log(body);
                    const id = body.result.id
                    const put_status = await query.PutRequest(tokenValueADMIN, "services/app/Role/Update", 
                    {
                    "name": "PutTest",
                    "displayName": "PutTest",
                    "normalizedName": "PutTest",
                    "description": "PutTest",
                    "grantedPermissions": [
                        "PutTest"
                    ],
                    "id": id
                    },);
                    const body2 = put_status[1]
                    expect(put_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                    console.log(body2);
                    const status2 = await query.DeleteRequest(tokenValueADMIN,"services/app/Role/Delete?Id="+ id);
            }); 
        }); 
    })
    test.describe('Validation', () => {
        test.describe('GET', () => {
            test('GetRoles by Permission = Empty',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/GetRoles?Permission=");
                    expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
            })

            test('GetRoleForEdit by Id = Empty',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/GetRoleForEdit?Id=");
                    expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
            })
    
            test('Get by Id = Empty',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/Get?Id=");
                    expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
            })

            test('GetAll by Keyword = Empty',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/GetAll?Keyword=");
                    expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
            })

            test('GetAll by SkipCount = Empty',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/GetAll?SkipCount=");
                    expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
            })

            test('GetAll by MaxResultCount = Empty',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/GetAll?MaxResultCount=");
                    expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
            })

            test('GetAll by Keyword = Empty and SkipCount = Empty',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/GetAll?Keyword=&SkipCount=");
                    expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
            })

            test('GetAll by Keyword = Empty and SkipCount = Empty and MaxResultCount = Empty',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/GetAll?Keyword=&SkipCount=&MaxResultCount=");
                    expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
            })

            for (const permission of data.ValidationSTRINGDATA) {
                test('GetRoles by Permission = ' + permission,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/GetRoles?Permission="+ permission);
                        expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
                })
            }

            for (const id of data.ValidationIDDATA) {
                test('GetRoleForEdit by Id = ' + id,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/GetRoleForEdit?Id="+ id);
                        expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
                })
            }

            for (const id of data.ValidationIDDATA) {
                test('Get by Id = ' + id,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/Get?Id="+ id);
                        expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
                })
            }

            for (const string of data.ValidationSTRINGDATA) {
                test('GetAll by Keyword = ' + string,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/GetAll?Keyword="+ string);
                        expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
                })
            }

            for (const number of data.ValidationNUMBERDATA) {
                test('GetAll by SkipCount = ' + number,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/GetAll?SkipCount="+ number);
                        expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
                })
            }

            for (const maxcount of data.ValidationNUMBERDATA) {
                test('GetAll by MaxResultCount = ' + maxcount,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/GetAll?MaxResultCount="+ maxcount);
                        expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
                })
            }

            for (const string of data.ValidationSTRINGDATA) {
                for (const number of data.ValidationNUMBERDATA) 
                test('GetAll by Keyword = ' + string + " and SkipCount = " + number,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/GetAll?Keyword=" + string + "&SkipCount="+ number);
                        expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
                })
            }

            for (const string of data.ValidationSTRINGDATA) {
                for (const number of data.ValidationNUMBERDATA) {
                    for (const maxcount of data.ValidationNUMBERDATA){
                test('GetAll by Keyword = ' + string + " and SkipCount = " + number + " and MaxResultCount = " + maxcount,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/GetAll?Keyword=" + string + "&SkipCount="+ number + "&MaxResultCount=" + maxcount);
                        expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
                })};
            }}
        })
    })             
});

test.describe('Unauthorized', () => {
    test.describe('GET', () => {
        test('GetRoles',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetRoles");
                expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
        })
        
        for (const permission of data.RolePERMISSION) {
            test('GetRoles by Permission = ' + permission,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/GetRoles?Permission="+ permission);
                    expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
            })
        }

        test('GetAllPermissions',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/GetAllPermissions");
                expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
        })

        test('GetRoleForEdit',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/GetRoleForEdit");
                expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
        })

        for (const id of data.RoleID) {
            test('GetRoleForEdit by Id = ' + id,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/GetRoleForEdit?Id="+ id);
                    expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
            })
        }

        test('Get',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/Get");
                expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
        })

        for (const id of data.RoleID) {
            test('Get by Id = ' + id,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/Get?Id="+ id);
                    expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
            })
        }

        test('GetAll',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/GetAll");
                expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
        })

        for (const string of data.RoleKEYWORD) {
            test('GetAll by Keyword = ' + string,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/GetAll?Keyword="+ string);
                    expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
            })
        }

        for (const number of data.RoleSKIPCOUNT) {
            test('GetAll by SkipCount = ' + number,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/GetAll?SkipCount="+ number);
                    expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
            })
        }

        for (const maxcount of data.RoleMAXRESULTCOUNT) {
            test('GetAll by MaxResultCount = ' + maxcount,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/GetAll?MaxResultCount="+ maxcount);
                    expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
            })
        }

        for (const string of data.RoleKEYWORD) {
            for (const number of data.RoleSKIPCOUNT) 
            test('GetAll by Keyword = ' + string + " and SkipCount = " + number,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/GetAll?Keyword=" + string + "&SkipCount="+ number);
                    expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
            })
        }

        for (const string of data.RoleKEYWORD) {
            for (const number of data.RoleSKIPCOUNT) {
                for (const maxcount of data.RoleMAXRESULTCOUNT){
            test('GetAll by Keyword = ' + string + " and SkipCount = " + number + " and MaxResultCount = " + maxcount,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/Role/GetAll?Keyword=" + string + "&SkipCount="+ number + "&MaxResultCount=" + maxcount);
                    expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
            })};
        }}
    });

    test.describe('POST', () => {
        test("Create with Template '"+data.RolePOSTDATA.description+"'", async({request}) => {  
            const query = new DepartmentFinancesAPI(request);
            const status = await query.PostRequest(tokenValueADMIN,"services/app/Role/Create",data.RolePOSTDATA);
            const body = status[1] 
            expect(status[0]).toBe(data.STATUS_NONAUTHORIZED);
            // const id = body.result.id
            console.log(body);
            const status2 = await query.DeleteRequest(tokenValueADMIN,"services/app/Role/Delete?Id=");
            expect(status2[0]).toBe(data.STATUS_NONAUTHORIZED);
        });
    });  
    
    test.describe('DELETE', () => {
        test("Delete with Template '"+data.RolePOSTDATA.description+"'", async({request}) => {  
            const query = new DepartmentFinancesAPI(request);
            const status = await query.PostRequest(tokenValueADMIN,"services/app/Role/Create",data.RolePOSTDATA);
            const body = status[1] 
            // const id = body.result.id
            expect(status[0]).toBe(data.STATUS_NONAUTHORIZED);
            console.log(body);
            const status2 = await query.DeleteRequest(tokenValueADMIN,"services/app/Role/Delete?Id=");
            expect(status2[0]).toBe(data.STATUS_NONAUTHORIZED);
        });
    });

    test.describe('PUT', () => {
        test('Put with template 1', async({request}) =>{
            const query = new DepartmentFinancesAPI(request);   
                const post_status = await query.PostRequest(tokenValueADMIN,"services/app/Role/Create",data.RolePOSTDATA);
                const body = post_status[1]
                expect(post_status[0]).toBe(data.STATUS_NONAUTHORIZED);
                console.log(body);
                // const id = body.result.id
                const put_status = await query.PutRequest(tokenValueADMIN, "services/app/Role/Update", 
                {
                "name": "PutTest",
                "displayName": "PutTest",
                "normalizedName": "PutTest",
                "description": "PutTest",
                "grantedPermissions": [
                    "PutTest"
                ],
                "id": "28"
                },);
                const body2 = put_status[1]
                expect(put_status[0]).toBe(data.STATUS_NONAUTHORIZED);
                console.log(body2);
                const status2 = await query.DeleteRequest(tokenValueADMIN,"services/app/Role/Delete?Id=");
        }); 
    }); 
})