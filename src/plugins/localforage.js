import localForage from "localforage"

let storage = localForage.createInstance({
  name: "axios-stack"
})

storage.setDriver(localForage.LOCALSTORAGE)

export default storage;
