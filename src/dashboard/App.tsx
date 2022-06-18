import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "./redux/store"
import { DefaultLayout } from "./layout"

export default function App() {
  const count = useSelector((state: RootState) => state.app)
  console.log({ count })

  const dispatch = useDispatch()

  return (
    <DefaultLayout />
  )
}

