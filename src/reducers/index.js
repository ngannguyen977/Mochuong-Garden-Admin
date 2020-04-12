import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import { pendingTasksReducer } from "react-redux-spinner"
import app from "./app"
import productPageReducer from "./product"

export default combineReducers({
  routing: routerReducer,
  pendingTasks: pendingTasksReducer,
  app,
  productPageReducer:productPageReducer,
})
