import React, { PropTypes, PureComponent } from "react"
import ReactDOM from "react-dom"
import classnames from "classnames"

//https://juejin.im/post/5992b6065188257dd3664dbc

import "./styles.less"

export default class ReactTurntable extends PureComponent {
    state = {
        startRotate: 0
    }
    constructor(props) {
        super(props)
        this.canvas = null
        this.ctx = null
        this.animateId = null
    }
    static defaultProps = {
        width: 500,
        height: 500,
        speed: 10,                  //旋转速度
        duration: 5000,               //旋转时间
        prizes: [],
        clickText:"Click",
        primaryColor:"#396",
        secondaryColor:"#fafafa"
    }
    static propTypes = {
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        prizes: PropTypes.array.isRequired,
        clickText:PropTypes.string.isRequired,
        speed: PropTypes.number,
        duration: PropTypes.number,
        onComplete: PropTypes.func
    }
    render() {
        const {clickText,width,height} = this.props
        const styles = {width,height}
        return (
            <div className="react-turntable-section" key="react-turntable-section" style={styles}>
                <canvas id="react-turntable-section-canvas" ref={(node) => this.canvas = node} />
                <div className="react-turntable-section-btn">{clickText}</div>
            </div>
        )
    }
    easeOut = (t, b, c, d) => {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    };
    rotateTurntable = () => {
        this.rotateTime += 20
        if (this.rotateTime >= this.rotateAllTime) {
            const prize = this.getSelectedPrize()
            this.props.onComplete && this.props.onComplete(prize)
            return 
        }
        let _rotateChange = (
            this.rotateChange - this.easeOut(this.rotateTime, 0, this.rotateChange, this.rotateAllTime)
        ) * (Math.PI / 180)
        this.startRotate += _rotateChange
        this.drawTurntable()

        this.animateId = requestAnimationFrame(this.rotateTurntable)
    }
    getSelectedPrize = () => {
        let startAngle = this.startRotate * 180 / Math.PI,
            awardAngle = this.awardRotate * 180 / Math.PI,

            pointerAngle = 90,
            overAngle = (startAngle + pointerAngle) % 360,
            restAngle = 360 - overAngle,

            index = Math.floor(restAngle / awardAngle)

        return this.prizes[index]
    }
    drawTurntable() {
        const ctx = this.ctx
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        for (let [i, prize] of this.prizes.entries()) {
            const _currentStartRotate = this.startRotate + this.awardRotate * i
            const _currentEndRotate = _currentStartRotate + this.awardRotate
            this.ctx.save()
            i % 2 === 0 ? ctx.fillStyle = "#396" : ctx.fillStyle = "#fafafa"
            ctx.beginPath()
            ctx.arc(this.centerX, this.centerY, this.R, _currentStartRotate, _currentEndRotate, false)
            ctx.arc(this.centerX, this.centerY, this.INSERT_R, _currentEndRotate, _currentStartRotate, true)
            ctx.fill()
            ctx.closePath()
            ctx.restore()

            ctx.save()
            ctx.beginPath()
            ctx.font = 'bold 16px Microsoft YaHei'
            ctx.fillStyle = '#FFF'
            ctx.textBaseline = "middle"
            const currentX = Math.cos(_currentStartRotate + this.awardRotate / 2) * this.TEXT_R
            const currentY = Math.sin(_currentStartRotate + this.awardRotate / 2) * this.TEXT_R

            ctx.translate(
                this.centerX + currentX,
                this.centerY + currentY
            )
            ctx.rotate(_currentStartRotate + this.awardRotate / 2 + Math.PI / 2);

            const maxFontWidth = currentY / (this.TEXT_R / 2)
            const { width: fontWidth } = ctx.measureText(prize)
            console.log(fontWidth, maxFontWidth);
            //让文字竖直排列
            // ctx.translate(-10,30)
            // ctx.rotate(90/180*Math.PI)
            //ctx.measureText 获取文字的宽度  这里获取文字宽度的一半 已达到对齐的效果
            ctx.fillText(prize, -fontWidth / 2, 0)

            ctx.closePath()
            ctx.restore()
        }
    }
    destroyContext() {
        window.cancelAnimationFrame(this.animateId)
        delete this.canvas
        delete this.ctx
        delete this.prizes
        delete this.startRotate
        delete this.rotateTime
        delete this.rotateAllTime
        delete this.rotateChange
        delete this.awardRotate
        delete this.centerX
        delete this.centerY
        delete this.R
        delete this.TEXT_R
        delete this.INSERT_R
    }
    compatibilityFrame() {
        window.requestAnimFrame = (() => {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                ((callback) => window.setTimeout(callback, 1000 / 60))
        })()
        window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame
    }
    componentwillreceiveprops(nextProps) {
        console.log(nextProps);
    }
    componentWillMount() {
        if (this.props.prizes.length < 1) throw new Error('options prizes It needs to be an array!')
    }
    componentWillUnmount() {
        this.destroyContext()
    }
    componentDidMount() {
        this.compatibilityFrame()
        const {
            width,
            height,
            speed,
            duration,
            prizes
        } = this.props
        this.prizes = prizes
        this.startRotate = 0
        this.rotateTime = 0
        this.rotateAllTime = 0
        this.rotateChange = 0

        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = width
        this.canvas.height = height


        this.awardRotate = (Math.PI * 2) / prizes.length

        this.centerX = this.canvas.width / 2
        this.centerY = this.canvas.height / 2
        this.R = this.canvas.width / 2 - 20
        this.TEXT_R = this.R - 50
        this.INSERT_R = 0
        this.drawTurntable()

        document.body.addEventListener('click', () => {
            this.rotateTime = 0
            this.rotateAllTime = Math.random() * 5 + duration
            this.rotateChange = Math.random() * 10 + speed
            this.rotateTurntable()
        })
    }
}
