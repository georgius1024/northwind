import React, { memo } from 'react'
import Split from 'react-split'
import './Splitter.scss'

function Splitter(props) {
  const id = props.id || 'splitter'
  const storageKey = id + '-store'
  let sizes = props.sizes || [50, 50]
  try {
    let position = JSON.parse(localStorage.getItem(storageKey))
    if (position) {
      sizes = [position, 100 - position]
    }
  } catch (error) {
    console.error(error)
  }

  function onDragEnd(size) {
    let position = size[0]
    localStorage.setItem(storageKey, JSON.stringify(position))
    if (typeof props.onResize === 'function') {
      props.onResize(position)
    }
    if (props.onDragEnd) {
      props.onDragEnd(size)
    }
  }
  
  const newProps = { ...props, sizes, onDragEnd }
  return (
    <Split {...newProps}>
      {props.children}
    </Split>
  )
}

export default memo(Splitter)