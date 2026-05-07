import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import OptimizedImage from './components/OptimizedImage'
import { usePreloadImages } from './hooks/usePreloadImages'

const logo = '/logo_0.png'
const campaignLogo = '/logo-campaign.png'
const campaignPath = '/campanha-esquadrias'
const mainSitePath = '/'
const campaignWhatsappMessage =
  'Olá! Vim através da página de campanha da Studio 7 e gostaria de solicitar um atendimento.'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

function useAnimateOnce({ threshold = 0.15, rootMargin = '0px 0px -10% 0px' } = {}) {
  const ref = useRef(null)
  const [hasAnimated, setHasAnimated] = useState(
    () => typeof IntersectionObserver === 'undefined' || prefersReducedMotion(),
  )

  useEffect(() => {
    if (hasAnimated) return
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setHasAnimated(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin },
    )
    observer.observe(node)

    return () => observer.disconnect()
  }, [hasAnimated, threshold, rootMargin])

  return [ref, hasAnimated]
}

const contact = {
  whatsappLabel: '+55 19 97402-7431',
  whatsappUrl:
    'https://wa.me/5519974027431?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Studio%207%20e%20gostaria%20de%20um%20or%C3%A7amento.',
  campaignWhatsappUrl: `https://wa.me/5519974027431?text=${encodeURIComponent(campaignWhatsappMessage)}`,
  email: 'contato@studio7esquadrias.com.br',
  emailUrl: 'mailto:contato@studio7esquadrias.com.br',
  instagramHandle: '@studio7_esquadrias',
  instagramUrl: 'https://www.instagram.com/studio7_esquadrias/',
  location: 'Campinas/SP',
}

const images = {
  hero: '/Pagina%20principal%20possibilidades/design-house-modern-villa-with-open-plan-living-private-bedroom-wing-large-terrace-with-privacy.jpg',
  factory: '/Diferenciais%20possibilidades/fabrica.jpeg',
  showroom: '/Diferenciais%20possibilidades/showroom.jpg',
  support: '/Diferenciais%20possibilidades/atendimento%20personalizado.jpg',
  installation: '/Diferenciais%20possibilidades/instala%20com%20indicacao.png',
  structure1: '/Estrutura%20possibilidades/estrutura%20carrousel1.jpeg',
  structure2: '/Estrutura%20possibilidades/estrutura%20carrousel2.jpg',
  structure3: '/Estrutura%20possibilidades/estrutura%20carrousel3.jpg',
  structure4: '/Estrutura%20possibilidades/estrutura%20carrousel4.jpg',
  projectA: '/Projetos%20possibilidades/Projetos.jpg',
  projectB: '/Projetos%20possibilidades/projetos%20possibilidades%201.jpg',
  projectC: '/Projetos%20possibilidades/projetos%20possibilidades2.jpg',
  partners: '/Parceiros%20serralheiros%20possibilidades/parceiros%20serralheiros.jpg',
  locationFacade: '/onde%20estamos/fachada.jpeg',
  campaign: '/Pagina%20patrocinada%20possibilidades/happy-father-with-daughter-standing-near-open-balcony-smiling.jpg',
}

const navItems = [
  { id: 'principal', label: 'Principal' },
  { id: 'quem-somos', label: 'Quem somos' },
  { id: 'diferenciais', label: 'Diferenciais' },
  { id: 'estrutura', label: 'Estrutura' },
  { id: 'funciona', label: 'Como funciona' },
  { id: 'beneficios', label: 'Benefícios' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'serralheiros', label: 'Parceiros Serralheiros' },
  { id: 'onde-estamos', label: 'Onde estamos' },
  { id: 'contato', label: 'Contato' },
]

const sectionImages = {
  principal: [],
  'quem-somos': ['/Diferenciais%20possibilidades/fabrica.jpeg'],
  diferenciais: [
    '/Diferenciais%20possibilidades/fabrica.jpeg',
    '/Diferenciais%20possibilidades/showroom.jpg',
    '/Diferenciais%20possibilidades/atendimento%20personalizado.jpg',
    '/Diferenciais%20possibilidades/instala%20com%20indicacao.png',
  ],
  estrutura: [
    '/Estrutura%20possibilidades/estrutura%20carrousel1.jpeg',
    '/Estrutura%20possibilidades/estrutura%20carrousel2.jpg',
    '/Estrutura%20possibilidades/estrutura%20carrousel3.jpg',
    '/Estrutura%20possibilidades/estrutura%20carrousel4.jpg',
  ],
  funciona: [],
  beneficios: [],
  projetos: [
    '/Projetos%20possibilidades/Projetos.jpg',
    '/Projetos%20possibilidades/projetos%20possibilidades%201.jpg',
    '/Projetos%20possibilidades/projetos%20possibilidades2.jpg',
  ],
  serralheiros: ['/Parceiros%20serralheiros%20possibilidades/parceiros%20serralheiros.jpg'],
  'onde-estamos': ['/onde%20estamos/fachada.jpeg'],
  contato: [],
}

