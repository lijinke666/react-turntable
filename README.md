## 待完善
# react-turntable
A React HTML5 Turntable component 

## Installation
```
npm install react-turntable --save
```

## Example
### [Live Demo](https://lijinke666.github.io/react-turntable/)

```
git clone https://github.com/lijinke666/react-turnatable
```
 - `yarn` of `npm install`
 - `npm run demo`   run example


## Usage
```javascript

```

## API 
- `Message.success(options)`
- `Message.error(options)`
- `Message.info(options)`
- `Message.warning(options)`
- `Message.loading(options)`
- `Message.confirm(options)`
- `Message.prompt(options)`

## Options 
- options.content
  - `Desc` : `content of the message`
  - `Type` : `string | ReactNode`
  - `Default` : `Balabala`

- options.duration 
  - `Desc` : `time before auto-dismiss,in seconds`
  - `Type` : `number`
  - `Default` : `2`

- options.theme 
  - `Desc` : `theme of the message`
  - `Type` : `string`
  - `Default` : `light`

- options.onClose 
  - `Desc` : `Specify a function that will be called after the message closed`
  - `Type` : `Function`
  - `Default` : `-`

