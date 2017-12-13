
let flk = {}

flk.map = {}
flk.set = function (names, infos) {
    if (Array.isArray(names) && Array.isArray(infos)) {
        names.forEach((name, i) => {
            this.set(name, infos[i])
        })
    }
    else if (Array.isArray(names)) {
        names.forEach((name, i) => {
            this.set(name, infos)
            this.map[name] = infos
        })
    }
    else if (typeof infos == 'string' || infos instanceof RegExp) {
        flk.set(names, flk.get(infos))
    }
    else this.map[names] = infos
}
flk.get = function (test) {
    if (arguments.length > 1) {
        return Array.from(arguments).map((test) => flk.get(test))
    }
    else if (typeof test == 'function') {
        return Object.keys(this.map)
            .filter(test)
            .map((key) => this.map[key])
    }
    else {
        const map = this.map
        if (map[test]) return map[test]
        else {
            const matchFlickr = []
            for (let name in map) {
                if (name.match(test)) {
                    if (test.global) {
                        matchFlickr.push(map[name])
                    }
                    else return map[name]
                }
            }
            if (test.global) return matchFlickr
            else return undefined
        }
    }
}

flk.getNode = function () {
    const match = this.get.apply(this, arguments)
    if (Array.isArray(match)) {
        return match.map((info) => this.toNode(info))
    }
    else return this.toNode(match)
}

flk.toNode = function (info) {
    const i = info
    const page = `https://flickr.com/photos/${i.user}/${i.photo}`
    const image =
        `https://${i.farm}.staticflickr.com/${i.server}/${i.photo}_${i.secret}.jpg`

    const a = document.createElement('a')
    a.href = page
    a.setAttribute('data-flickr-embed', true)

    const img = document.createElement('img')
    img.src = image
    a.appendChild(img)

    return a
}

flk.gn = flk.getNode

flk.fig = function (name, text) {
    const fig = document.createElement('figure')
    const img = this.getNode(name)
    fig.appendChild(img)
    
    const caption = document.createElement('figcaption')
    caption.textContent = text
    fig.appendChild(caption)
    return fig
}

flk.script =  document.createElement('script')
flk.script.async = true
flk.script.src = '//embedr.flickr.com/assets/client-code.js'
flk.script.charset = 'utf-8'

window.addEventListener(
    'load',
    () => document.head.appendChild(flk.script)
)