const aboutLead = 'Mais de 20 anos transformando projetos em esquadrias de alumínio sob medida.'

const aboutParagraphs = [
  <>
    Empresa especializada na <strong>fabricação de esquadrias de alumínio</strong> sob demanda e personalizadas, produzimos cada peça exatamente como o seu projeto pede.
  </>,
  <>
    Você tem <strong>autonomia total</strong> para escolher seus materiais e contar com nossa <strong>estrutura de ponta</strong> e profissionais capacitados — fazendo tudo como sempre sonhou.
  </>,
  <>
    Garantimos uma produção certa e justa, com a liberdade de administrar instalações e <strong>prazos no seu tempo</strong>.
  </>,
]

const differentiators = [
  {
    image: images.factory,
    title: 'Fábrica com equipamentos de ponta',
    items: ['Suporte técnico', 'Produção inteligente e eficiente', 'Agilidade', 'Qualidade garantida'],
  },
  {
    image: images.showroom,
    title: 'Showroom exclusivo',
    items: ['Itens diversos e personalizados', 'Mostruários e peças', 'Experiência demonstrada na prática'],
  },
  {
    image: images.support,
    title: 'Atendimento personalizado',
    items: ['Cada cliente escolhe seu tipo de atendimento', 'Adequação à cada obra', 'Personalização'],
  },
  {
    image: images.installation,
    responsive: false,
    title: 'Instalação através da indicação de parceiros',
    items: ['Listas de instaladores parceiros', 'Poder de escolha e flexibilidade', 'Instruções técnicas detalhadas'],
  },
]

const structureItems = [
  {
    image: images.structure1,
    caption: 'Controle',
    alt: 'Estrutura da fábrica Studio 7 com equipamentos preparados para esquadrias de alumínio',
  },
  {
    image: images.structure2,
    caption: 'Precisão',
    alt: 'Detalhes técnicos de produção em nossa fábrica para acabamentos precisos',
  },
  {
    image: images.structure3,
    caption: 'Personalização',
    alt: 'Showroom e ambiente personalizado da Studio 7 Esquadrias',
  },
  {
    image: images.structure4,
    caption: 'Qualidade',
    alt: 'Área produtiva ampla preparada para qualidade em cada detalhe',
  },
]

const processJourney = [
  {
    icon: 'phone',
    title: 'Cliente entra em contato conosco',
  },
  {
    icon: 'analysis',
    title: 'Adequação do projeto de acordo com as necessidades',
  },
  {
    icon: 'measure',
    title: 'Ajustes dos detalhes e logística do projeto',
  },
  {
    icon: 'logistics',
    title: 'Produção exclusiva em nossa fábrica',
  },
  {
    icon: 'factory',
    title: 'Peças prontas de acordo com o projeto e prazos',
  },
  {
    icon: 'delivery',
    title: 'Disponibilização do pedido pronto para instalação',
  },
]

const mainBenefits = [
  'Produtividade e qualidade',
  'Garantia de recebimento',
  'Compras certas e precisas',
  'Tempo de sobra para cuidar de outros assuntos',
  'Lucratividade e economia sem dor de cabeça',
]

const benefits = [
  'Atendimento exclusivo',
  'Orçamento correto',
  'Contrato e faturamento diretos',
  'Suporte na compra de materiais e insumos',
  'Apoio direto ao cliente',
  'Adequação de acordo com as necessidades',
  'Economia sentida no bolso',
  'Infraestrutura e suporte personalizados',
]

const projectLines = [
  { title: 'Linhas econômicas e cotidianas', items: ['Suprema', 'Mega 25', 'Linha 30', 'Outras a consultar'] },
  { title: 'Linhas mais pesadas e robustas', items: ['Linha Gold', 'Mega 32', 'Imperial', 'Outras a consultar'] },
  { title: 'Linhas premium e grandes vãos', items: ['Linha 42', 'Mega 45', 'Perfetta', 'Outras a consultar'] },
  { title: 'Linhas mais modernas e minimalistas', items: ['Linha Chroma', 'Perfetta', 'Outras a consultar'] },
  {
    title: 'Linhas personalizadas e diferenciadas',
    items: ['Ripados', 'ACM', 'Muxarabis', 'Pergolados', 'Pele de vidro', 'Infinity', 'Outros a consultar'],
  },
]

