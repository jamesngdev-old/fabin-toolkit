import React from "react"
import ReactDOM from "react-dom"

import "./index.less"
import { DefaultLayout } from "./layout"

function App() {
  return (
    <DefaultLayout />
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
