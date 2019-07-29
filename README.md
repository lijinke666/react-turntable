# react-turntable
[![npm](https://img.shields.io/npm/dm/react-turntable.svg?style=flat-square)](https://www.npmjs.com/package/react-turntable)
[![npm](https://img.shields.io/npm/l/react-turntable.svg?style=flat-square)](https://www.npmjs.com/package/react-turntable)
> A HTML5 Turntable component for React

## Screenshots
![example](https://github.com/lijinke666/react-turntable/blob/master/assetsImg/example.png)

## Installation
```
npm install react-turntable --save
```

## Example
### [Live Demo](https://lijinke666.github.io/react-turntable/)


## Development
```
git clone https://github.com/lijinke666/react-turnatable
yarn or npm install
npm start

 ```


## Usage
```jsx
import React from "react"
import ReactDOM from "react-dom"
import ReactTurntable from "react-turntable"
import "react-turntable/assets/index.css"

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
    clickText:"Click",
    onStart(){
      //If you want before the rotate do some...
      console.log('start...');
      //If you want stop rotate you can return false
      return true
    },
    onComplete(prize){
      console.log('prize:',prize)
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
```


## Options
- options.prizes
  - `Desc` : `prizes of the turntable prizes length >=2`
  - `Type` : `array`
  - `Default` : `-`

- options.width
  - `Desc` : `width of the turntable`
  - `Type` : `number`
  - `Default` : `500`

- options.height
  - `Desc` : `height of the turntable`
  - `Type` : `number`
  - `Default` : `500`

- options.primaryColor
  - `Desc` : `primary color of the turntable`
  - `Type` : `string`
  - `Default` : `#83AF9B`

- options.secondaryColor
  - `Desc` : `secondaryColor color of the turntable`
  - `Type` : `string`
  - `Default` : `#C8C8A9`

- options.speed
  - `Desc` : `rotate speed  of the turntable`
  - `Type` : `number`
  - `Default` : `1000 (ms)`

- options.duration
  - `Desc` : `rotate total time  of the turntable`
  - `Type` : `number`
  - `Default` : `5000 (ms)`

- options.clickText
  - `Desc` : ` click text  of the  turntable start game btn ( Supports custom buttons )`
  - `Type` : `string || reactNode`
  - `Default` : `Start`

- options.fontStyle
  - `Desc` : `prize text style of the turntable`
  - `Type` : `Object`
    - fontStyle.color
       - `Desc` : `text color`
       - `Type` : `string`
       - `Default` : `#fff`

    - fontStyle.size
       - `Desc` : `text font size`
       - `Type` : `number`
       - `Default` : `14`

    - fontStyle.fontVertical
       - `Desc` : `The text is arranged vertically of the turntable (If the text is very long, you can set the options 'true')`
       - `Type` : `boolean`
       - `Default` : `false`

    - fontStyle.fontWeight
       - `Desc` : `text font weight`
       - `Type` : `string`
       - `Default` : `bold`

    - fontStyle.fontFamily
       - `Desc` : `prize text font`
       - `Type` : `string`
       - `Default` : `Microsoft YaHei`

- options.onComplete
  - `Desc` : `game complete callback of the  turntable (return current seleted prize)`
  - `Type` : `Function`
  - `Default` : `-`

- options.hiddenButton
  - `Desc` : `hidden action button`
  - `Type` : `boolean`
  - `Default` : `false`

- options.getTurntable
  - `Desc` : `getTurntable={turntable => turntable.start() turntable.stop()}`
  - `Type` : `Function`
  - `Default` : `-`

