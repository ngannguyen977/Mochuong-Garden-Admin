export default {
  api: {
    authen: {
      host: 'https://api-dev.onskycloud.com/authen/v1/api',
      login: 'auth/login',
      info: 'auth/me',
      register: 'customers',
      group: 'groups',
      user: 'users',
      usersByGroup: 'bygroup',
      groupsByUser: 'byuser',
      confirmEmail: 'customers/activate',
    },
    policy: {
      // host: 'http://localhost:8080/v1/api',
      token: 'sdcxcx22334632rwhczyr392yr02ud23r9t34uy23r9t3df932jhfo',
      host: 'https://api-dev.onskycloud.com/policy-service/v1/api',
      policy: 'policies',
      group: 'groups',
      user: 'users',
    },
    resource: {
      host: 'https://api-dev.onskycloud.com/resource-service/v1/api',
      token: 'sdfiusfi98234632rwhczyr392yr02u-23r9t34uy23r9t3fsfskhfo',
      // host: 'http://localhost:8080/v1/api',
      service: 'services',
      serviceSummary: 'summary',
      serviceGetByShortName: 'shortname',
      serviceGetActions: 'actions',
      serviceCreate: 'register',
      serviceDisable: 'disable',
      serviceEnable: 'enable',
      serviceDelete: 'shortname',
      serviceDeletes: 'deletes',
    },
    iot:{
      host:'https://api-dev.onskycloud.com/iot-service/v1/api',
      project:'projects'
    }
  },
}
