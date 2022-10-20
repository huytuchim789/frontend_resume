import { useMemo } from 'react'

export const getCSV = (dataCsv) => {
  let arrData = []
  const arr = String(dataCsv).replace(',-,,', '')
  const test = arr?.split('\r\n')
  for (let i = 0; i < test?.length - 1; i++) {
    arrData?.push(test[i].split(','))
  }
  return arrData
}
export const getDataInformation = async () => {
  try {
    const response = await fetch(
      'http://dashboard.ulake.usth.edu.vn/api/user/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: '21112001',
          userName: 'KietLyanh',
        }),
      }
    )

    const rawResponse = await response.json()

    if (rawResponse?.code === 200) {
      localStorage.setItem('access_token_csv', rawResponse?.resp)
    }
  } catch (err) {
    console.log(err)
  }
}

export const searchInObject = (object, keyword) => {
  //   return (
  //     array.filter((e) => {
  //       return e.includes(keyword.trim())
  //     }).length > 0
  //   )
  return (
    Object.values(object).filter((e) => {
      return e?.includes(keyword.trim())
    }).length > 0
  )
}
