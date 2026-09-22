import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { LeaderboardPage } from './pages/LeaderboardPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { SectorPage } from './pages/SectorPage'
import { SectorsPage } from './pages/SectorsPage'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-pearl focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sectors" element={<SectorsPage />} />
        <Route path="/sectors/:slug" element={<SectorPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}
