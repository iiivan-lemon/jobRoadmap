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
