import * as React from "react";
import { LiveSearch } from "./search/LiveSearch";
import { Portfolio } from "./portfolio/Portfolio";

export function Home() {

  return(
    <>
      <LiveSearch/>
      <Portfolio/>
    </>
  )
}
