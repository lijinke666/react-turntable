/**
 * @author Jinke.Li
 * @version 1.2.7
 * @description https://juejin.im/post/5992b6065188257dd3664dbc
 */

import React, { PureComponent } from 'react'
import cls from 'classnames'
import PropTypes from 'prop-types'

export function easeOut(t, b, c, d) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t + b
  return (-c / 2) * (--t * (t - 2) - 1) + b
}

const prefix = 'react-turntable'

export default class ReactTurntable extends PureComponent {
  state = {
    isRotate: false,
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
    speed: 1000, //旋转速度
    duration: 5000, //旋转时间
    prizes: [],
    clickText: 'Click',
    primaryColor: '#83AF9B',
    secondaryColor: '#C8C8A9',
    fontStyle: {
      color: '#fff',
      size: '14px',
      fontWeight: 'bold',
      fontVertical: false,
      fontFamily: 'Microsoft YaHei'
    },
    onStart: () => true,
    hiddenButton: false
  }
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    prizes: PropTypes.array.isRequired,
    clickText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    primaryColor: PropTypes.string,
    secondaryColor: PropTypes.string,
    speed: PropTypes.number,
    duration: PropTypes.number,
    onComplete: PropTypes.func,
    onStart: PropTypes.func,
    fontVertical: PropTypes.bool,
    fontStyle: PropTypes.object,
    hiddenButton: PropTypes.bool
  }
  render() {
    const {
      clickText,
      style,
      className,
      width,
      height,
      hiddenButton
    } = this.props
    const styles = { ...style, width, height }
    return (
      <div
        className={cls(prefix, `${prefix}-section`, className)}
        style={styles}
      >
        <canvas
          id="react-turntable-section-canvas"
          ref={node => (this.canvas = node)}
        />
        {!hiddenButton &&
          (Object.is(typeof clickText, 'string') ? (
            <div
              className="react-turntable-section-btn"
              onClick={this.onStartRotate}
            >
              {clickText}
            </div>
          ) : (
            <div onClick={this.onStartRotate}>{clickText}</div>
          ))}
      </div>
    )
  }
  noticePrize = () => {
    const prize = this.getSelectedPrize()
    this.props.onComplete && this.props.onComplete(prize)
  }
  rotateTurntable = () => {
    this.rotateTime += 20
    if (this.rotateTime >= this.rotateAllTime) {
      this.setState({ isRotate: false })
      this.noticePrize()
      return
    }
    let _rotateChange =
      (this.rotateChange -
        easeOut(this.rotateTime, 0, this.rotateChange, this.rotateAllTime)) *
      (Math.PI / 180)
    this.startRotate += _rotateChange
    this.drawTurntable()

    this.animateId = requestAnimationFrame(this.rotateTurntable)
  }
  getSelectedPrize = () => {
    let startAngle = (this.startRotate * 180) / Math.PI,
      awardAngle = (this.awardRotate * 180) / Math.PI,
      pointerAngle = 90,
      overAngle = (startAngle + pointerAngle) % 360,
      restAngle = 360 - overAngle,
      index = Math.floor(restAngle / awardAngle)

    return this.prizes[index]
  }
  drawTurntable() {
    const ctx = this.ctx
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    const {
      primaryColor,
      secondaryColor,
      fontStyle: { fontVertical, fontWeight, fontFamily, size, color }
    } = this.props

    for (let [i, prize] of this.prizes.entries()) {
      const _currentStartRotate = this.startRotate + this.awardRotate * i
      const _currentEndRotate = _currentStartRotate + this.awardRotate
      this.ctx.save()
      i % 2 === 0
        ? (ctx.fillStyle = primaryColor)
        : (ctx.fillStyle = secondaryColor)
      ctx.beginPath()
      ctx.arc(
        this.centerX,
        this.centerY,
        this.R,
        _currentStartRotate,
        _currentEndRotate,
        false
      )
      ctx.arc(
        this.centerX,
        this.centerY,
        this.INSERT_R,
        _currentEndRotate,
        _currentStartRotate,
        true
      )
      ctx.fill()
      ctx.closePath()
      ctx.restore()

      ctx.save()
      ctx.beginPath()
      ctx.font = `${fontWeight} ${
        /.*px$/.test(size) ? size : size + 'px'
      } ${fontFamily}`
      ctx.fillStyle = color
      ctx.textBaseline = 'middle'
      const currentX =
        Math.cos(_currentStartRotate + this.awardRotate / 2) * this.TEXT_R
      const currentY =
        Math.sin(_currentStartRotate + this.awardRotate / 2) * this.TEXT_R

      ctx.translate(this.centerX + currentX, this.centerY + currentY)
      ctx.rotate(_currentStartRotate + this.awardRotate / 2 + Math.PI / 2)

      const { width: fontWidth } = ctx.measureText(prize)

      if (fontVertical === true) {
        ctx.translate(0, Math.min(fontWidth, 25))
        ctx.rotate((90 / 180) * Math.PI)
      }

      ctx.fillText(prize, -fontWidth / 2, 0)

      ctx.closePath()
      ctx.restore()
    }
  }
  destroyContext() {
    window.cancelAnimationFrame(this.animateId)
    delete this.canvas
    delete this.ctx
  }
  compatibilityFrame() {
    window.requestAnimFrame = (() => {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        (callback => window.setTimeout(callback, 1000 / 60))
      )
    })()
    window.cancelAnimationFrame =
      window.cancelAnimationFrame || window.mozCancelAnimationFrame
  }
  componentWillMount() {
    if (this.props.prizes.length < 2)
      throw new Error(
        'options prizes It needs to be an array , Not less than two'
      )
  }
  componentWillUnmount() {
    this.destroyContext()
  }
  onStartRotate = () => {
    const { speed, duration, onStart } = this.props
    if (this.state.isRotate) return
    if (onStart && !onStart()) return
    this.setState({ isRotate: true }, () => {
      this.rotateTime = 0
      this.rotateAllTime = Math.random() * 5 + duration
      this.rotateChange = Math.random() * 10 + speed / 100
      this.rotateTurntable()
    })
  }
  stopRotate = () => {
    this.setState({ isRotate: false })
    window.cancelAnimationFrame(this.animateId)
    this.noticePrize()
  }
  initTurntable = () => {
    const { width, height, prizes } = this.props
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
  }
  getTurntable = () => {
    if (this.props.getTurntable) {
      this.props.getTurntable({
        start: this.onStartRotate,
        stop: this.stopRotate
      })
    }
  }
  componentDidMount() {
    this.compatibilityFrame()
    this.initTurntable()
    this.getTurntable()
  }
}
