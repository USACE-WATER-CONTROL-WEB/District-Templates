
function buildBreadcrumbs(url) {
    let breadcrumbs = document.getElementById("breadcrumbs")
    // Let the dev know they have not included the
    if (!breadcrumbs) {
        console.error("Cannot find id=\"breadcrumbs\", you must add <div id=\"breadcrumbs\"></div> to the document before importing the breadcrumbs script")
        return
    }
    // Default the location to the current URL
    var loc = window.location.pathname;
    // Override the location, check if the user included the domain/protocol
    if (url && !url.includes("://")) loc = url
    // Otherwise assume just a path was given
    else if (url) loc = url.split("/").splice(3).join("/")
    // Break the path into respective directories
    var dirs = loc.substring(0, loc.lastIndexOf('/')).split("/")
    let _url = "/"

    // No crumbs on the home page, make a home btn for every other page
    breadcrumbs.innerHTML = ""
    if (!dirs[0] && dirs.length == 1) return
    let home_crumb = '<a href="/" class="breadcrumb-link"><i class="fa fa-home"></i></a>'
    let bc_str = home_crumb
    breadcrumbs.innerHTML = home_crumb
    // Build URLs for each crumb and add to the DOM
    let skip_root = false
    if (dirs.length == 2) skip_root = true
    for (let d = 0; d < dirs.length; d++) {
        if (d == 1 && skip_root) continue
        if (!dirs[d]) continue
        let crumb = dirs[d].toUpperCase()
        if (d < dirs.length) {
            _url += dirs[d] + "/"
            // Make links for the breadcrumbs
            home_crumb += `<a href=${_url} class="breadcrumb-link">${crumb.replace("%20", " ")}</a>`
        }
    }
    // The final crumb is the current page, no link
    home_crumb += `<span class="breadcrumb-current">${document.title.toUpperCase()}</span>`
    breadcrumbs.innerHTML = home_crumb
}
// or run - to use current URL on page
buildBreadcrumbs()
