import _ from 'lodash'

export default function makeData(data, header) {
  const newData = [...data].map((d) => {
    const obj = {}
    header.forEach((h, i) => {
      d.length = header.length
      obj[header[i].accessor] = d[i]
    })
    return obj
  })
  newData.shift()
  return newData
}
