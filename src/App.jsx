import { useEffect } from 'react'
import logo from './assets/logo.png'
import './App.css'

const points = [
  'Grandes vãos, linhas leves e presença arquitetônica.',
  'Alumínio com leitura técnica, precisão e acabamento superior.',
  'Soluções para residências, fachadas e projetos autorais.',
]

const carouselImages = [
  'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1400&q=80',
]

const applications = [
  {
    title: 'Residências de alto padrão',
    text: 'Esquadrias amplas para integrar luz natural, conforto e leveza visual.',
  },
  {
    title: 'Fachadas e panos de vidro',
    text: 'Composições com presença contemporânea e leitura arquitetônica mais limpa.',
  },
  {
    title: 'Projetos sob medida',
    text: 'Soluções técnicas para diferentes aberturas, dimensões e exigências estéticas.',
  },
]

const performancePoints = [
  {
    title: 'Linhas mais finas',
    text: 'Perfis que favorecem amplitude visual e valorizam a arquitetura do ambiente.',
  },
  {
    title: 'Desempenho e vedação',
    text: 'Leitura técnica para conforto, segurança e funcionamento consistente.',
  },
  {
    title: 'Acabamento superior',
    text: 'Mais precisão nos encontros, ferragens e detalhes percebidos no uso diário.',
  },
]

const processSteps = [
  {
    number: '01',
    title: 'Leitura do projeto',
    text: 'Entendemos o vão, a proposta arquitetônica e o resultado estético esperado.',
  },
  {
    number: '02',
    title: 'Definição da solução',
    text: 'Direcionamos tipologia, abertura, modulação e linguagem visual das esquadrias.',
  },
  {
    number: '03',
    title: 'Execução e entrega',
    text: 'Acompanhamos o processo com foco em acabamento, precisão e presença final.',
  },
]

function App() {
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
        threshold: 0.16,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    items.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="#top">
            <img className="brand-logo" src={logo} alt="Studio7" />
            <div className="brand-copy">
              <strong>Studio7</strong>
              <span>Esquadrias Premium</span>
            </div>
          </a>

          <nav className="nav" aria-label="Navegacao principal">
            <a href="#sobre">Sobre</a>
            <a href="#aplicacoes">Aplicacoes</a>
            <a href="#desempenho">Desempenho</a>
            <a href="#contato">Contato</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <div className="page-container">
          <section className="hero">
            <div className="hero-copy" data-reveal="up">
              <p className="eyebrow" data-reveal="up">Studio7 Esquadrias</p>
              <h1 data-reveal="up">Elegancia tecnica para projetos de alto padrao.</h1>
              <p className="hero-text" data-reveal="up">
                Uma presenca visual mais sofisticada, com profundidade, precisao e linguagem
                premium alinhada a sua marca.
              </p>

              <div className="hero-actions" data-reveal="up">
                <a className="primary-cta" href="#contato" data-reveal="up">
                  Solicitar atendimento
                </a>
                <span className="hero-note" data-reveal="up">
                  Arquitetura, residencias e projetos especiais
                </span>
              </div>
            </div>

            <div className="hero-visual" aria-hidden="true" data-reveal="right">
              <div className="hero-image-wrap" data-reveal="right">
                <img
                  className="hero-image"
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80"
                  alt=""
                />
                <div className="hero-image-fade"></div>
                <div className="panel-caption">
                  <span>Projeto em destaque</span>
                  <strong>Linhas amplas, luz natural e acabamento refinado.</strong>
                </div>
              </div>
            </div>
          </section>

          <section className="values" id="sobre">
            {points.map((item) => (
              <article className="value-card" key={item} data-reveal="up">
                <p>{item}</p>
              </article>
            ))}
          </section>

          <section className="showcase-section" id="aplicacoes">
            <div className="showcase-visual" data-reveal="left">
              <img
                src="https://images.unsplash.com/photo-1600047509782-20d39509f26d?auto=format&fit=crop&w=1400&q=80"
                alt=""
              />
            </div>

            <div className="showcase-copy" data-reveal="right">
              <p className="eyebrow" data-reveal="up">Aplicacoes</p>
              <h2 data-reveal="up">Esquadrias de alumínio para projetos que pedem abertura, luz e refinamento.</h2>
              <p data-reveal="up">
                O site precisa comunicar a mesma sensação do produto: elegância técnica,
                proporção correta e acabamento percebido em cada detalhe.
              </p>

              <div className="applications-grid">
                {applications.map((item) => (
                  <article className="application-card" key={item.title} data-reveal="up">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="performance-section" id="desempenho">
            <div className="section-head" data-reveal="up">
              <p className="eyebrow" data-reveal="up">Desempenho</p>
              <h2 data-reveal="up">Mais do que estética, uma solução que também comunica técnica e segurança.</h2>
            </div>

            <div className="performance-grid">
              {performancePoints.map((item) => (
                <article className="performance-card" key={item.title} data-reveal="up">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="carousel-section">
            <div className="section-head carousel-head" data-reveal="up">
              <p className="eyebrow" data-reveal="up">Atmosfera</p>
              <h2 data-reveal="up">Uma vitrine em movimento para deixar a pagina mais viva, leve e contemporanea.</h2>
            </div>

            <div className="image-carousel" aria-hidden="true" data-reveal="up">
              <div className="image-carousel-track">
                {[...carouselImages, ...carouselImages].map((image, index) => (
                  <article className="carousel-card" key={`${image}-${index}`}>
                    <img src={image} alt="" />
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="process-section">
            <div className="section-head process-head" data-reveal="up">
              <p className="eyebrow" data-reveal="up">Processo</p>
              <h2 data-reveal="up">Uma jornada simples, clara e adequada ao nivel de exigencia do projeto.</h2>
            </div>

            <div className="process-grid">
              {processSteps.map((item) => (
                <article className="process-card" key={item.number} data-reveal="up">
                  <span className="process-number">{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="cta-section">
            <div className="cta-copy" data-reveal="up">
              <p className="eyebrow" data-reveal="up">Contato</p>
              <h2 data-reveal="up">Se o projeto pede presença, proporção e acabamento, vamos conversar.</h2>
              <p data-reveal="up">
                A landing pode encerrar com uma chamada direta, elegante e comercialmente clara.
              </p>
            </div>

            <a className="cta-link" href="#contato" data-reveal="up">
              Solicitar atendimento
            </a>
          </section>

          <section className="contact" id="contato">
            <div className="contact-card" data-reveal="up">
              <p className="eyebrow" data-reveal="up">Contato</p>
              <h2 data-reveal="up">Vamos conversar sobre o seu projeto.</h2>
              <a className="contact-link" href="https://wa.me/5500000000000" data-reveal="up">
                Entrar em contato
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default App
