class Ajax {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }
  get(url) {
    const reqUrl = `${this.baseUrl}${url}`
    return new Promise((resolve, reject) => {
      fetch(reqUrl, {
        methods: 'GET',
        credentials: 'include',
        mode: 'no-cors'
      })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
  }
  post(url, data) {
    const reqUrl = `${this.baseUrl}${url}`
    return new Promise((resolve, reject) => {
      fetch(reqUrl, {
        method: 'POST',
        credentials: 'include',
        mode: 'no-cors',
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
  postFormData(url, data) {
    const reqUrl = `${this.baseUrl}${url}`
    const formData = new FormData()
    data &&
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key])
      })
    return new Promise((resolve, reject) => {
      fetch(reqUrl, {
        method: 'POST',
        credentials: 'include',
        mode: 'no-cors',
        body: formData
      })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))

    })
  }
}

const createAjax = (baseUrl) => new Ajax(baseUrl)

export default createAjax
