import request from 'request'

/**
 * @param {{url:string, json:object, headers:object}}  param0 
 */
export const get = async function ({ url, json, headers }) {
  const data = arguments[0]
  return new Promise(function (resolve, reject) {

    request.get(data, (error, response, body) => {
      if (!error)
        response?.statusCode !== 200
          && console.log('get error code:', response?.statusCode)
      else
        console.error(error)
      resolve(body)
    })
  })
}