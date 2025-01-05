'use client'

import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import * as api from '@/lib/api'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [works, setWorks] = useState([])
  const router = useRouter()

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const data = await api.getDashboard()
        setWorks(data)
      } catch (error) {
        console.error('Failed to fetch works', error)
      }
    }

    fetchWorks()
  }, [])

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja deletar este trabalho?')) {
      try {
        await api.deleteWork(id)
        setWorks(works.filter((work: any) => work.id !== id))
      } catch (error) {
        console.error('Failed to delete work', error)
      }
    }
  }

  return (
    <Layout>
      <div className="works">
        {works.map((work: any) => (
          <div key={work.id} className="card my-card work-item">
            <h2>{work.title}</h2>
            <p><strong>Disciplina:</strong> {work.course}</p>
            <p className="price">R${work.price}</p>
            <div className="actions">
              <Link href={`/works/edit/${work.id}`}>
                <button className="edit-button">Editar</button>
              </Link>
              <button 
                className="delete-button" 
                onClick={() => handleDelete(work.id)}
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}
