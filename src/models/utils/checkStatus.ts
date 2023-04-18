export function checkStatus (status: number): string | null {
  if (status === 404) {
    return 'по вашешу запросу ничего не найдено'
  }
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
