// src/jsx-dom.jsx

const SVG_NS = 'http://www.w3.org/2000/svg'
const svgTags = new Set(['svg','path','circle','rect','line','g','polygon','polyline','ellipse','text','defs','use'])

function setProp(el, key, value) {
  if (key === 'children') return
  if (key === 'style' && typeof value === 'object') {
    Object.assign(el.style, value)
    return
  }
  if (key === 'className') {
    el.setAttribute('class', value)
    return
  }
  if (key.startsWith('on') && typeof value === 'function') {
    el.addEventListener(key.slice(2).toLowerCase(), value)
    return
  }
  if (value == null || value === false) return
  if (key in el && typeof el[key] !== 'object') {
    try { el[key] = value; return } catch {}
  }
  el.setAttribute(key, value === true ? '' : value)
}

function appendChild(el, child) {
  if (child == null || child === false || child === true) return
  if (Array.isArray(child)) { child.forEach(c => appendChild(el, c)); return }
  if (child instanceof Node) { el.appendChild(child); return }
  el.appendChild(document.createTextNode(String(child)))
}

export function jsx(tag, props, key) {
  // Fragment
  if (tag === Fragment || tag === undefined) {
    const frag = document.createDocumentFragment()
    appendChild(frag, props?.children)
    return frag
  }

  // Function component
  if (typeof tag === 'function') {
    return tag({ ...props, children: props?.children })
  }

  // Element
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