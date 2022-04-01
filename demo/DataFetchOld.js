
import { useRouter } from "next/router"
import { useCallback, useState, useEffect } from "react"
import useSWR from 'swr'
import { fuchsia } from "tailwindcss/colors"
const fetcher = async (...args) => await fetch(...args).then(async (res) => {
  console.log('res.ok', res.ok)
  console.log('res.error', res.error)
  console.log('args', args)
  var data = await res.json()
  console.log('data', data)
  return data
})
// const fetcher = (...args) => fetch(...args).then(res => res.json())
function getSwr(url) {
  var { data, error } = useSWR(url, fetcher)
  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  }
}

async function postData(url, data) {
  await (
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      mode: 'no-cors'
    })
    // await fetch(requestUrl, options)
  )
}
function keyup() {
  
}

export const data_fetch = {
  swr_get: getSwr,
  post: postData,
  clone: (e) => JSON.parse(JSON.stringify(e)),
  keyup: keyup,
}


