import Image from 'next/image';
import { site, whatsappHref, emailHref, instagramHref } from '@/lib/site';
import s from './Footer.module.css';

const groups = [
  {
    title: 'Look',
    links: [
      { href: '#collection', label: 'The collection' },
      { href: '#lookbook', label: 'Lookbook' },
      { href: '#spotlight', label: 'Front and back' },
    ],
  },
  {
    title: 'Know',
    links: [
      { href: '#craft', label: 'The work' },
      { href: '#bespoke', label: 'Commissions' },
      { href: '#faq', label: 'Questions' },
    ],
  },
];

export function Footer() {
  return (
    <footer className={s.foot}>
      <div className={s.inner}>
        <div className={s.brand}>
          <Image src="/img/mark.webp" alt="" width={885} height={773} />
          <p className={s.name}>{site.name}</p>
          <p className={s.tag}>{site.shortDescription}</p>
        </div>

        <nav className={s.nav} aria-label="Footer">
          {groups.map((g) => (
            <div key={g.title}>
              <h3>{g.title}</h3>
              {g.links.map((l) => (
                <a key={l.href} href={l.href}>
                  {l.label}
                </a>
              ))}
            </div>
          ))}
          <div>
            <h3>Reach</h3>
            <a href={whatsappHref()} target="_blank" rel="noopener">
              WhatsApp
            </a>
            <a href={emailHref}>Email</a>
            <a href={instagramHref} target="_blank" rel="noopener">
              Instagram
            </a>
          </div>
        </nav>
      </div>

      <div className={s.end}>
        <p>
          &copy; {new Date().getFullYear()} {site.name}. All pieces made to order.
        </p>
        <p>
          <a href="#top">Back to top</a>
        </p>
      </div>
    </footer>
  );
}
