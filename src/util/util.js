import md5 from 'md5'

function setTitle (title) {
  document.title = title
}

function createSign (data) {
  let dataString = ''

  if (typeof data === 'object') {
    Object.keys(data).sort().forEach(function (ele, index) {
      let value = data[ele]
      if (typeof value === 'object') {
        value = JSON.stringify(value)
      }
      dataString += ele + '=' + value
    })
  }

  dataString += 'ydb_h5'
  return md5(dataString)
}

export {
  setTitle,
  createSign
}
