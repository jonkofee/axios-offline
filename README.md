# axios-offline

[![npm package](https://img.shields.io/npm/v/axios-offline.svg)](https://www.npmjs.org/package/axios-offline)
[![npm downloads](https://img.shields.io/npm/dt/axios-offline.svg)](https://www.npmjs.org/package/axios-offline)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

Remembering failed requests and repeating when an internet connection is available

## Install

```bash
npm install axios-offline --save
```
or
```bash
yarn add axios-offline
```

## Usage

```javascript
import Axios from 'axios'
import AxiosOffline from 'axios-offline'
import LocalForage from "localforage"

let AxiosOfflineAdapter = AxiosOffline({
  defaultAdapter: Axios.defaults.adapter, //require, basic adapter
  storageName: "axios-offline", //optional, default: "axios-stack"
  storageDriver: LocalForage.LOCALSTORAGE //optional, default: LocalForage.LOCALSTORAGE
})

let http = Axios.create({
  adapter: AxiosOfflineAdapter
})

export default http
```
