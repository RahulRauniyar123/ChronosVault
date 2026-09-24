import Header from './components/Header'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import CreateVault from './components/CreateVault'
import CheckVault from './components/CheckVault'

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <CreateVault />
        <CheckVault />
      </main>
      <footer className="footer">
        <p>🔐 ChronosVault — Trust the Time. Not the Middleman. Built on Base.</p>
      </footer>
    </div>
  )
}

export default App