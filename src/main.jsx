import { jsx, jsxs, Fragment } from './jsx-dom.jsx'
import './style.css'

document.title = 'Home — Vite JSX'

const goEdit = () => { window.location.href = '/edit/' }

const App = (
  <div class="app">
    <nav>
      <ul>
      <li><button class="btn btn-primary see-inside" onClick={goEdit}>
        See Inside →
      </button></li>
      </ul>
   </nav>
    <div id="project-view"><img src="images/flag.svg"></div>
    <footer class="footer">Ongoing is not affiliated with anything and is its own project :)</footer>
  </div>
)

document.body.appendChild(App)