import { useEffect, useState } from 'react'
import logo from './assets/logo.png'
import './App.css'

const WHATSAPP_URL = 'https://wa.me/5519971021432'

const heroSlides = [
  {
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=80',
    label: 'Residencial contemporâneo',
    title: 'Grandes vãos, luz natural e acabamento com leitura arquitetônica limpa.',
    text: 'Esquadrias de alumínio para projetos que valorizam integração visual, conforto e presença.',
    meta: 'Estética, desempenho e proporção',
  },
  {
    image:
      'https://images.unsplash.com/photo-1600047509782-20d39509f26d?auto=format&fit=crop&w=1800&q=80',
    label: 'Integração de ambientes',
    title: 'Aberturas amplas para valorizar paisagem, proporção e continuidade visual.',
    text: 'Soluções que reforçam a arquitetura do projeto com mais luz, leveza e sofisticação.',
    meta: 'Projetos de alto padrão',
  },
  {
    image:
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1800&q=80',
    label: 'Fachadas e detalhes',
    title: 'Linhas limpas e encontros precisos para obras que pedem acabamento superior.',
    text: 'Mais elegância visual, presença contemporânea e percepção de valor em cada detalhe.',
    meta: 'Precisão e acabamento',
  },
]

const authorityCards = [
  {
    title: 'Mais impacto na leitura do projeto',
    text: 'Esquadrias que valorizam fachadas, ampliam a entrada de luz e reforçam a elegância da arquitetura.',
  },
  {
    title: 'Desempenho com acabamento preciso',
    text: 'Soluções pensadas para unir vedação, funcionamento consistente e percepção real de qualidade.',
  },
  {
    title: 'Integração entre estética e técnica',
    text: 'Cada composição é direcionada para responder ao uso do ambiente sem perder proporção e presença visual.',
  },
]

const differentiators = [
  {
    number: '01',
    title: 'Estética alinhada à arquitetura',
    text: 'Perfis, modulações e composições que favorecem fachadas mais limpas e ambientes mais elegantes.',
  },
  {
    number: '02',
    title: 'Precisão e desempenho',
    text: 'Leitura técnica para unir visual, funcionamento consistente e sensação de qualidade percebida.',
  },
  {
    number: '03',
    title: 'Personalização do projeto',
    text: 'Cada demanda pode ser direcionada conforme tipologia, abertura, proporção e uso da obra.',
  },
  {
    number: '04',
    title: 'Valor para clientes corporativos',
    text: 'Apresentação comercial mais sólida para empresas que precisam transmitir confiança e alto padrão.',
  },
]

const projectShowcase = [
  {
    image:
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=80',
    title: 'Fachadas com leitura contemporânea',
    text: 'Planos mais limpos, esquadrias proporcionais e presença visual à altura do projeto.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1600&q=80',
    title: 'Ambientes integrados',
    text: 'Mais luz, amplitude e transição entre interior e exterior com sofisticação.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80',
    title: 'Projetos especiais sob medida',
    text: 'Soluções para obras que pedem diferenciação estética e clareza técnica na execução.',
  },
]

const whyChoose = [
  'Percepção de marca mais premium para apresentar o negócio.',
  'Argumentação comercial mais clara para empresas e especificadores.',
  'Foco em imagens de arquitetura e aplicações reais.',
  'Layout pensado para escaneabilidade e conversão via WhatsApp.',
  'Design sofisticado sem perder objetividade comercial.',
  'Estrutura preparada para troca simples de imagens, textos e links.',
]

const processSteps = [
  {
    step: '01',
    title: 'Entendimento da demanda',
    text: 'Recebemos o contexto da obra, perfil do projeto e necessidade comercial para direcionar a solução.',
  },
  {
    step: '02',
    title: 'Leitura técnica e proposta',
    text: 'Organizamos as informações com foco em tipologia, estética, abertura, desempenho e apresentação.',
  },
  {
    step: '03',
    title: 'Atendimento e continuidade',
    text: 'O contato avança com mais clareza, confiança e alinhamento entre expectativa e proposta.',
  },
]

