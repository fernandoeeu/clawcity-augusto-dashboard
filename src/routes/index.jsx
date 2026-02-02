import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/')({
  component: DashboardComponent,
})

const API_KEY = 'sNsnkavuNhModN5gFpNf70IYWoe29d7F'
const BASE_URL = 'https://famous-chihuahua-600.convex.site'

function DashboardComponent() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  async function fetchData() {
    try {
      const res = await fetch(`${BASE_URL}/agent/state`, {
        headers: { 'Authorization': `Bearer ${API_KEY}` }
      })
      if (!res.ok) throw new Error('API error')
      const json = await res.json()
      setData(json)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  if (loading) return <LoadingState />
  if (error) return <ErrorState message={error} />

  const { agent, tick } = data
  const INITIAL_CASH = 692
  const cashChange = agent.cash - INITIAL_CASH

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          label="Capital Líquido"
          value={`$${agent.cash.toLocaleString()}`}
          change={cashChange > 0 ? `+$${cashChange}` : `$${cashChange}`}
          positive={cashChange >= 0}
          gold
        />
        
        <MetricCard 
          label="Estamina"
          value={`${agent.stamina}/100`}
          status={agent.stamina > 50 ? 'Ótimo' : agent.stamina > 20 ? 'Cansado' : 'Exausto'}
        />
        
        <MetricCard 
          label="Heat (Risco)"
          value={agent.heat}
          status={agent.heat === 0 ? 'Invisível' : agent.heat < 40 ? 'Atenção' : 'Perigo'}
          danger={agent.heat > 40}
        />
        
        <MetricCard 
          label="Tick Atual"
          value={tick.toLocaleString()}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-xl font-serif text-amber-400 mb-4">📍 Situação Operacional</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-neutral-950 rounded-lg">
              <span className="text-3xl">{getLocationIcon(agent.location.slug)}</span>
              <div>
                <div className="font-medium capitalize">{agent.location.name}</div>
                <div className="text-sm text-neutral-400">Território: {agent.gangTag || 'Neutro'}</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-neutral-950 rounded-lg">
              <span className="text-neutral-400">Status</span>
              <StatusBadge status={agent.status} />
            </div>
          </div>
        </div>

        <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-xl font-serif text-amber-400 mb-4">🎯 Progresso da Fase 1</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Meta: $3.000</span>
              <span className="text-amber-400">{((agent.cash / 3000) * 100).toFixed(1)}%</span>
            </div>
            
            <div className="h-3 bg-neutral-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-500"
                style={{ width: `${Math.min((agent.cash / 3000) * 100, 100)}%` }}
              />
            </div>
            
            <p className="text-sm text-neutral-400 mt-4">
              Faltam ${(3000 - agent.cash).toLocaleString()} para completar a Fundação do Império.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ label, value, change, status, positive, danger, gold }) {
  return (
    <div className={`p-6 rounded-xl border transition-all hover:border-amber-500/50 ${
      gold 
        ? 'bg-gradient-to-br from-neutral-900 to-neutral-900/50 border-amber-500/30' 
        : 'bg-neutral-900/50 border-neutral-800'
    }`}>
      <div className="text-xs uppercase tracking-wider text-neutral-400 mb-2">{label}</div>
      <div className={`text-3xl font-serif ${gold ? 'text-amber-400' : danger ? 'text-red-400' : 'text-neutral-100'}`}>
        {value}
      </div>
      {change && (
        <div className={`text-sm mt-2 ${positive ? 'text-green-400' : 'text-red-400'}`}>
          {positive ? '↑' : '↓'} {change}
        </div>
      )}
      {status && (
        <div className={`text-sm mt-2 ${danger ? 'text-red-400' : 'text-neutral-400'}`}>
          {status}
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status }) {
  const colors = {
    idle: 'bg-green-500/20 text-green-400',
    busy: 'bg-amber-500/20 text-amber-400',
    jailed: 'bg-red-500/20 text-red-400',
    hospitalized: 'bg-red-500/20 text-red-400'
  }
  
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[status] || colors.idle}`}>
      {status.toUpperCase()}
    </span>
  )
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-12 h-12 border-3 border-amber-500/30 border-t-amber-400 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-neutral-400">Consultando os livros contábeis...</p>
      </div>
    </div>
  )
}

function ErrorState({ message }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center p-6 bg-red-500/10 border border-red-500/30 rounded-xl max-w-md">
        <p className="text-red-400 mb-2">⚠️ Erro de conexão</p>
        <p className="text-neutral-400 text-sm">{message}</p>
      </div>
    </div>
  )
}

function getLocationIcon(slug) {
  const icons = {
    residential: '🏠',
    downtown: '🏙️',
    market: '🏪',
    industrial: '🏭',
    docks: '⚓',
    suburbs: '🏘️',
    hospital: '🏥',
    police_station: '🚔'
  }
  return icons[slug] || '📍'
}
