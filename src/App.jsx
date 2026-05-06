import { useEffect, useRef, useState } from 'react'
import './App.css'

const logo = '/logo_0.png'

const contact = {
  whatsappLabel: '+55 19 97102-1432',
  whatsappUrl:
    'https://wa.me/5519971021432?text=Ol%C3%A1%2C%20vim%20do%20site%20e%20quero%20falar%20sobre%20um%20projeto%20de%20esquadrias.',
  email: 'contato@studio7esquadrias.com.br',
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

const aboutText = [
  'Somos uma empresa especializada na fabricação de esquadrias de alumínio sob demanda e personalizadas.',
  'Aqui você produz suas peças de acordo com seu projeto, tendo total autonomia para comprar seus próprios materiais e apenas utilizar de nossa estrutura de ponta e nossos profissionais capacitados para fazer tudo como sempre sonhou.',
  'Com mais de 20 anos de experiência, estamos prontos para te auxiliar e garantir uma produção certa e justa, dando possibilidades de fazer suas instalações de maneira independente e administrar o tempo de acordo com suas necessidades.',
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

function ProcessIcon({ type }) {
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
}
function App() {
  const [isTopbarSolid, setIsTopbarSolid] = useState(false)
  const [activeSection, setActiveSection] = useState(navItems[0].id)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const structureViewportRef = useRef(null)

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
    const handleScroll = () => setIsTopbarSolid(window.scrollY > 24)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sectionNodes = document.querySelectorAll('[data-section]')

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id)
        }
      },
      {
        threshold: [0.22, 0.42, 0.62],
        rootMargin: '-18% 0px -56% 0px',
      },
    )

    sectionNodes.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const handleContactSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') || 'Visitante'
    const phone = formData.get('phone') || 'não informado'
    const project = formData.get('project') || 'projeto de esquadrias'
    const message = `Olá, sou ${name}. Meu WhatsApp é ${phone}. Quero falar sobre: ${project}.`

    window.open(`https://wa.me/5519971021432?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
    event.currentTarget.reset()
  }

  return (
    <div className="site-shell">
      <header className={`topbar ${isTopbarSolid ? 'is-solid' : ''}`}>
        <div className="topbar-inner">
          <a className="brand" href="#principal" aria-label="Ir para o início">
            <img className="brand-logo" src={logo} alt="Studio 7 Esquadrias" />
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
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>

        </div>
      </header>

      <main>
        <section className="hero-section" data-section id="principal">
          <img className="hero-bg" src={images.hero} alt="" />
          <div className="hero-scrim"></div>

          <div className="page-container hero-content">
            <p className="section-kicker">Studio 7 Esquadrias</p>
            <h1>Solução em esquadrias</h1>
            <p className="hero-text">
              Onde seu projeto ganha vida e é executado com respeito, qualidade e preço justo.
            </p>

            <div className="hero-actions">
              <a className="primary-button" href={contact.whatsappUrl} target="_blank" rel="noreferrer">
                Saiba mais
              </a>
              <a className="ghost-button" href="#diferenciais">
                Ver diferenciais
              </a>
            </div>
          </div>
        </section>

        <section className="about-section" data-section id="quem-somos">
          <div className="page-container split-section">
            <div>
              <p className="section-kicker">Quem somos</p>
              <h2>Quem somos</h2>
            </div>

            <div className="text-stack">
              {aboutText.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="sponsored-section">
          <div className="page-container sponsored-panel">
            <h2>Cansado de correr atrás de uma empresa séria para realizar o sonho de suas esquadrias?</h2>
            <p>
              A Studio 7 tem a solução para sua obra se transformar no sonho que tanto idealizou.
              Aqui você encontra qualidade, preço justo e garantia de entrega.
            </p>
          </div>
        </section>

        <section className="intro-band" data-section id="diferenciais">
          <div className="page-container">
            <h2>Diferenciais</h2>

            <div className="differentials-grid">
              {differentiators.map((item) => (
                <article className="image-card" key={item.title}>
                  <img src={item.image} alt="" />
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

            <div className="center-action">
              <a className="small-pill" href={contact.whatsappUrl} target="_blank" rel="noreferrer">
                Saiba mais!
              </a>
            </div>
          </div>
        </section>

        <section className="delivery-section" data-section id="estrutura">
          <div className="page-container structure-layout">
            <div className="structure-heading">
              <p className="section-kicker">Estrutura</p>
              <h2>Controle, precisão, personalização e qualidade em cada detalhe.</h2>
            </div>

            <div className="structure-carousel" aria-label="Fotos da estrutura da fábrica Studio 7">
              <div className="structure-viewport" ref={structureViewportRef} onScroll={normalizeStructureCarousel}>
                <div className="structure-track">
                  {[0, 1].map((setIndex) => (
                    <div className="structure-sequence" aria-hidden={setIndex === 1 ? 'true' : undefined} key={setIndex}>
                      {structureItems.map((item) => (
                        <figure className="structure-slide" key={`${setIndex}-${item.caption}`}>
                          <img src={item.image} alt={setIndex === 0 ? item.alt : ''} draggable="false" />
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

        <section className={`process-section ${activeSection === 'funciona' ? 'is-visible' : ''}`} data-section id="funciona">
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
              <p className="section-kicker">Benefícios</p>
              <h2>Benefícios</h2>
              <ul className="main-benefits">
                {mainBenefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="benefit-tags">
              {benefits.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="projects-section" data-section id="projetos">
          <div className="page-container">
            <h2>Projetos</h2>

            <div className="projects-layout">
              <article className="project-photo large">
                <img src={images.projectA} alt="" />
              </article>
              <article className="project-photo">
                <img src={images.projectB} alt="" />
              </article>
              <article className="project-photo">
                <img src={images.projectC} alt="" />
              </article>
            </div>

            <div className="line-list">
              {projectLines.map((item) => (
                <article key={item.title}>
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
          <img src={images.partners} alt="" />
          <div className="partners-overlay"></div>
          <div className="page-container partners-content">
            <p className="section-kicker">Parceiros Serralheiros</p>
            <h2>Parceiros Serralheiros</h2>
            <p>
              Executamos também a fabricação das obras de sua empresa.
              Terceirização para quem não tem campo fabril ou para sua empresa que está acima da capacidade produtiva.
            </p>
            <ul className="partners-list">
              {partnerItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a className="primary-button" href={contact.whatsappUrl} target="_blank" rel="noreferrer">
              Falar com a Studio 7
            </a>
          </div>
        </section>

        <section className="location-section" data-section id="onde-estamos">
          <div className="page-container split-section">
            <div>
              <p className="section-kicker">Onde estamos</p>
              <h2>Onde estamos</h2>
            </div>

            <div className="contact-strip">
              <a href={contact.whatsappUrl} target="_blank" rel="noreferrer">
                {contact.whatsappLabel}
              </a>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <span>{contact.location}</span>
            </div>
          </div>
        </section>

        <section className="contact-section" data-section id="contato">
          <div className="page-container contact-layout">
            <div>
              <p className="section-kicker">Contato</p>
              <h2>Contato</h2>
            </div>

            <form className="contact-form" onSubmit={handleContactSubmit}>
              <label>
                Nome
                <input name="name" placeholder="Seu nome" required />
              </label>
              <label>
                WhatsApp
                <input name="phone" placeholder="Seu telefone" required />
              </label>
              <label>
                Projeto
                <textarea name="project" placeholder="Conte rapidamente o que você precisa" rows="4"></textarea>
              </label>
              <button type="submit">Enviar pelo WhatsApp</button>
            </form>
          </div>
        </section>
      </main>

      <a className="floating-whatsapp" href={contact.whatsappUrl} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M20.2 15.4c-1.4 0-2.7-.2-3.9-.7a1.4 1.4 0 0 0-1.5.3l-1.8 1.8a15.5 15.5 0 0 1-5.8-5.8L9 9.2c.4-.4.5-1 .3-1.5-.4-1.2-.7-2.5-.7-3.9 0-.8-.6-1.4-1.4-1.4H4.3C3.6 2.4 3 3 3 3.8 3 13.3 10.7 21 20.2 21c.8 0 1.4-.6 1.4-1.4v-2.8c0-.8-.6-1.4-1.4-1.4Z" />
        </svg>
      </a>

      <footer className="site-footer">
        <div className="page-container footer-inner">
          <img src={logo} alt="Studio 7 Esquadrias" />
          <p>Studio 7 Esquadrias. Solução em esquadrias.</p>
          <div className="footer-links">
            <a href="#principal">Principal</a>
            <a href="#quem-somos">Quem somos</a>
            <a href="#diferenciais">Diferenciais</a>
            <a href="#contato">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
