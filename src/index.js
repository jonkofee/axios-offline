import localforage from "./plugins/localforage"

export default options => {
  let { defaultAdapter } = options
  let storage = localforage(options)

  return config => {
    config.timeout = config.timeout || 5000

    function storeRequest(data) {
      storage.setItem(String(Date.now()), data)
    }

    function removeRequest(time) {
      storage.removeItem(time)
    }

    function sendAllRequest() {
      storage.iterate((data, time) => {
        defaultAdapter(data)
          .then(() => removeRequest(time))
      })
    }

    let response = defaultAdapter(config)
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
