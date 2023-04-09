export function debounce (func, timeout = 300) {
  let timer
  return (...args: any) => {
    // eslint-disable-next-line no-debugger

    clearTimeout(timer)
    timer = setTimeout(() => {
      // @ts-expect-error werwer
      func.apply(this, args)
    }, timeout)
  }
}
