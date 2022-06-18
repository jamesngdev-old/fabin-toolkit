import React from "react"
import { getFacebookCookies } from "@helpers/cookie"

export default function InteractionScan() {

  const cookie = getFacebookCookies();
  return <h1>Interaction scan </h1>
}
