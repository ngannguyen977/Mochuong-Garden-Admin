import React from "react"
import { Route } from "react-router-dom"
import { ConnectedSwitch } from "reactRouterConnected"
import Loadable from "react-loadable"
import Page from "components/LayoutComponents/Page"
import NotFoundPage from "pages/DefaultPages/NotFoundPage"
import DashboardAlphaPage from "pages/Dashboard/DashboardAlphaPage"

const loadable = loader =>
  Loadable({
    loader,
    delay: false,
    loading: () => null,
  })

const loadableRoutes = {
  "/products": {
    component: loadable(() => import("pages/products")),
    
  },
  "/products/addNew": {
    component: loadable(() => import("pages/products/createPage")),
    
  },
  "/products/update/:id": {
    component: loadable(() => import("pages/products/updatePage")),
    
  },
  "/home": {
    component: loadable(() => import("pages/Dashboard/DashboardAlphaPage")),
    
  },
  "/categories": {
    component: loadable(() => import("pages/categories")),
    
  },
  "/categories/addNew": {
    component: loadable(() => import("pages/categories/createPage")),
    
  },
  "/categories/update/:id": {
    component: loadable(() => import("pages/categories/updatePage")),
    
  },
   "/categories/addNew": {
    component: loadable(() => import("pages/categories/createPage")),
    
  },
  "/orders": {
    component: loadable(() => import("pages/order")),
    
  },
  "/orders/orderDetail": {
    component: loadable(() => import("pages/order/orderDetail")),
    
  }
}

class Routes extends React.Component {
  timeoutId = null

  componentDidMount() {
    this.timeoutId = setTimeout(
      () => Object.keys(loadableRoutes).forEach(path => loadableRoutes[path].component.preload()),
      5000, // load after 5 sec
    )
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
  }

  render() {
    return (
      <ConnectedSwitch>
        <Route exact path='/' component={DashboardAlphaPage} />
        {Object.keys(loadableRoutes).map(path => {
          const { exact, ...props } = loadableRoutes[path]
          props.exact = exact === void 0 || exact || false // set true as default
          return <Route key={path} path={path} {...props} />
        })}
        <Route
          render={() => (
            <Page>
              <NotFoundPage />
            </Page>
          )}
        />
      </ConnectedSwitch>
    )
  }
}

export { loadableRoutes }
export default Routes
