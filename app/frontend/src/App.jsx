import { Navigate, NavLink, Outlet, Route, Routes, useNavigate } from 'react-router'
import { currentUser, signOut } from './auth'
import Home from './pages/Home'
import Login from './pages/Login'
import Mural from './pages/Mural'
import Quiz from './pages/Quiz'
import Ranking from './pages/Ranking'
import SignUp from './pages/SignUp'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<SignUp />} />
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="quiz/:id" element={<Quiz />} />
        <Route path="quiz/:id/mural" element={<Mural />} />
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

  const navClass = ({ isActive }) => (isActive ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-900')

  return (
    <>
      <header className="border-b border-zinc-200">
        <div className="mx-auto flex max-w-2xl items-center gap-6 px-4 py-4 text-sm">
          <span className="font-semibold text-primary">Quiz DevOps</span>
          <nav className="flex gap-4">
            <NavLink to="/" end className={navClass}>Quizzes</NavLink>
            <NavLink to="/ranking" className={navClass}>Ranking</NavLink>
          </nav>
          <button
            className="ml-auto text-zinc-500 hover:text-zinc-900"
            onClick={() => { signOut(); navigate('/login') }}
          >
            Sair
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-4 py-10">
        <Outlet />
      </main>
    </>
  )
}
