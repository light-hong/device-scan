const baseUrl = process.env.VUE_APP_BASE_API

class Ajax {
  get(url) {
    const reqUrl = `${baseUrl}${url}`
    return new Promise((resolve, reject) => {
      fetch(reqUrl)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
  }
  // post方式
  post(url, data) {
    const reqUrl = `${baseUrl}${url}`
    return new Promise((resolve, reject) => {
      fetch(reqUrl, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))

    })
  }
}
export default new Ajax()
