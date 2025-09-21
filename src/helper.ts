// Helper functions

export function isValidName(name: string): boolean {
  const pattern = /^[A-Za-z0-9\.\ ]+$/
  if (!pattern.test(name) || name === '') {
    return false;
  }
  return true;
}

export function isValidPasswordChars(password: string) : boolean {
  if (
    !/[A-Za-z]/.test(password) ||
    !/[0-9]/.test(password) ||
    !/[\!\@\#\$\%\^\&\*\+\-]/.test(password)
  ) {
    return false;
  }
  return true;
}