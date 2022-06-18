export const getFacebookCookies = () => {
  const result = chrome.cookies.getAll({
    domain: ".facebook.com"
  }, function(data) {
    console.log(data)
    return true
  })
  console.log(result)
  return "oke"
}