const partnerItems = [
  'Venda suas esquadrias sem medo, pois fabricamos para você',
  'Traga seus projetos',
  'Venha com seus clientes desfrutar de nosso showroom e nossa estrutura completa',
  'Ganhe tempo para vender ainda mais enquanto fabricamos para você',
  'Invista na qualidade de suas instalações enquanto sua fabricação está garantida conosco',
]

const ProcessIcon = memo(function ProcessIcon({ type }) {
  const icons = {
    phone: (
      <>
        <path d="M9.2 5.4 7.4 7.2c-.5.5-.6 1.2-.3 1.8a18.6 18.6 0 0 0 7.9 7.9c.6.3 1.3.2 1.8-.3l1.8-1.8c.4-.4.4-1 0-1.4l-2.1-2.1c-.4-.4-1-.4-1.4 0l-.8.8a11.5 11.5 0 0 1-4.4-4.4l.8-.8c.4-.4.4-1 0-1.4L10.6 5.4c-.4-.4-1-.4-1.4 0Z" />
        <path d="M15 5.2c2.1.5 3.6 2 4.1 4.1" />
      </>
    ),
    analysis: (
      <>
        <circle cx="10.2" cy="10.2" r="4.7" />
        <path d="m13.7 13.7 4.8 4.8" />
        <path d="M8.2 10.2h4" />
        <path d="M10.2 8.2v4" />
      </>
    ),
    measure: (
      <>
        <path d="M6 18 18 6" />
        <path d="M8 20 4 16 16 4l4 4L8 20Z" />
        <path d="m13 7 4 4" />
        <path d="m10.5 9.5 2 2" />
      </>
    ),
    logistics: (
      <>
        <path d="M4 7h9v8H4z" />
        <path d="M13 10h3.2l2.8 2.8V15h-6z" />
        <circle cx="7" cy="17" r="1.5" />
        <circle cx="16" cy="17" r="1.5" />
        <path d="M6 5h5" />
      </>
    ),
    factory: (
      <>
        <path d="M4 19V9l5 3V9l5 3V7h4v12H4Z" />
        <path d="M7 16h2" />
        <path d="M12 16h2" />
        <path d="M16 16h2" />
      </>
    ),
    delivery: (
      <>
        <path d="M4 11.2 12 5l8 6.2" />
        <path d="M6.5 10.5V19h11v-8.5" />
        <path d="m9 14.4 2.1 2.1 4.1-4.4" />
      </>
    ),
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {icons[type]}
    </svg>
  )
})

const MAP_SRC =
  'https://www.google.com/maps?q=Av.+Anton+Von+Zuben,+3145,+Jardim+São+José,+Campinas+-+SP,+13051-145&output=embed'

const DeferredMap = memo(function DeferredMap() {
  const wrapRef = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    if (!wrapRef.current || shouldLoad) return
    const node = wrapRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '600px' },
    )
    observer.observe(node)

    return () => observer.disconnect()
  }, [shouldLoad])

  return (
    <div ref={wrapRef} className="mapa-frame">
      {shouldLoad ? (
        <iframe
          src={MAP_SRC}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localização da Studio 7 Esquadrias"
        />
      ) : null}
    </div>
  )
})

function usePageMetadata({ title, description, path }) {
  useEffect(() => {
    document.title = title

    let descriptionMeta = document.querySelector('meta[name="description"]')
    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta')
      descriptionMeta.setAttribute('name', 'description')
      document.head.appendChild(descriptionMeta)
    }
    descriptionMeta.setAttribute('content', description)

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', `${window.location.origin}${path}`)
  }, [description, path, title])
}

