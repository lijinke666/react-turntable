import React from 'react'
import ReactDOM from 'react-dom'
import Message from 'rc-message'

import ReactTurntable from '../src'
import '../src/index.less'

const styles = {
  container: {
    padding: 30
  }
}
const prizes = Array(8)
  .fill('Prize')
  .map((prize, i) => `${prize}${i + 1}`)

const options = {
  prizes,
  width: 500,
  height: 500,
  primaryColor: '#83AF9B',
  secondaryColor: '#C8C8A9',
  fontStyle: {
    color: '#fff',
    size: '14px',
    fontVertical: false,
    fontWeight: 'bold',
    fontFamily: 'Microsoft YaHei'
  },
  speed: 1000,
  duration: 6000,
  clickText: 'Start',
  onStart() {
    console.log('start...')
    return true
  },
  onComplete(prize) {
    console.log(prize)
    Message.success({
      content: prize
    })
  }
}

class Demo extends React.Component {
  turntable = null
  render() {
    return (
      <div style={styles.container}>
        <section>
          <h2>Default</h2>
          <ReactTurntable {...options} />
        </section>

        <section>
          <h2>Custom Size</h2>
          <ReactTurntable {...options} width={300} height={300} />
        </section>

        <section>
          <h2>custom start action</h2>
          <ReactTurntable
            {...options}
            hiddenButton
            getTurntable={turntable => (this.turntable = turntable)}
          />

          <button onClick={() => this.turntable.start()}>start</button>
          <button onClick={() => this.turntable.stop()}>stop</button>
        </section>
      </div>
    )
  }
}
ReactDOM.render(<Demo />, document.getElementById('root'))
