export function setCookie(name: string | number | boolean, value: string | number | boolean, options = {} as any) {
  options = {
    path: '/',
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

export function getCookie(cookie_string: string, key: string): string {
  const all_cookies = cookie_string.split(';');
  for (const cookie of all_cookies) {
    const kv_pair = cookie.split('=');
    if (kv_pair[0].trim() === key) {
      return decodeURIComponent(kv_pair[1]);
    }
  }
  return '';
}

export function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}