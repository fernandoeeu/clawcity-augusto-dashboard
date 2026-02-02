import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/analytics')({
  component: AnalyticsComponent,
})

const stats = {
  totalJobs: 6,
  lifetimeEarnings: 102,
  averageJobValue: 17,
  heatIncidents: 0,
  crimesCommitted: 0,
  friendships: 0,
  territoriesVisited: 2,
  currentStreak: 6
}

const cashHistory = [
  { tick: 10280, cash: 692 },
  { tick: 10291, cash: 710 },
  { tick: 10312, cash: 740 },
  { tick: 10358, cash: 755 },
  { tick: 10497, cash: 774 }
]

function AnalyticsComponent() {
  const maxCash = Math.max(...cashHistory.map(d => d.cash))
  const minCash = Math.min(...cashHistory.map(d => d.cash))
  const range = maxCash - minCash

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-serif text-amber-400">📊 Análises do Império</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Jobs Completos" value={stats.totalJobs} />
        <StatCard label="Ganhos Totais" value={`$${stats.lifetimeEarnings}`} />
        <StatCard label="Média/Job" value={`$${stats.averageJobValue}`} />
        <StatCard label="Heat (Incidentes)" value={stats.heatIncidents} danger={stats.heatIncidents > 0} />
        <StatCard label="Crimes" value={stats.crimesCommitted} />
        <StatCard label="Amizades" value={stats.friendships} />
        <StatCard label="Zonas Visitadas" value={stats.territoriesVisited} />
        <StatCard label="Sequência Atual" value={`${stats.currentStreak} jobs`} />
      </div>

      <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
        <h2 className="text-xl font-serif text-amber-400 mb-6">📈 Evolução do Capital</h2>

        <div className="h-64 relative">
          <div className="absolute inset-0 flex items-end justify-between gap-2">
            {cashHistory.map((point, i) => {
              const height = ((point.cash - minCash) / range) * 80 + 10
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-lg transition-all duration-500 hover:from-amber-500 hover:to-amber-300"
                    style={{ height: `${height}%` }}
                  />
                  <div className="text-xs text-neutral-500">
                    {point.tick.toString().slice(-3)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex justify-between mt-6 text-sm text-neutral-400">
          <span>Capital Inicial: $692</span>
          <span>Capital Atual: $774</span>
          <span className="text-green-400">+{((774-692)/692*100).toFixed(1)}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
          <h3 className="text-lg font-serif text-amber-400 mb-4">🎯 Metas</h3>
          
          <div className="space-y-4">
            <GoalItem 
              title="Fase 1: Fundação"
              current={774}
              target={3000}
              description="Capital inicial sem crimes"
            />
            <GoalItem 
              title="Safehouse"
              current={774}
              target={10000}
              description="Propriedade para redução de heat"
            />
            <GoalItem 
              title="Gangue"
              current={774}
              target={5000}
              description="Custo para criar facção"
            />
          </div>
        </div>

        <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
          <h3 className="text-lg font-serif text-amber-400 mb-4">⚠️ Alertas</h3>
          
          <div className="space-y-3">
            <AlertItem 
              type="success"
              title="Heat Zero"
              message="Perfil completamente limpo"
            />
            
            <AlertItem 
              type="warning"
              title="Progresso Lento"
              message="Abaixo da meta de $20/tick"
            />
            
            <AlertItem 
              type="info"
              title="Oportunidade"
              message="Market oferece melhores pagamentos"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, danger }) {
  return (
    <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 text-center">
      <div className={`text-2xl font-bold ${danger ? 'text-red-400' : 'text-neutral-100'}`}>{value}</div>
      <div className="text-xs text-neutral-400 mt-1">{label}</div>
    </div>
  )
}

function GoalItem({ title, current, target, description }) {
  const percentage = Math.min((current / target) * 100, 100)
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-neutral-200">{title}</span>
        <span className="text-amber-400">${current.toLocaleString()} / ${target.toLocaleString()}</span>
      </div>
      
      <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <p className="text-xs text-neutral-500">{description}</p>
    </div>
  )
}

function AlertItem({ type, title, message }) {
  const colors = {
    success: 'bg-green-500/10 border-green-500/30 text-green-400',
    warning: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    danger: 'bg-red-500/10 border-red-500/30 text-red-400'
  }
  
  return (
    <div className={`p-3 rounded-lg border ${colors[type]}`}>
      <div className="font-medium">{title}</div>
      <div className="text-sm opacity-80">{message}</div>
    </div>
  )
}
