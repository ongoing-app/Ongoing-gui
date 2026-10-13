const SVG_NS = 'http://www.w3.org/2000/svg'
const svgTags = new Set(['svg','path','circle','rect','line','g','polygon','polyline','ellipse','text','defs','use'])

function setProp(el, key, value) {
  if (key === 'children') return
  if (key === 'style' && typeof value === 'object') return Object.assign(el.style, value)
  if (key === 'className') return el.setAttribute('class', value)
  if (key.startsWith('on') && typeof value === 'function') return el.addEventListener(key.slice(2).toLowerCase(), value)
  if (value == null || value === false) return
  if (key in el && typeof el[key] !== 'object') { try { el[key] = value; return } catch {} }
  el.setAttribute(key, value === true ? '' : value)
}

function appendChild(el, child) {
  if (child == null || child === false || child === true) return
  if (Array.isArray(child)) return child.forEach(c => appendChild(el, c))
  if (child instanceof Node) return el.appendChild(child)
  el.appendChild(document.createTextNode(String(child)))
}

export function jsx(tag, props) {
  if (tag === Fragment || tag === undefined) {
    const frag = document.createDocumentFragment()
    appendChild(frag, props?.children)
    return frag
  }
  if (typeof tag === 'function') return tag({ ...props, children: props?.children })

  const el = svgTags.has(tag)
    ? document.createElementNS(SVG_NS, tag)
    : document.createElement(tag)

  for (const k in props) setProp(el, k, props[k])
  appendChild(el, props?.children)
  return el
}

export const jsxs = jsx

export function Fragment(props) {
  const frag = document.createDocumentFragment()
  appendChild(frag, props?.children)
  return frag
}