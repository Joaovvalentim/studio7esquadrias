import { useEffect, useRef, useState } from 'react'
import logo from './assets/logo1.png'
import './App.css'

const contact = {
  whatsappLabel: '+55 19 97102-1432',
  whatsappUrl:
    'https://wa.me/5519971021432?text=Ol%C3%A1%2C%20vim%20do%20site%20e%20quero%20falar%20sobre%20um%20projeto%20de%20esquadrias.',
  email: 'contato@studio7esquadrias.com.br',
  location: 'Campinas/SP',
}

const images = {
  hero:
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=85',
  factory:
    'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1200&q=80',
  showroom:
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80',
  support:
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
  installation:
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
  projectA:
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80',
  projectB:
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=80',
  projectC:
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80',
  partners:
    'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1600&q=80',
}

const navItems = [
  { id: 'principal', label: 'Principal' },
  { id: 'diferenciais', label: 'Diferenciais' },
  { id: 'estrutura', label: 'Estrutura' },
  { id: 'funciona', label: 'Como funciona' },
  { id: 'beneficios', label: 'Benefícios' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'serralheiros', label: 'Parceiros' },
  { id: 'onde-estamos', label: 'Onde estamos' },
  { id: 'contato', label: 'Fale conosco' },
]

const differentiators = [
  {
    image: images.factory,
    title: 'Fábrica com equipamento de ponta',
    items: ['Suporte técnico', 'Produção inteligente e eficiente'],
  },
  {
    image: images.showroom,
    title: 'Showroom e atendimento consultivo',
    items: ['Projetos diversos e personalizados', 'Acompanhamento próximo'],
  },
  {
    image: images.support,
    title: 'Atendimento personalizado',
    items: ['Cada cliente escolhe seu tipo de atendimento', 'Adequação para cada obra'],
  },
  {
    image: images.installation,
    title: 'Instalação com parceiros capacitados',
    items: ['Listas exclusivas', 'Parceiros qualificados'],
  },
]

const structureItems = [
  {
    image: images.factory,
    caption: 'Linha de produção estruturada',
    alt: 'Linha de produção industrial com equipamentos e bancadas de trabalho organizadas',
  },
  {
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=82',
    caption: 'Controle de qualidade em cada etapa',
    alt: 'Profissional inspecionando peças em ambiente de fábrica com controle técnico',
  },
  {
    image: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=1400&q=82',
    caption: 'Precisão nos acabamentos',
    alt: 'Detalhe de maquinário industrial usado para acabamentos precisos em perfis metálicos',
  },
  {
    image: images.partners,
    caption: 'Infraestrutura própria para alto padrão',
    alt: 'Área fabril ampla com estrutura produtiva preparada para projetos de alto padrão',
  },
]

const processJourney = [
  {
    icon: 'phone',
    title: 'Cliente entra em contato',
    text: 'Entendemos sua necessidade e coletamos as informações iniciais.',
  },
  {
    icon: 'analysis',
    title: 'Análise técnica',
    text: 'Avaliamos medidas, ambiente e viabilidade do projeto.',
  },
  {
    icon: 'measure',
    title: 'Adequação do projeto',
    text: 'Ajustamos o projeto conforme a necessidade da obra.',
  },
  {
    icon: 'logistics',
    title: 'Detalhes e logística',
    text: 'Alinhamos prazos, materiais e logística de entrega.',
  },
  {
    icon: 'factory',
    title: 'Produção',
    text: 'A fabricação segue controle, precisão e padrão de qualidade.',
  },
  {
    icon: 'delivery',
    title: 'Entrega final',
    text: 'O produto chega pronto para valorizar o empreendimento.',
  },
]

const benefits = [
  'Atendimento exclusivo',
  'Orçamento correto',
  'Contrato e faturamento direto',
  'Suporte na compra de materiais',
  'Apoio direto ao cliente',
  'Infraestrutura personalizada',
]

const projectLines = [
  { title: 'Linhas econômicas e cotidianas', text: 'Soluções objetivas para obras com bom custo e execução clara.' },
  { title: 'Linhas robustas e pesadas', text: 'Perfis mais fortes para projetos que exigem presença e desempenho.' },
  { title: 'Linhas premium e vãos maiores', text: 'Acabamento superior, leitura arquitetônica e diferenciação visual.' },
  { title: 'Linhas modernas e minimalistas', text: 'Opções como chumbada, aura e outras linhas de aparência limpa.' },
  { title: 'Linhas personalizadas', text: 'Soluções sob medida para necessidades específicas da obra.' },
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
            <div className="brand-copy">
              <strong>Studio 7</strong>
              <span>Esquadrias premium</span>
            </div>
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
            <h1>Soluções sob medida em esquadrias</h1>
            <p className="hero-text">
              Onde seu projeto é executado com respeito, qualidade e preço justo. A Studio 7 entrega
              soluções em alumínio para transformar o sonho da obra em uma execução clara e confiável.
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

        <section className="intro-band" data-section id="diferenciais">
          <div className="page-container">
            <h2>Nossos Diferenciais</h2>

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
              <p className="section-kicker">Nossa Estrutura</p>
              <h2>Controle, precisão e qualidade em cada detalhe.</h2>
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

        <section className="process-section" data-section id="funciona">
          <div className="page-container">
            <p className="section-kicker">COMO FUNCIONA</p>
            <h2>Do primeiro contato à entrega, cada etapa segue um processo claro.</h2>
            <p className="section-lead">Uma jornada guiada para transformar necessidade, projeto e logística em esquadrias prontas para a obra.</p>

            <div className="process-map" aria-label="Jornada do cliente Studio 7">
              {processJourney.map((step, index) => (
                <article className="process-step" key={step.title} style={{ '--step-index': index }}>
                  <div className="process-node" aria-hidden="true">
                    <ProcessIcon type={step.icon} />
                  </div>
                  <div className="process-card">
                    <div className="process-card-head">
                      <span>Etapa {index + 1}</span>
                    </div>
                    <strong>{step.title}</strong>
                    <p>{step.text}</p>
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
              <h2>Produtividade e qualidade</h2>
              <p>Você recebe peças prontas e com acabamento superior.</p>
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
            <h2>Projetos Studio 7</h2>
            <p className="section-lead">Linhas e soluções para obras residenciais, corporativas e serralherias parceiras.</p>

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
                  <p>{item.text}</p>
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
            <h2>Fabricamos para quem precisa de campo fabril e prazo previsível.</h2>
            <p>
              Executamos a fabricação das obras de sua serralheria, ajudando empresas que não possuem
              estrutura fabril ou que estão acima da capacidade produtiva.
            </p>
            <a className="primary-button" href={contact.whatsappUrl} target="_blank" rel="noreferrer">
              Falar com a Studio 7
            </a>
          </div>
        </section>

        <section className="location-section" data-section id="onde-estamos">
          <div className="page-container split-section">
            <div>
              <p className="section-kicker">Onde Estamos</p>
              <h2>Atendimento na região de Campinas e alinhamento direto pelo WhatsApp.</h2>
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
              <p className="section-kicker">Fale Conosco</p>
              <h2>Envie o contexto da sua obra e seguimos a conversa pelo WhatsApp.</h2>
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
          <p>Studio 7 Esquadrias. Soluções sob medida para obras que exigem qualidade e precisão.</p>
          <div className="footer-links">
            <a href="#principal">Principal</a>
            <a href="#diferenciais">Diferenciais</a>
            <a href="#contato">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
