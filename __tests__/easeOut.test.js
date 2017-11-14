import {easeOut} from "../src"
describe('test easeOUt',()=>{
    it('result not $lte 0',()=>{
        expect(
            easeOut(1,2,3,4)
        ).toBeGreaterThanOrEqual(0)
    })
})