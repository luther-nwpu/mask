import * as Cookies from 'js-cookie'
export interface IResponse {
  success: string,
  result: any
}
/**
 * tryCatch return Promise<[T, Error]>
 * @param {Promise<T>} promise
 */
export async function tryCatch(promise: any) {
  try {
    const ret = await promise
    return [ret, null]
  } catch (e) {
    return [null, e]
  }
}

export function Post(url: string, params: any): Promise<any> {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then((response) => response.json())
      .then((data: IResponse) => resolve(data))
      .catch((err) => reject(err))
  })
}

export function TokenPost(url: string, params: any): Promise<any> {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: Cookies.get('Authorization'),
      })
    }).then((response) => response.json())
      .then((data: IResponse) => resolve(data))
      .catch((err) => reject(err))
  })
}



export async function TokenGet(url: string, params?: Object): Promise<any> {
  if (params) {  
      let paramsArray = []
      //拼接参数  
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))  
      if (url.search(/\?/) === -1) {  
          url += '?' + paramsArray.join('&')  
      } else {  
          url += '&' + paramsArray.join('&')  
      }  
  }
  return new Promise<any>((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: Cookies.get('Authorization'),
      })
    }).then((response) => response.json())
      .then((data: IResponse) => resolve(data))
      .catch((err) => reject(err))
  })
}


export function FilePost(url: string, file: any): Promise<any> {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      body: file
    }).then((response) => response.json())
      .then((data: IResponse) => resolve(data))
      .catch((err) => reject(err))
  })
}

export async function Get(url: string, params: Object): Promise<any> {
  if (params) {  
      let paramsArray = []
      //拼接参数  
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))  
      if (url.search(/\?/) === -1) {  
          url += '?' + paramsArray.join('&')  
      } else {  
          url += '&' + paramsArray.join('&')  
      }  
  }
  return new Promise<any>((resolve, reject) => {
    fetch(url, {
      method: 'GET',
    }).then((response) => response.json())
      .then((data: IResponse) => resolve(data))
      .catch((err) => reject(err))
  })
}
