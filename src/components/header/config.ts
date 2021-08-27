/* login 相关全部为 pc端 */
export function login() {
    window.location.href = `https://wdren.vdian.net/sso/wdrlogin?redirect=${encodeURIComponent(
        window.location.href
    )}`
}

export function logout() {
    window.location.href = `https://wdren.vdian.net/sso/logout?redirect=${encodeURIComponent(
        window.location.href
    )}`
}
