import {Routes ,BrowserRouter , Route } from "react-router-dom"
import { SignUp} from "./Pages/SignUp"
import { Signin } from "./Pages/Signin"
import { Dashboard } from "./Pages/Dashboard"
import {SendMoney} from "./Pages/SendMoney"
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path={'/signup'} element={<SignUp></SignUp>}></Route>
      <Route path={'/signin'} element={<Signin></Signin>}></Route>
      <Route path={'/dashboard'} element={<Dashboard></Dashboard>}></Route>
      <Route path={'/send'} element={<SendMoney></SendMoney>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
