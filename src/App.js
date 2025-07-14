// import "./App.css";
import { BrowserRouter, Route, Switch } from "inferno-router";
import {
  Auth,
  SignInComponent,
  SignUpComponent,
} from "./components/auth/Auth.jsx";

// import { Component, linkEvent } from "inferno";
export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          {/* <Route path={["/", "/login"]} exact>
            <AuthLayout>
            </AuthLayout>
          </Route>

          <Route path="/register" exact>
            <AuthLayout>
            </AuthLayout>
          </Route>

          <Route path="/user-form">
            <MainLayout>
            </MainLayout>
          </Route>

          <Route path="/question1">
            <MainLayout Component={Question1} />
          </Route>

          <Route path="/question2">
            <MainLayout Component={Question2} />
          </Route>

          <Route path="/user-profile">
            <MainLayout>
              <MainLayout Component={UserProfile} />
            </MainLayout>
          </Route> */}

          {/* <Route path="/user-form" component={UserForm} /> */}
          {/* <Route path="/question1" component={Question1} /> */}
          {/* <Route path="/question2" component={Question2} /> */}
          {/* <Route
            path="/user-profile"
            component={() => <UserProfile name="Jenil" age={21} />}
          /> */}
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
          {/* <Route component={NotFound} /> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

// const NotFound = () => {
//   return (
//     <div style={{ margin: "0 20px", color: "blue" }}>
//       <h1>404</h1>
//       <div>Not Found</div>
//     </div>
//   );
// };

// const MainLayout = ({ Component, ...props }) => {
//   return (
//     <div className="main-container">
//       <NavBar />
//       <Component {...props} />
//     </div>
//   );
// };

// const AuthLayout = (props) => {
//   return <div className="auth-container">{props.children}</div>;
// };

// class UserProfile extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: props.name || "",
//     };
//     // alternative of link event
//     // this.handleInput = this.handleInput.bind(this);
//   }

//   handleInput(component, event) {
//     component.setState({ name: event.target.value });
//   }

//   render() {
//     return (
//       <div style={{ margin: "0 20px" }}>
//         <label htmlFor="name">Name: </label>

//         <input
//           id="name"
//           value={this.state.name}
//           onInput={linkEvent(this, this.handleInput)}
//           placeholder="Enter your name"
//         />
//         <div>Name: {this.state.name}</div>
//         <div>Age: {this.props.age}</div>
//       </div>
//     );
//   }
// }

// const NavBar = () => {
//   return (
//     <nav>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="user-form">User Form</Link>
//         </li>
//         <li>
//           <Link to="question1">Question 1</Link>
//         </li>
//         <li>
//           <Link to="question2">Question 2</Link>
//         </li>
//         <li>
//           <Link to="user-profile">Profile Page</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };
