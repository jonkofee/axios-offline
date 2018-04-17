import localForage from "localforage"

export default class AxiosOffline {
  constructor({
    defaultAdapter,
    storageName = "axios-stack",
    storageDriver = localForage.LOCALSTORAGE
  } = {}) {
    let storageInstance = localForage.createInstance({
      name: storageName
    })
    storageInstance.setDriver(storageDriver)

    this.storage        = storageInstance
    this.defaultAdapter = defaultAdapter
  }
  getAdapter() {
    return config => {
      config.timeout = config.timeout || 5000

      let storeRequest = (data) => {
        this.storage.setItem(String(Date.now()), data)
      }

      let removeRequest = (time) => {
        this.storage.removeItem(time)
      }

      let sendAllRequest = () => {
        this.storage.iterate((data, time) => {
          this.defaultAdapter(data)
            .then(() => removeRequest(time))
        })
      }

      let response = this.defaultAdapter(config)
        .catch(err => {
          let {
            code,
            message,
            response
          } = err

          if (response === undefined && (code === 'ECONNABORTED' || message === 'Network Error')) {
            storeRequest(config)
          } else {
            sendAllRequest()
          }

          return Promise.reject(err)
        })
        .then(resolve => {
          sendAllRequest()

          return Promise.resolve(resolve)
        })

      return response
    }
  }
}
