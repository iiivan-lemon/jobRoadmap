export function checkStatus (status: number): string | null {
  switch (Math.round(status / 100)) {
    case 4: {
      return 'ошибка'
    }
    case 5: {
      return 'ошибка сервера'
    }
    default: {
      return ''
    }
  }
}
