import request from 

export default function apiRequest({ method = 'get', url, data, query }, token) {
    return new Promise((resolve, reject) => {
      if (!url) {
        return reject(new Error('request url missing'))
      }
      
    })
  }