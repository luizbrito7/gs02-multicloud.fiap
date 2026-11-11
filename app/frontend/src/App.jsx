import { LayoutList, LogOut, Star, Trophy } from 'lucide-react'
import { Navigate, NavLink, Outlet, Route, Routes, useNavigate } from 'react-router'
import { currentUser, signOut } from './auth'
import Confirm from './pages/Confirm'
import Home from './pages/Home'
import Login from './pages/Login'
import Wall from './pages/Wall'
import Quiz from './pages/Quiz'
import Ranking from './pages/Ranking'
import SignUp from './pages/SignUp'

export default function App() {
  return (
    <Routes>
      <Route element={<Guest />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/confirm" element={<Confirm />} />
      </Route>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="quiz/:id" element={<Quiz />} />
        <Route path="quiz/:id/wall" element={<Wall />} />
        <Route path="ranking" element={<Ranking />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function Layout() {
  const navigate = useNavigate()
  const user = currentUser()
  if (!user) return <Navigate to="/login" replace />

  const navClass = ({ isActive }) =>
    `flex h-16 items-center gap-2 border-b-2 ${isActive ? 'border-primary text-zinc-900' : 'border-transparent text-zinc-500 hover:text-zinc-900'}`

  return (
    <>
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex h-16 max-w-3xl items-center gap-10 px-4 text-sm">
          <span className="flex items-center gap-2 font-semibold text-primary">
            <Star className="size-5 fill-primary" />
            QuizOps
          </span>
          <nav className="flex gap-8">
            <NavLink to="/" end className={navClass}><LayoutList className="size-4" />Quizzes</NavLink>
            <NavLink to="/ranking" className={navClass}><Trophy className="size-4" />Ranking</NavLink>
          </nav>
          <div className="ml-auto flex items-center gap-6">
            <span className="hidden text-zinc-500 sm:inline">{user.email}</span>
            <button
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900"
              onClick={async () => { await signOut(); navigate('/login') }}
            >
              <LogOut className="size-4" />Sair
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-12">
        <Outlet />
      </main>
    </>
  )
}

// Telas de login e cadastro: quem já está logado vai direto para a home.
function Guest() {
  return currentUser() ? <Navigate to="/" replace /> : <Outlet />
}
