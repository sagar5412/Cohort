import { Flex } from "./flex"
import { Grid } from "./grid"
import { RevenueCard } from "./components/revenueCard"
function App() {

  return (
    <div>
      {/* <Flex></Flex> */}
      {/* <Grid></Grid> */}

      <RevenueCard title={"Amount pending ?"} amount={92312.20} orderCount={13}></RevenueCard>

      {/* story book */}
    </div>
  )
}

export default App
