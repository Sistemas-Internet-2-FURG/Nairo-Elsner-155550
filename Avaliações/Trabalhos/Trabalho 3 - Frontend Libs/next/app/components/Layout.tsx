import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth()

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-between items-center px-24 py-5 bg-[#1f1f1f] border-b border-[#333] h-[9vh]">
        <Link href="/" className="text-2xl font-bold text-[#e0e0e0] no-underline">
          ComprAI kkkj
        </Link>
        <nav>
          <ul className="flex gap-4 items-center list-none m-0 p-0">
            <li>
              <Link href="/dashboard" className="text-[#e0e0e0] font-bold no-underline hover:text-[#bababa]">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/works/new" className="bg-[#28a745] text-white py-2 px-4 rounded cursor-pointer text-base transition-all hover:bg-[#218838] hover:scale-105">
                Publicar trabalho
              </Link>
            </li>
            <li>
              <button
                onClick={logout}
                className="bg-[#c45252] text-white py-2 px-4 rounded cursor-pointer text-base transition-all hover:bg-[#a23a3a] hover:scale-105"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow p-8 m-5 min-h-[80vh]">
        {children}
      </main>

      <footer className="bg-[#1f1f1f] text-[#e0e0e0] py-5 text-center flex items-center justify-center h-[7vh]">
        <p>Feito com <span className="text-red-500">❤</span> por Gabriel Endres, Nairo Elsner e Richard Stern</p>
      </footer>
    </div>
  )
}

