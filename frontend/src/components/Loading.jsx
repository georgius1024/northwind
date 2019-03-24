/*
 Show transparent layer with wait cursor
*/
import React, {useEffect, useState} from 'react'
import Api from '../Api'
import styles from './Loading.module.scss'

function LoadingComponent(props) {
  const[loading, setLoading] = useState(false)
  useEffect(() => {
    const subscription = Api.busy$.subscribe(busy => {
      setLoading(busy)
      if (busy) {
        setTimeout(() => {setLoading(false)}, 5000)
      }
    })
    return function cleanup() {
      subscription.unsubscrube()
    }
  }, [])
  return loading && (
    <div className={styles.loading} />
  )
}
export default LoadingComponent

/*
class Loading extends React.Component {
  constructor(props) {
    super(props)
    this.subscription = false
    this.state = {
      loading: false
    }
    this.dismiss = this.dismiss.bind(this)
    this.take = this.take.bind(this)
  }
  componentDidMount() {
    this.subscription = Api.busy$.subscribe(busy => {
      if (!busy) {
        this.setState({ loading: busy })
      } else {
        this.take()
        setTimeout(this.dismiss, 3000)
      }

    })
  }
  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
  take() {
    this.setState({
      loading: true
    })
  }
  dismiss() {
    this.setState({
      loading: false
    })
  }
  render() {
    return this.state.loading && (
      <div className="loading"></div>
    )
  }
}

export default Loading
*/