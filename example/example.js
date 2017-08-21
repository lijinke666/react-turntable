import React from "react"
import ReactDOM from "react-dom"
import Message from "rc-message"

import ReactTurntable from "../src"

const prizes = ['杜蕾斯', '涛涛', '香蕉', 'iphone 6s', 'iphone 6s plus', '优惠券','避孕套','飞机杯']

const options = {
    speed : 10,                  //旋转速度
    duration:3000,               //旋转时间
    prizes,
    onComplete(prize){
        Message.success({
            content:prize
        })
    }
}
const Demo = () => (
    <ReactTurntable {...options}/>
)
ReactDOM.render(
    <Demo />,
    document.getElementById('root')
)