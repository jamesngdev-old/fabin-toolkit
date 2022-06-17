import React from "react"
import ReactDOM from "react-dom"

import "./index.less"
import { DefaultLayout } from "./layout"

function App() {
  return (
    <DefaultLayout />
  )
}

// Render component App vào #root element
ReactDOM.render(<App />, document.getElementById("root"))
