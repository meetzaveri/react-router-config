import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Switch } from 'react-router

const Sandwiches = () => <h3>Sandwiches</h3>;

const Tacos = ({ match, routes }) => (
  <Router>
  <div>
    <ul>
        <li> <Link to="/tacos/bus"> Bus </Link> </li>
        {/* alternate way of matching with parent node attaching it to url */}
        <li> <Link to={`${match.url}/cart`}> Cart </Link> </li>
        {/* Both Link's "to" props work which depends on static and dynamic approach */}
    </ul>

    {routes.map((route, i) => (
      <RouteWithSubRoutes key={i} {...route} />
    ))}
    </div>
  </Router>
)

const Bus = () => <h3>Bus</h3>;

const Cart = () => <h3>Cart</h3>;

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = (route) => (
  <Route path={route.path} render={props => (
    // pass the sub-routes down to keep nesting
    <route.component {...props} routes={route.routes} />
  )} />
)


const routes =[
  {
    path : '/sandwiches',
    component : Sandwiches
  },
  {
    path: '/tacos',
    component: Tacos,
    routes : [
      {
        path :'/tacos/bus',
        component : Bus
      },
      {
        path: '/tacos/cart',
        component: Cart
      }
    ]
  }
]



const Main = () =>(
  <Switch>
  <Router>
  <div>
    <ul>
      <li><Link to="/tacos"> Tacos </Link> </li>
      <li><Link to="/sandwiches"> Sandwiches </Link> </li>
    </ul>
    {routes.map((route, i) => (
      <RouteWithSubRoutes key={i} {...route} />
    ))}
  </div>
  </Router>
</Switch>
)

export default Main;
