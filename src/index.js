import localForage from "localforage"

export default adapter => {
  var storage = localForage.createInstance({
    name: "axios-stack"
  })

  storage.setDriver(localForage.LOCALSTORAGE)

  return config => {
    config.timeout = 5000

    function storeRequest(data) {
      storage.setItem(String(Date.now()), data)
    }

    function removeRequest(time) {
      storage.removeItem(time)
    }

    function sendAllRequest() {
      storage.iterate((data, time) => {
        adapter(data)
          .then(() => removeRequest(time))
      })
    }

    let response = adapter(config)
      .catch(err => {
        let {
          code,
          message
        } = err

        if (code === 'ECONNABORTED' || message === 'Network Error') {
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
