import localForage from "localforage"

export default ({
  storageName = "axios-stack",
  storageDriver = localForage.LOCALSTORAGE
} = {}) => {
  let instance = localForage.createInstance({
    name: storageName
  })

  instance.setDriver(storageDriver)

  return instance
}