const testimonials = [
  {
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    quote:
      'Atendimento claro, ótima leitura do projeto e uma apresentação muito alinhada ao padrão que precisávamos entregar ao cliente final.',
    name: 'Mariana Costa',
    role: 'Coordenadora comercial',
    stars: 5,
  },
  {
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    quote:
      'A percepção de valor sobe quando a solução combina estética, proporção e segurança técnica. O material transmite exatamente isso.',
    name: 'Ricardo Almeida',
    role: 'Gestor de obras',
    stars: 5,
  },
  {
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    quote:
      'Gostei da forma como os diferenciais foram apresentados. A comunicação ficou sofisticada, objetiva e muito mais confiável.',
    name: 'Patrícia Nogueira',
    role: 'Diretora de atendimento',
    stars: 5,
  },
]

const faqItems = [
  {
    question: 'A Studio 7 atende apenas Campinas e região?',
    answer:
      'Campinas/SP é a base de atuação da marca, mas este texto pode ser ajustado conforme a área real de atendimento da empresa.',
  },
  {
    question: 'Quais tipos de projeto combinam com a proposta da marca?',
    answer:
      'Projetos corporativos, residenciais sofisticados, fachadas, grandes aberturas e demandas que valorizam estética, acabamento e leitura técnica.',
  },
  {
    question: 'Posso solicitar atendimento direto pelo WhatsApp?',
    answer:
      'Sim. O principal objetivo da landing é levar o visitante para uma conversa direta, rápida e objetiva pelo WhatsApp.',
  },
  {
    question: 'Os textos e imagens podem ser personalizados depois?',
    answer:
      'Sim. A estrutura foi organizada para facilitar a troca de imagens, títulos, depoimentos, FAQ e links sem retrabalho grande.',
  },
]

const stats = [
  { value: 'Alto padrão', label: 'Estética e acabamento' },
  { value: 'Campinas/SP', label: 'Atendimento direto' },
  { value: 'Alumínio', label: 'Precisão e desempenho' },
]

const navItems = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'diferenciais', label: 'Diferenciais' },
  { id: 'aplicacoes', label: 'Aplicações' },
  { id: 'processo', label: 'Processo' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contato', label: 'Contato' },
]

