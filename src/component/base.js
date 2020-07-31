import { React } from '@/utils/base';
import { NAV_MENUS } from '@/utils/config';

export const HeaderComponent = (props) => {
  return (
    <header className="flex flex-justify">
      {
        NAV_MENUS.map((i, y) => {
          return <nav key={y * Math.random()} className={y === 0 ? 'selected' : ''}>{i.name}</nav>
        })
      }
    </header>
  )
}

export const FooterComponent = (props) => {
  return (
    <footer>
      Footer.
    </footer>
  )
}

export const ContentComponent = (props) => {
  return (<section className="content">
    <div>{props.children}</div>
  </section>)
}