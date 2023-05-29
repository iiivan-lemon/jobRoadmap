import React, { type ReactNode } from 'react'

export function debounce (func, timeout = 400) {
  let timer
  return (...args: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      // @ts-expect-error werwer
      func.apply(this, args)
    }, timeout)
  }
}

export const enum loadState {
  error,
  res,
  load,
  base
}

export function replaceURLs (message): ReactNode {
  if (!message) return <></>

  const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g
  return message.replace(urlRegex, function (url) {
    let hyperlink = url
    if (!hyperlink.match('^https?://')) {
      hyperlink = 'http://' + hyperlink
    }
    return (
      <a href={' ' + hyperlink + ' '} target="_blank" rel="noopener noreferrer">' + url + '</a>
    )
  })
}

export const updTips = (tips: string) => {
  const upd = ('! ' + tips).split('1.')
  if (upd.shift()) {
    const t = upd.join('1.')
    return ('1.' + t)
  }
  return ''
}
