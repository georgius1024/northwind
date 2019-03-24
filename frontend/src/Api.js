import axios from 'axios'
import { Subject } from 'rxjs'
import { from } from 'rxjs'
import config from './config'
const Api = {
  http: axios,
  error$: new Subject(),
  response$: new Subject(),
  message$: new Subject(),
  busy$: new Subject(),
  setBaseUrl(url) {
    this.http.defaults.baseURL = url
  },

  success(response) {
    this.busy$.next(false)
    if (response.data) {  
      this.response$.next(response.data)
      if (response.data.message) {
        this.message$.next(response.data.message)
      }
    }
  },

  error(error) {
    this.busy$.next(false)
    let message = error.message || 'Общая ошибка'
    if (message === 'Network Error') {
      message = 'Ошибка сети'
    }
    if (error.response) {
      if (error.response.data && error.response.data.message) {
        message = error.response.data.message
      }
    } else if (error.code === 'ECONNREFUSED') {
      message = 'Пропала связь с сервером'
    }
    this.error$.next(error)
  },

  execute(request) {
    this.busy$.next(true)
    const query = from(this.http(request))
    query.subscribe({
      next: response => this.success(response),
      error: error => this.error(error)
    })
    return query
  },

  get (url) {
    const request = {
      url,
      method: 'get'
    }
    return this.execute(request)
  },

  post (url, data) {
    const request = {
      url,
      data,
      method: 'post'
    }
    return this.execute(request)
  },
  
  put (url, data) {
    const request = {
      url,
      data,
      method: 'put'
    }
    return this.execute(request)
  },
  
  delete (url, data) {
    const request = {
      url,
      data,
      method: 'delete'
    }
    return Api.execute(request)
  }
  

}


Api.setBaseUrl(config.API_URL)
export default Api
