export function checkStatus (status: number): string {
  switch (Math.round(status / 100)) {
    case 1: {
      return 'Information'
    }
    case 2: {
      return 'Success'
    }
    case 3: {
      return 'Redirect'
    }
    case 4: {
      return 'Client Error'
    }
    case 5: {
      return 'Server Error'
    }
    default: {
      return ''
    }
  }
}