function App() {
  const [isTopbarSolid, setIsTopbarSolid] = useState(false)
  const [activeSection, setActiveSection] = useState('sobre')
  const [activeHeroSlide, setActiveHeroSlide] = useState(0)
  const [previousHeroSlide, setPreviousHeroSlide] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const items = document.querySelectorAll('[data-reveal]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -4% 0px',
      },
    )

    items.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsTopbarSolid(window.scrollY > 28)
    }

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
        threshold: [0.2, 0.4, 0.6],
        rootMargin: '-20% 0px -55% 0px',
      },
    )

    sectionNodes.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (mediaQuery.matches) {
      return undefined
    }

    const interval = window.setInterval(() => {
      setActiveHeroSlide((current) => {
        setPreviousHeroSlide(current)
        return (current + 1) % heroSlides.length
      })
    }, 5200)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    if (previousHeroSlide === null) {
      return undefined
    }

    const timeout = window.setTimeout(() => {
      setPreviousHeroSlide(null)
    }, 1600)

    return () => window.clearTimeout(timeout)
  }, [previousHeroSlide])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 820) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="page-shell">
      <header className={`topbar ${isTopbarSolid ? 'topbar-solid' : ''} ${isMobileMenuOpen ? 'topbar-open' : ''}`}>
        <div className="topbar-inner">
          <a className="brand" href="#top" aria-label="Studio 7 Esquadrias">
            <img className="brand-logo" src={logo} alt="Studio 7 Esquadrias" />
            <div className="brand-copy">
              <strong>Studio 7</strong>
              <span>Esquadrias premium</span>
            </div>
          </a>

          <button
            aria-controls="mobile-nav"
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

          <nav className="nav nav-desktop" aria-label="Navegação principal">
            {navItems.map((item) => (
              <a
                className={activeSection === item.id ? 'is-active' : ''}
                href={`#${item.id}`}
                key={item.id}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a className="nav-cta" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            Falar no WhatsApp
          </a>
        </div>

        <div className={`mobile-nav-shell ${isMobileMenuOpen ? 'is-open' : ''}`}>
          <div className="mobile-nav-backdrop" onClick={() => setIsMobileMenuOpen(false)}></div>

          <div className="mobile-nav-panel" id="mobile-nav">
            <nav className="mobile-nav" aria-label="Navegação mobile">
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

            <a
              className="mobile-nav-cta"
              href={WHATSAPP_URL}
              onClick={() => setIsMobileMenuOpen(false)}
              rel="noreferrer"
              target="_blank"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <div className="page-container">
          <section className="hero" data-section id="hero">
            <div className="hero-copy">
              <p className="eyebrow" data-reveal="up">
                Studio 7 Esquadrias . Campinas/SP
              </p>
              <h1 data-reveal="up">
                Esquadrias de alumínio para projetos de alto padrão.
              </h1>
              <p className="hero-text" data-reveal="up">
                Soluções para fachadas, grandes aberturas e ambientes integrados, com acabamento
                premium, desempenho técnico e integração arquitetônica.
              </p>

              <div className="hero-actions" data-reveal="up">
                <a className="primary-cta hero-primary-cta" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                  Falar no WhatsApp
                </a>
                <a className="secondary-cta" href="#aplicacoes">
                  Ver projetos
                </a>
              </div>

              <p className="hero-proof" data-reveal="up">
                Atendimento direto para alinhar a demanda e avançar com clareza comercial.
              </p>

              <div className="hero-stats" data-reveal="up">
                {stats.map((item) => (
                  <article className="hero-stat" key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </article>
                ))}
              </div>
            </div>

            <div className="hero-visual" aria-hidden="true" data-reveal="right">
              <div className="hero-image-wrap">
                <div className="hero-image-stage">
                  {heroSlides.map((slide, index) => {
                    const isActive = index === activeHeroSlide
                    const isPrevious = index === previousHeroSlide

                    return (
                      <div
                        className={`hero-slide ${isActive ? 'is-active' : ''} ${isPrevious ? 'is-previous' : ''}`}
                        key={slide.image}
                      >
                        <img className="hero-image" src={slide.image} alt="" />
                      </div>
                    )
                  })}
                  <div className="hero-image-grid"></div>
                  <div className="hero-image-glow"></div>
                </div>

                <div className="hero-image-fade"></div>

                <div className="panel-caption">
                  <span>{heroSlides[activeHeroSlide].label}</span>
                  <strong>{heroSlides[activeHeroSlide].title}</strong>
                  <p>{heroSlides[activeHeroSlide].text}</p>
                  <small>{heroSlides[activeHeroSlide].meta}</small>
                </div>

                <div className="hero-progress" aria-hidden="true">
                  {heroSlides.map((slide, index) => (
                    <span
                      className={`hero-progress-dot ${index === activeHeroSlide ? 'is-active' : ''}`}
                      key={slide.image}
                    ></span>
                  ))}
                </div>
              </div>

              <div className="panel-caption panel-caption-mobile">
                <span>{heroSlides[activeHeroSlide].label}</span>
                <strong>{heroSlides[activeHeroSlide].title}</strong>
                <p>{heroSlides[activeHeroSlide].text}</p>
                <small>{heroSlides[activeHeroSlide].meta}</small>
              </div>
            </div>
          </section>

          <section className="authority-section" data-section id="sobre">
            <div className="authority-intro">
              <div className="authority-copy section-head-clear" data-reveal="up">
                <p className="eyebrow">Posicionamento</p>
                <h2>Esquadrias que elevam a arquitetura e reforçam o valor percebido do projeto.</h2>
                <p>
                  Soluções em alumínio para obras que pedem linhas limpas, acabamento superior,
                  desempenho técnico e integração visual com a proposta arquitetônica.
                </p>
              </div>

              <div className="authority-aside" aria-hidden="true" data-reveal="right">
                <div className="authority-aside-panel">
                  <span className="authority-aside-label">Arquitetura contemporânea</span>
                  <strong>Estética, precisão e presença visual em equilíbrio.</strong>
                  <p>
                    Soluções que respondem à proposta do projeto com linhas limpas, proporção bem
                    resolvida e desempenho técnico percebido no uso.
                  </p>
                </div>
              </div>
            </div>

            <div className="authority-grid">
              {authorityCards.map((item) => (
                <article className="authority-card" data-reveal="up" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section-panel differentiators-section" data-section id="diferenciais">
            <div className="section-head section-head-clear" data-reveal="up">
              <p className="eyebrow">Diferenciais</p>
              <h2>Design, engenharia e apresentação comercial no mesmo nível de exigência.</h2>
            </div>

            <div className="differentiators-grid">
              {differentiators.map((item) => (
                <article className="differential-card" data-reveal="up" key={item.title}>
                  <span className="card-kicker">{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section-panel applications-section" data-section id="aplicacoes">
            <div className="section-head section-head-clear" data-reveal="up">
              <p className="eyebrow">Aplicações</p>
              <h2>Imagens grandes, arquitetura contemporânea e composições que vendem atmosfera.</h2>
            </div>

            <div className="projects-grid">
              {projectShowcase.map((item, index) => (
                <article
                  className={`project-card ${index === 0 ? 'project-card-featured' : ''}`}
                  data-reveal={index % 2 === 0 ? 'left' : 'right'}
                  key={item.title}
                >
                  <img src={item.image} alt="" />
                  <div className="project-card-overlay">
                    <span>{index === 0 ? 'Projeto editorial' : 'Aplicação'}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="section-panel reasons-section">
            <div className="reasons-copy section-head-clear" data-reveal="left">
              <p className="eyebrow">Por que escolher</p>
              <h2>Uma estrutura pensada para escaneabilidade, impacto visual e ação comercial.</h2>
              <p>
                Cada bloco ajuda o visitante a entender rapidamente o posicionamento da marca, o
                tipo de obra atendida e o próximo passo para iniciar uma conversa.
              </p>
            </div>

            <div className="reasons-list" data-reveal="right">
              {whyChoose.map((item) => (
                <article className="reason-item" key={item}>
                  <span className="reason-bullet"></span>
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section-panel process-section" data-section id="processo">
            <div className="section-head section-head-clear process-head" data-reveal="up">
              <p className="eyebrow">Processo</p>
              <h2>Um caminho simples, elegante e claro até o contato comercial.</h2>
            </div>

            <div className="process-grid">
              {processSteps.map((item) => (
                <article className="process-card" data-reveal="up" key={item.step}>
                  <span className="process-number">{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section-panel testimonials-section">
            <div className="section-head section-head-clear" data-reveal="up">
              <p className="eyebrow">Prova social</p>
              <h2>Espaço para reforçar confiança com depoimentos reais de clientes e parceiros.</h2>
              <p>
                Para manter credibilidade, os textos abaixo estão preparados como placeholders bem
                identificados e podem ser substituídos pelos depoimentos oficiais da empresa.
              </p>
            </div>

            <div className="testimonials-grid">
              {testimonials.map((item) => (
                <article className="testimonial-card" data-reveal="up" key={item.name + item.role}>
                  <div className="testimonial-head">
                    <img className="testimonial-avatar" src={item.image} alt={item.name} />
                    <div className="testimonial-meta">
                      <strong>{item.name}</strong>
                      <span>{item.role}</span>
                    </div>
                  </div>
                  <div className="testimonial-stars" aria-label={`${item.stars} de 5 estrelas`}>
                    {'★'.repeat(item.stars)}
                  </div>
                  <p className="testimonial-quote">{item.quote}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section-panel faq-section" data-section id="faq">
            <div className="section-head section-head-clear" data-reveal="up">
              <p className="eyebrow">FAQ</p>
              <h2>Dúvidas comuns antes de solicitar atendimento.</h2>
            </div>

            <div className="faq-list" data-reveal="up">
              {faqItems.map((item) => (
                <details className="faq-item" key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="section-panel final-cta" data-section id="contato">
            <div className="final-cta-copy section-head-clear" data-reveal="left">
              <p className="eyebrow">Contato</p>
              <h2>Se a sua empresa quer transmitir mais valor, o próximo passo é abrir a conversa.</h2>
              <p>
                Uma landing premium só faz sentido quando conduz o visitante para uma ação clara.
                Aqui, o caminho principal é o WhatsApp, com abordagem direta e comercialmente
                objetiva.
              </p>
            </div>

            <div className="final-cta-panel" data-reveal="right">
              <span>Canal principal de conversão</span>
              <strong>Falar no WhatsApp</strong>
              <p>Atendimento direto para alinhamento comercial, apresentação e solicitação de orçamento.</p>
              <a className="primary-cta final-cta-button" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                Solicitar orçamento
              </a>
            </div>
          </section>
        </div>
      </main>

      <footer className="site-footer">
        <div className="page-container footer-inner">
          <div className="footer-brand">
            <img className="brand-logo" src={logo} alt="Studio 7 Esquadrias" />
            <div>
              <strong>Studio 7 Esquadrias</strong>
              <p>Esquadrias de alumínio . Campinas/SP . Atendimento comercial via WhatsApp</p>
            </div>
          </div>

          <div className="footer-links">
            <a href="#sobre">Sobre</a>
            <a href="#aplicacoes">Aplicações</a>
            <a href="#faq">FAQ</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
