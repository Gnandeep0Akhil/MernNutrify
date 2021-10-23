import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      sessionStorage.getItem('sessionId') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/logIn",
          }}
        />
      )
    }
  />
);

export default PrivateRoute