function SiteFooter({ navigationPrefix = '#', className = '' } = {}) {
  const footerLinks = [
    { href: `${navigationPrefix}principal`, label: 'Principal' },
    { href: `${navigationPrefix}projetos`, label: 'Projetos' },
    { href: `${navigationPrefix}beneficios`, label: 'Benefícios' },
    { href: `${navigationPrefix}contato`, label: 'Contato' },
  ]

  return (
    <footer className={`site-footer ${className}`.trim()}>
      <div className="page-container footer-container">
        <div className="footer-col footer-brand">
          <img className="footer-logo" src={logo} alt="Studio 7 Esquadrias" width="64" height="64" loading="lazy" decoding="async" />
          <p>Studio 7 Esquadrias. Solução em esquadrias.</p>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">Contato</h4>
          <ul className="footer-list">
            <li>
              <a href={contact.whatsappUrl} target="_blank" rel="noreferrer">
                WhatsApp · {contact.whatsappLabel}
              </a>
            </li>
            <li>
              <a href={contact.emailUrl}>{contact.email}</a>
            </li>
            <li>{contact.location}</li>
          </ul>
          <div className="footer-social">
            <a href={contact.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram da Studio 7 Esquadrias">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm0 2.2A2.8 2.8 0 0 0 5.2 8v8A2.8 2.8 0 0 0 8 18.8h8a2.8 2.8 0 0 0 2.8-2.8V8A2.8 2.8 0 0 0 16 5.2H8Zm4 3.2a3.6 3.6 0 1 1 0 7.2 3.6 3.6 0 0 1 0-7.2Zm0 2.1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm4.2-2.8a1 1 0 1 1 0 2.1 1 1 0 0 1 0-2.1Z" />
              </svg>
              <span>{contact.instagramHandle}</span>
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">Navegação</h4>
          <ul className="footer-list">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="page-container footer-bottom">
        <p>© 2026 Studio 7 Esquadrias. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}

function CampaignLandingPage() {
  usePageMetadata({
    title: 'Studio 7 Esquadrias | Campanha',
    description:
      'Atendimento direto da Studio 7 para esquadrias sob medida com qualidade, preço justo e garantia de entrega.',
    path: campaignPath,
  })

  return (
    <div className="campaign-page">
      <div className="campaign-screen">
        <header className="campaign-header">
          <a href={mainSitePath} aria-label="Ir para o site principal da Studio 7">
            <img
              className="campaign-header-logo"
              src={campaignLogo}
              alt="Studio 7 Esquadrias"
              width="320"
              height="139"
              decoding="async"
              fetchPriority="high"
            />
          </a>
        </header>

        <main className="campaign-main">
          <section className="campaign-hero" aria-labelledby="campaign-title">
            <div className="page-container campaign-hero-content">
              <p className="section-kicker">Studio 7 Esquadrias</p>
              <h1 id="campaign-title">
                Cansado de correr atrás de uma empresa séria para realizar o sonho de suas esquadrias?
              </h1>
              <p className="campaign-subtitle">
                A Studio 7 tem a solução para sua obra se transformar no sonho que tanto idealizou. Aqui você encontra qualidade, preço justo e garantia de entrega.
              </p>

              <div className="campaign-actions">
                <a className="primary-button campaign-primary" href={contact.campaignWhatsappUrl} target="_blank" rel="noreferrer">
                  Falar no WhatsApp
                </a>
                <a className="ghost-button campaign-secondary" href={mainSitePath}>
                  Visitar site principal
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>

      <SiteFooter className="campaign-footer" navigationPrefix="/#" />
    </div>
  )
}

function HomePage() {
  const [isTopbarSolid, setIsTopbarSolid] = useState(false)
  const [activeSection, setActiveSection] = useState(navItems[0].id)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const structureViewportRef = useRef(null)
  const [aboutRef, isAboutVisible] = useAnimateOnce()
  const [processRef, isProcessVisible] = useAnimateOnce()

  const upcomingImages = useMemo(() => {
    const currentIndex = navItems.findIndex((item) => item.id === activeSection)
    if (currentIndex === -1) return []
    const next1 = navItems[currentIndex + 1]?.id
    const next2 = navItems[currentIndex + 2]?.id
    return [...(sectionImages[next1] || []), ...(sectionImages[next2] || [])]
  }, [activeSection])

  usePreloadImages(upcomingImages)

  const getHeaderHeight = useCallback(() => {
    const header = document.querySelector('.topbar')
    const cssHeight = Number.parseFloat(
      window.getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
    )

    return Math.ceil(header?.getBoundingClientRect().bottom || cssHeight || 80)
  }, [])

  const updateHeaderHeight = useCallback(() => {
    document.documentElement.style.setProperty('--header-height', `${getHeaderHeight()}px`)
  }, [getHeaderHeight])

  const scrollToSection = useCallback((id, behavior = 'smooth') => {
    const target = document.getElementById(id)

    if (!target) return

    const headerHeight = getHeaderHeight()
    const elementPosition = target.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = Math.max(0, elementPosition - headerHeight)
    const finalBehavior = behavior === 'smooth' && prefersReducedMotion() ? 'auto' : behavior

    window.scrollTo({
      top: offsetPosition,
      behavior: finalBehavior,
    })
  }, [getHeaderHeight])

  const moveStructureCarousel = (direction) => {
    const viewport = structureViewportRef.current

    if (!viewport) return

    const firstSlide = viewport.querySelector('.structure-slide')
    const track = viewport.querySelector('.structure-track')
    const trackStyles = track ? window.getComputedStyle(track) : null
    const gap = Number.parseFloat(trackStyles?.columnGap || trackStyles?.gap) || 0
    const slideDistance = firstSlide ? firstSlide.getBoundingClientRect().width + gap : viewport.clientWidth * 0.35
    const halfScrollWidth = viewport.scrollWidth / 2

    if (halfScrollWidth > 0 && viewport.scrollLeft >= halfScrollWidth) {
      viewport.scrollLeft -= halfScrollWidth
    }

    if (direction < 0 && viewport.scrollLeft <= slideDistance) {
      viewport.scrollLeft += halfScrollWidth
    }

    viewport.scrollBy({
      left: direction * slideDistance,
      behavior: 'smooth',
    })
  }

  const normalizeStructureCarousel = () => {
    const viewport = structureViewportRef.current

    if (!viewport) return

    const halfScrollWidth = viewport.scrollWidth / 2

    if (halfScrollWidth <= 0) return

    if (viewport.scrollLeft >= halfScrollWidth) {
      viewport.scrollLeft -= halfScrollWidth
    }
  }

  useEffect(() => {
    let ticking = false
    const updateSolid = () => {
      setIsTopbarSolid(window.scrollY > 24)
      ticking = false
    }
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(updateSolid)
    }

    updateSolid()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    updateHeaderHeight()
    let raf = 0
    const onResize = () => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        raf = 0
        updateHeaderHeight()
      })
    }
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      if (raf) window.cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [updateHeaderHeight])

  useEffect(() => {
    const sectionNodes = document.querySelectorAll('[data-section]')

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((entry) => entry.isIntersecting)

        if (intersecting.length > 0) {
          const topmost = intersecting.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0]
          setActiveSection(topmost.target.id)
        }
      },
      {
        threshold: 0,
        rootMargin: '-40% 0px -55% 0px',
      },
    )

    sectionNodes.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const animatedElements = document.querySelectorAll('[data-animate]')

    if (animatedElements.length === 0) return

    if (prefersReducedMotion()) {
      animatedElements.forEach((element) => element.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target
          el.classList.add('is-visible')
          const cleanup = () => {
            el.style.willChange = 'auto'
            el.removeEventListener('transitionend', cleanup)
          }
          el.addEventListener('transitionend', cleanup, { once: true })
          obs.unobserve(el)
        })
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px 10% 0px',
      },
    )

    animatedElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const handleAnchorClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return
      const anchor = event.target.closest('a[href^="#"]')

      if (!anchor) return

      const id = anchor.getAttribute('href')?.slice(1)

      if (!id || !document.getElementById(id)) return

      event.preventDefault()
      setActiveSection(id)
      setIsMobileMenuOpen(false)
      document.body.style.overflow = ''
      window.history.pushState(null, '', `#${id}`)

      window.requestAnimationFrame(() => {
        scrollToSection(id)
      })
    }

    document.addEventListener('click', handleAnchorClick)

    return () => document.removeEventListener('click', handleAnchorClick)
  }, [scrollToSection])

  useEffect(() => {
    const viewport = structureViewportRef.current
    const track = viewport?.querySelector('.structure-track')

    if (!viewport || !track) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          track.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused'
        })
      },
      { rootMargin: '120px' },
    )

    observer.observe(viewport)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const id = window.location.hash.slice(1)

    if (!id || !document.getElementById(id)) return

    window.requestAnimationFrame(() => {
      setActiveSection(id)
      scrollToSection(id, 'auto')
    })
  }, [scrollToSection])

  const handleSectionLinkClick = (event, id) => {
    event.preventDefault()
    setActiveSection(id)
    setIsMobileMenuOpen(false)
    document.body.style.overflow = ''
    window.history.pushState(null, '', `#${id}`)

    window.requestAnimationFrame(() => {
      scrollToSection(id)
    })
  }

  return (
    <div className="site-shell">
      <header className={`topbar ${isTopbarSolid ? 'is-solid' : ''}`}>
        <div className="topbar-inner">
          <a className="brand" href="#principal" aria-label="Ir para o início" onClick={(event) => handleSectionLinkClick(event, 'principal')}>
            <img
              className="brand-logo"
              src={logo}
              alt="Studio 7 Esquadrias"
              width="152"
              height="152"
              decoding="async"
              fetchPriority="high"
            />
          </a>

          <button
            aria-controls="site-nav"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            className={`menu-toggle ${isMobileMenuOpen ? 'is-open' : ''}`}
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            type="button"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`nav-pill ${isMobileMenuOpen ? 'is-open' : ''}`} id="site-nav" aria-label="Navegação principal">
            {navItems.map((item) => (
              <a
                className={activeSection === item.id ? 'is-active' : ''}
                href={`#${item.id}`}
                key={item.id}
                onClick={(event) => handleSectionLinkClick(event, item.id)}
              >
                {item.label}
              </a>
            ))}
          </nav>

        </div>
      </header>

      <main>
        <section className="hero-section" data-section id="principal">
          <OptimizedImage
            className="hero-bg"
            src={images.hero}
            alt=""
            width="1920"
            height="1080"
            sizes="100vw"
            priority
          />
          <div className="hero-scrim"></div>

          <div className="page-container hero-content">
            <p className="section-kicker" data-animate="fade-up">Studio 7 Esquadrias</p>
            <h1 data-animate="fade-up" data-delay="100">Solução em esquadrias</h1>
            <p className="hero-text" data-animate="fade-up" data-delay="200">
              Onde seu projeto ganha vida e é executado com respeito, qualidade e preço justo.
            </p>

            <div className="hero-actions" data-animate="fade-up" data-delay="300">
              <a className="primary-button" href={contact.whatsappUrl} target="_blank" rel="noreferrer">
                Saiba mais
              </a>
              <a className="ghost-button" href="#diferenciais">
                Ver diferenciais
              </a>
            </div>
          </div>
        </section>

        <section ref={aboutRef} className={`about-section ${isAboutVisible ? 'is-visible' : ''}`} data-section id="quem-somos">
          <div className="about-glow" aria-hidden="true"></div>
          <div className="page-container about-grid">
            <div className="about-visual">
              <div className="about-media">
                <div className="about-image-wrap">
                  <OptimizedImage
                    src={images.factory}
                    alt="Estrutura da fábrica Studio 7 Esquadrias"
                    width="1280"
                    height="853"
                    sizes="(min-width: 900px) 50vw, 100vw"
                  />
                </div>
                <div className="about-image-glow" aria-hidden="true"></div>
                <div className="about-badge">
                  <span className="about-badge-number">
                    20<small>+</small>
                  </span>
                  <span className="about-badge-text">anos de experiência no mercado</span>
                </div>
              </div>
              <div className="about-heading">
                <p className="section-kicker">Quem somos</p>
                <h2>Quem somos</h2>
              </div>
            </div>

            <div className="about-content">
              <p className="about-lead">{aboutLead}</p>
              <div className="about-paragraphs">
                {aboutParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="intro-band" data-section id="diferenciais">
          <div className="page-container">
            <h2 data-animate="fade-up">Diferenciais</h2>

            <div className="differentials-grid">
              {differentiators.map((item, index) => (
                <article
                  className="image-card"
                  key={item.title}
                  data-animate="fade-up"
                  data-delay={`${Math.min(100 + index * 100, 400)}`}
                >
                  <OptimizedImage
                    src={item.image}
                    alt=""
                    width="800"
                    height="600"
                    sizes="(min-width: 1100px) 25vw, (min-width: 700px) 50vw, 100vw"
                    responsive={item.responsive}
                  />
                  <div>
                    <h3>{item.title}</h3>
                    <ul>
                      {item.items.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>

            <div className="center-action" data-animate="fade-up" data-delay="200">
              <a className="small-pill" href={contact.whatsappUrl} target="_blank" rel="noreferrer">
                Saiba mais!
              </a>
            </div>
          </div>
        </section>

        <section className="delivery-section" data-section id="estrutura">
          <div className="page-container structure-layout">
            <div className="structure-heading">
              <p className="section-kicker" data-animate="fade-up">Estrutura</p>
              <h2 data-animate="fade-up" data-delay="100">Controle, precisão, personalização e qualidade em cada detalhe.</h2>
            </div>

            <div className="structure-carousel" aria-label="Fotos da estrutura da fábrica Studio 7" data-animate="zoom-soft" data-delay="200">
              <div className="structure-viewport" ref={structureViewportRef} onScroll={normalizeStructureCarousel}>
                <div className="structure-track">
                  {[0, 1].map((setIndex) => (
                    <div className="structure-sequence" aria-hidden={setIndex === 1 ? 'true' : undefined} key={setIndex}>
                      {structureItems.map((item) => (
                        <figure className="structure-slide" key={`${setIndex}-${item.caption}`}>
                          <OptimizedImage
                            src={item.image}
                            alt={setIndex === 0 ? item.alt : ''}
                            width="640"
                            height="400"
                            sizes="(min-width: 1100px) 33vw, (min-width: 700px) 50vw, 80vw"
                            draggable={false}
                          />
                          <figcaption>{item.caption}</figcaption>
                        </figure>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="structure-controls">
                <button
                  className="carousel-arrow prev"
                  type="button"
                  aria-label="Ver foto anterior da estrutura"
                  onClick={() => moveStructureCarousel(-1)}
                >
                  <span aria-hidden="true">←</span>
                </button>
                <button
                  className="carousel-arrow next"
                  type="button"
                  aria-label="Ver próxima foto da estrutura"
                  onClick={() => moveStructureCarousel(1)}
                >
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section ref={processRef} className={`process-section ${isProcessVisible ? 'is-visible' : ''}`} data-section id="funciona">
          <div className="page-container">
            <p className="section-kicker">Como funciona</p>
            <h2>Somos a ferramenta que você procura para acertar o caminho e receber em mãos o diferencial que tanto almeja.</h2>

            <div className="process-map" aria-label="Jornada do cliente Studio 7">
              {processJourney.map((step, index) => (
                <article className="process-step" key={step.title} style={{ '--step-index': index }}>
                  <div className="process-node" aria-hidden="true">
                    <ProcessIcon type={step.icon} />
                  </div>
                  <div className="process-card">
                    <div className="process-card-head">
                      <span>Passo {index + 1}</span>
                    </div>
                    <strong>{step.title}</strong>
                  </div>
                </article>
              ))}
            </div>

            <div className="center-action">
              <a className="small-pill" href={contact.whatsappUrl} target="_blank" rel="noreferrer">
                Saiba mais!
              </a>
            </div>
          </div>
        </section>
        <section className="benefits-section" data-section id="beneficios">
          <div className="page-container benefits-panel">
            <div>
              <p className="section-kicker" data-animate="fade-up">Benefícios</p>
              <h2 data-animate="fade-up" data-delay="100">Benefícios</h2>
              <ul className="main-benefits" data-animate="fade-up" data-delay="200">
                {mainBenefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="benefit-tags" data-animate="fade-up" data-delay="300">
              {benefits.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="projects-section" data-section id="projetos">
          <div className="page-container projects-container">
            <h2 data-animate="fade-up">Projetos</h2>

            <div className="projects-layout">
              <article className="project-photo large" data-animate="zoom-soft" data-delay="100">
                <OptimizedImage
                  src={images.projectA}
                  alt=""
                  width="1280"
                  height="853"
                  sizes="(min-width: 1100px) 66vw, 100vw"
                />
              </article>
              <article className="project-photo" data-animate="zoom-soft" data-delay="200">
                <OptimizedImage
                  src={images.projectB}
                  alt=""
                  width="800"
                  height="600"
                  sizes="(min-width: 1100px) 33vw, (min-width: 700px) 50vw, 100vw"
                />
              </article>
              <article className="project-photo" data-animate="zoom-soft" data-delay="300">
                <OptimizedImage
                  src={images.projectC}
                  alt=""
                  width="800"
                  height="600"
                  sizes="(min-width: 1100px) 33vw, (min-width: 700px) 50vw, 100vw"
                />
              </article>
            </div>

            <div className="line-list">
              {projectLines.map((item, index) => (
                <article
                  key={item.title}
                  data-animate="fade-up"
                  data-delay={`${Math.min(100 + index * 100, 500)}`}
                >
                  <h3>{item.title}</h3>
                  <ul>
                    {item.items.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="partners-section" data-section id="serralheiros">
          <OptimizedImage
            src={images.partners}
            alt=""
            width="1920"
            height="1080"
            sizes="100vw"
            rootMargin="800px"
          />
          <div className="partners-overlay"></div>
          <div className="page-container partners-content">
            <p className="section-kicker" data-animate="fade-up">Parceiros Serralheiros</p>
            <h2 data-animate="fade-up" data-delay="100">Parceiros Serralheiros</h2>
            <p data-animate="fade-up" data-delay="200">
              Executamos também a fabricação das obras de sua empresa.
              Terceirização para quem não tem campo fabril ou para sua empresa que está acima da capacidade produtiva.
            </p>
            <ul className="partners-list" data-animate="fade-up" data-delay="300">
              {partnerItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a className="primary-button" href={contact.whatsappUrl} target="_blank" rel="noreferrer" data-animate="fade-up" data-delay="400">
              Falar com a Studio 7
            </a>
          </div>
        </section>

        <section className="location-section" data-section id="onde-estamos">
          <div className="page-container onde-container">
            <div className="onde-copy">
              <p className="onde-kicker" data-animate="fade-up">Nossa localização</p>
              <h2 className="onde-title" data-animate="fade-up" data-delay="100">Venha conhecer nossa estrutura</h2>

              <div className="endereco-card" data-animate="fade-up" data-delay="200">
                <span>Fábrica Studio 7 Esquadrias</span>
                <p>
                  Av. Anton Von Zuben, 3145 - Jardim São José, Campinas - SP, 13051-145
                </p>
              </div>

              <a
                className="maps-button"
                href="https://www.google.com/maps/search/?api=1&query=Av.+Anton+Von+Zuben,+3145,+Jardim+São+José,+Campinas+-+SP,+13051-145"
                target="_blank"
                rel="noreferrer"
                data-animate="fade-up"
                data-delay="300"
              >
                Abrir no Google Maps
              </a>
            </div>

            <div className="onde-right">
              <div className="mapa-card" aria-label="Mapa da fábrica Studio 7 em Campinas" data-animate="zoom-soft" data-delay="200">
                <DeferredMap />
              </div>

              <figure className="fachada-card" data-animate="zoom-soft" data-delay="300">
                <OptimizedImage
                  src={images.locationFacade}
                  alt="Fachada da fábrica Studio 7 Esquadrias em Campinas"
                  width="640"
                  height="480"
                  sizes="(min-width: 900px) 40vw, 100vw"
                />
              </figure>
            </div>
          </div>
        </section>

        <section className="contact-section" data-section id="contato">
          <div className="contato-container">
            <div className="contato-copy">
              <p className="section-kicker" data-animate="fade-up">CONTATO</p>
              <h2 className="contato-title" data-animate="fade-up" data-delay="100">Fale com a Studio 7</h2>
              <p className="contato-text" data-animate="fade-up" data-delay="200">
                Tire suas dúvidas, solicite um orçamento ou fale com nossa equipe pelos canais abaixo.
              </p>
            </div>

            <div className="contato-cards" aria-label="Canais de contato" data-animate="fade-up" data-delay="200">
              <a className="contato-option contato-option-primary" href={contact.whatsappUrl} target="_blank" rel="noreferrer">
                <span className="contato-option-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M20.2 15.4c-1.4 0-2.7-.2-3.9-.7a1.4 1.4 0 0 0-1.5.3l-1.8 1.8a15.5 15.5 0 0 1-5.8-5.8L9 9.2c.4-.4.5-1 .3-1.5-.4-1.2-.7-2.5-.7-3.9 0-.8-.6-1.4-1.4-1.4H4.3C3.6 2.4 3 3 3 3.8 3 13.3 10.7 21 20.2 21c.8 0 1.4-.6 1.4-1.4v-2.8c0-.8-.6-1.4-1.4-1.4Z" />
                  </svg>
                </span>
                <span className="contato-option-copy">
                  <strong>WhatsApp</strong>
                  <small>Atendimento rápido para orçamentos e dúvidas.</small>
                </span>
                <span className="contato-option-action">Chamar</span>
              </a>

              <a className="contato-option" href={contact.emailUrl}>
                <span className="contato-option-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M4.8 5h14.4c1 0 1.8.8 1.8 1.8v10.4c0 1-.8 1.8-1.8 1.8H4.8c-1 0-1.8-.8-1.8-1.8V6.8C3 5.8 3.8 5 4.8 5Zm7.2 7.2 7-4.7H5l7 4.7Zm0 2.2L5 9.7v7.1h14V9.7l-7 4.7Z" />
                  </svg>
                </span>
                <span className="contato-option-copy">
                  <strong>E-mail</strong>
                  <small>{contact.email}</small>
                </span>
                <span className="contato-option-action">Enviar</span>
              </a>

              <a className="contato-option" href={contact.instagramUrl} target="_blank" rel="noreferrer">
                <span className="contato-option-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm0 2.2A2.8 2.8 0 0 0 5.2 8v8A2.8 2.8 0 0 0 8 18.8h8a2.8 2.8 0 0 0 2.8-2.8V8A2.8 2.8 0 0 0 16 5.2H8Zm4 3.2a3.6 3.6 0 1 1 0 7.2 3.6 3.6 0 0 1 0-7.2Zm0 2.1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm4.2-2.8a1 1 0 1 1 0 2.1 1 1 0 0 1 0-2.1Z" />
                  </svg>
                </span>
                <span className="contato-option-copy">
                  <strong>Instagram</strong>
                  <small>{contact.instagramHandle}</small>
                </span>
                <span className="contato-option-action">Ver perfil</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <a className="floating-whatsapp" href={contact.whatsappUrl} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M20.2 15.4c-1.4 0-2.7-.2-3.9-.7a1.4 1.4 0 0 0-1.5.3l-1.8 1.8a15.5 15.5 0 0 1-5.8-5.8L9 9.2c.4-.4.5-1 .3-1.5-.4-1.2-.7-2.5-.7-3.9 0-.8-.6-1.4-1.4-1.4H4.3C3.6 2.4 3 3 3 3.8 3 13.3 10.7 21 20.2 21c.8 0 1.4-.6 1.4-1.4v-2.8c0-.8-.6-1.4-1.4-1.4Z" />
        </svg>
      </a>

      <SiteFooter />
    </div>
  )
}

function App() {
  const normalizedPath =
    typeof window === 'undefined' ? '' : window.location.pathname.replace(/\/$/, '')

  if (normalizedPath === campaignPath) {
    return <CampaignLandingPage />
  }

  return <HomePage />
}

export default App
