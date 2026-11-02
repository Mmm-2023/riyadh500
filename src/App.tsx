import { Navigate, Route, Routes } from 'react-router-dom'
import { Shell } from './components/Shell'
import { BrowsePage } from './pages/BrowsePage'
import { HomePage } from './pages/HomePage'
import { InsightsPage } from './pages/InsightsPage'
import { LeaderboardPage } from './pages/LeaderboardPage'
import { PrivacyPage, TermsPage } from './pages/LegalPage'
import { NominatePage } from './pages/NominatePage'
import { PartnersPage } from './pages/PartnersPage'
import { ProfilePage } from './pages/ProfilePage'
import { SessionProvider } from './state/session'

export default function App() {
  return (
    <SessionProvider>
      <Routes>
        <Route element={<Shell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/sectors" element={<Navigate to="/browse" replace />} />
          <Route path="/sectors/:slug" element={<SectorRedirect />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/leaders/:slug" element={<ProfilePage />} />
          <Route path="/nominate" element={<NominatePage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </SessionProvider>
  )
}

function SectorRedirect() {
  return <Navigate to="/browse" replace />
}

function Missing() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-serif text-5xl">Page not found.</h1>
      <p className="mt-4 text-[16px]">That address is not on Riyadh 500.</p>
    </div>
  )
}
