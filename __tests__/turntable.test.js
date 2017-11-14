import React from "react"
import ReactTurnTable from "../src"
import renderer from "react-test-renderer"

const styles = {
    justifyContent:"center",
    alignContent:"center",
    display:"flex"
}
const prizes = [
    'Durex', 'MI', 'Meizu', 
    'iphone 6s', 'iphone 6s plus', 'Chafingdish',
    'WeiLong','masturbation cup'
]

const _testProps_ = {
    prizes,
    width: 500,
    height: 500,
    primaryColor: "#83AF9B",
    secondaryColor: "#C8C8A9",
    fontStyle:{
        color:"#fff",
        size:"14px",
        fontVertical:false,
        fontWeight:"bold",
        fontFamily:"Microsoft YaHei"
    },
    speed : 1000,                  
    duration:6000,               
    clickText:"Start",
    onComplete(prize){
        console.log(prize);
    }
}

describe('test ReactTurnTable',()=>{
    it('test',()=>{
        const component = renderer.create(
            <ReactTurnTable {..._testProps_}/>
        )
        const {type} = component.toJSON()
        expect(type).toEqual('canvas')
    })
})