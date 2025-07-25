import AdminLayout from "./components/layouts/AdminLayout.jsx";
import UserLayout from "./components/layouts/UserLayout.jsx";
import ErrorPage from "./components/shared/ErrorPage.jsx";

import { BrowserRouter, Route, Switch } from "inferno-router";
import {
  Auth,
  SignInComponent,
  SignUpComponent,
} from "./components/authentication/Authentication.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path={["/", "/sign-in"]} exact>
            <Auth>
              <SignInComponent />
            </Auth>
          </Route>
          <Route path="/sign-up">
            <Auth>
              <SignUpComponent />
            </Auth>
          </Route>

          <Route path="/admin/:component" component={AdminLayout} />
          <Route path="/user/:component" component={UserLayout} />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
