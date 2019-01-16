import { createAction, createReducer } from 'redux-act'
import { message } from 'antd'
import axios from 'axios'
import constant from '../config/default'
import { notification } from 'antd'

export const REDUCER = 'thing'

const NS = `@@${REDUCER}/`
const api = constant.api.iot
const thingApi = `${api.host}/${api.thing}`
const thingPropertyApi = `${api.host}/${api.thingProperty}`
const thingAlertApi = `${api.host}/${api.alertThing}`

export const setThingPage = createAction(`${NS}SET_THING_PAGE`)
export const setThingDetailPage = createAction(`${NS}SET_THING_DETAIL_PAGE`)
export const createThingState = createAction(`${NS}CREATE_THING`)
export const updateThingState = createAction(`${NS}UPDATE_THING`)
export const getThingsInGroup = createAction(`${NS}GET_THINGS_GROUP`)
export const getPermission = createAction(`${NS}GET_THING_PERMISSION`)
export const currentTab = createAction(`${NS}SET_CURRENT_TAB`)

export const getList = (limit = 18, page = 0, sort = 'name', isAsc = false) => (
  dispatch,
  getState,
) => {
  axios
    .get(thingApi, { params: { limit: limit, page: page, sort: sort, isAsc: isAsc } })
    .then(response => {
      let { thingThings, page, totalItems } = response.data
      dispatch(setThingPage({ things: thingThings, page, totalItems }))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'get thing list fail'
      message.error(errorMessage)
    })
}

export const getOne = id => (dispatch, getState) => {
  axios
    .get(`${thingApi}/${id}`)
    .then(response => {
      console.log('get one done')
      dispatch(setThingDetailPage(response.data))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'get thing fail'
      message.error(errorMessage)
    })
}

export const create = (model, isCreate = false) => (dispatch, getState) => {
  dispatch(createThingState(model))
  if (isCreate) {
    let thingModel = {
      name: model.name,
      description: model.description,
      templateID: model.template.id,
      projectID: model.project.id,
    }
    axios
      .post(thingApi, thingModel)
      .then(response => {
        //create thing thing property
        if (model.properties && model.properties.length > 0) {
          let thingId = response.data.id
          let propertyPromises = model.properties.map(property => {
            let propertyModel = {
              dataType: property.dataType,
              value: (property.defaultValue || '').toString(),
              description: property.description,
              isLogged: property.isLogged,
              isPersistent: property.isPersistent,
              isReadOnly: property.isReadOnly,
              name: property.name,
              thingID: thingId,
            }
            return axios.post(thingPropertyApi, propertyModel)
          })
          Promise.all(propertyPromises).then(res => {
            const { priorities } = getState().priority
            let alertPromises = res.map(x => {
              let property = model.properties.find(a => a.name === (x.data || {}).name)

              return ((property || {}).alerts || []).map(a => {
                let alertModel = {
                  defaultValue: a.value,
                  description: a.description,
                  name: a.name,
                  priorityID: ((priorities || []).find(x => x.name === a.priority) || {}).id,
                  propertyThingID: x.data.id,
                }
                return axios.post(thingAlertApi, alertModel)
              })
            })
            Promise.all(alertPromises).then(x => {
              message.success('Create templace success!')
            })
          })
        }
        let { things, page, totalItems } = getState().thing
        things.push(response.data)
        dispatch(setThingPage({ things, page, totalItems: totalItems++ }))
        dispatch(createThingState({}))
      })
      .catch(error => {
        dispatch(createThingState({}))
        let errorMessage = ((error.response || {}).data || {}).message || 'create thing fail'
        message.error(errorMessage)
      })
  }
}
export const update = (id, model, isUpdate) => (dispatch, getState) => {
  dispatch(setThingDetailPage(model))
  if (isUpdate) {
    axios
      .patch(`${thingApi}/${id}`, {
        description: model.description,
        name: model.name,
        imageId: model.imageId,
      })
      .then(response => {
        let { things, page, totalItems } = getState().thing
        if (things && Array.isArray(things) && things.length > 0) {
          let thingId = things.findIndex(x => x.id === response.data.id)
          if (thingId) {
            things[(id = thingId)] = response.data
            dispatch(setThingPage({ things, page, totalItems }))
            notification['success']({
              message: 'Update thing information success!',
              description:
                'Things status are updated. When things was left their job, you will remove them by delete things button or just deactive these things.',
            })
          }
        }
      })
      .catch(error => {
        let errorMessage =
          ((error.response || {}).data || {}).message || 'change status thing fail'
        message.error(errorMessage)
      })
  }
}
export const destroy = ids => (dispatch, getState) => {
  axios
    .delete(`${thingApi}?ids=${ids}`)
    .then(response => {
      notification['success']({
        message: 'Delete thing success!',
        description:
          'These things will be delete permanly shortly in 1 month. In that time, if you re-create these thing, we will revert information for them.',
      })
      let { things, page, totalItems } = getState().thing
      dispatch(
        setThingPage({
          things: things.filter(x => x.id != ids),
          page,
          totalItems: totalItems--,
        }),
      )
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'delete thing fail'
      message.error(errorMessage)
    })
}
export const setCurrentTab = (id = 0, tab = '1') => (dispatch, getState) => {
  dispatch(currentTab({ id, tab }))
}
const initialState = {
  totalItems: -1,
  page: 0,
  things: [],
}
const ACTION_HANDLES = {
  [setThingPage]: (state, { things, page, totalItems }) => ({
    ...state,
    things,
    page,
    totalItems,
  }),
  [createThingState]: (state, thingCreate) => ({ ...state, thingCreate }),
  [updateThingState]: (state, thingUpdate) => {
    return { ...state, detail: { ...state.detail, thingUpdate } }
  },
  [setThingDetailPage]: (state, detail) => ({ ...state, detail }),
  [getPermission]: (state, permissions) => ({ ...state, permissions }),
  [getThingsInGroup]: (state, thingsInGroup) => ({ ...state, thingsInGroup }),
  [currentTab]: (state, { id, tab }) => {
    if (!state.tabs) {
      state.tabs = []
    }
    let _tab = state.tabs.find(x => x.id === id)
    if (_tab) {
      _tab.tab = tab
    } else {
      state.tabs.push({ id, tab })
    }
    return state
  },
}
export default createReducer(ACTION_HANDLES, initialState)
