import React from "react"
import ReactDOM from "react-dom"
import Message from "rc-message"

import ReactTurntable from "../src"

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

const options = {
    prizes,
    width: 500,
    height: 500,
    primaryColor: "#83AF9B",
    secondaryColor: "#C8C8A9",
    fontStyle:{
        color:"#fff",
        size:"14px",
        fontVertical:true,
        fontWeight:"bold",
        fontFamily:"Microsoft YaHei"
    },
    speed : 1000,                  
    duration:5000,               
    clickText:"Start",
    onComplete(prize){
        Message.success({
            content:prize
        })
    }
}
const Demo = () => (
    <div style={styles}>
        <ReactTurntable {...options}/>
    </div>
)
ReactDOM.render(
    <Demo />,
    document.getElementById('root')
)