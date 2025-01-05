'use client'

import { useEffect, useState } from 'react'
import Layout from './components/Layout'
import * as api from '@/lib/api'

export default function Home() {
  const [works, setWorks] = useState([])

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const data = await api.getWorks()
        setWorks(data)
      } catch (error) {
        console.error('Failed to fetch works', error)
      }
    }

    fetchWorks()
  }, [])

  return (
    <Layout>
      <div className="works">
        {works.map((work: any) => (
          <div key={work.id} className="card work-item" data-course={work.course_id}>
            <h2>{work.title}</h2>
            <p className="description">{work.description}</p>
            <p><strong>Disciplina:</strong> {work.course}</p>
            <p><strong>Autor:</strong> {work.author}</p>
            <p className="price">R${work.price}</p>
            <button>Comprar</button>
          </div>
        ))}
      </div>
    </Layout>
  )
}

