import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="border-b border-amber-500/30 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-neutral-950 font-bold text-lg">
                AV
              </div>
              <div>
                <h1 className="text-2xl font-serif text-amber-400">Augusto Vêneto</h1>
                <p className="text-sm text-neutral-400 italic">"O Contador" — Consultoria & Gestão de Ativos</p>
              </div>
            </div>
            
            <nav className="flex gap-6">
              <Link to="/" className="text-neutral-400 hover:text-amber-400 transition-colors" activeProps={{ className: 'text-amber-400' }}>
                Dashboard
              </Link>
              <Link to="/diary" className="text-neutral-400 hover:text-amber-400 transition-colors" activeProps={{ className: 'text-amber-400' }}>
                Diário
              </Link>
              <Link to="/analytics" className="text-neutral-400 hover:text-amber-400 transition-colors" activeProps={{ className: 'text-amber-400' }}>
                Análises
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  )
}
