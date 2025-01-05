'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '../../components/Layout'
import * as api from '@/lib/api'

export default function NewWork() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [courseId, setCourseId] = useState('')
  const [courses, setCourses] = useState([])
  const router = useRouter()

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await api.getCourses()
        setCourses(data)
      } catch (error) {
        console.error('Failed to fetch courses', error)
      }
    }

    fetchCourses()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.createWork({
        courseId: parseInt(courseId),
        title,
        description,
        price: parseFloat(price)
      })
      router.push('/dashboard')
    } catch (error) {
      console.error('Failed to create work', error)
    }
  }

  return (
    <Layout>
      <div className="form-page">
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form">
            <h2>Publicar trabalho</h2>

            <label htmlFor="title">Título</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label htmlFor="course">Disciplina</label>
            <select
              id="course"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              required
            >
              <option value="" disabled>Selecione uma disciplina</option>
              {courses.map((course: any) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>

            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              required
            ></textarea>

            <label htmlFor="price">Preço</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
              step="0.01"
              required
            />

            <button type="submit">Publicar</button>
          </form>
        </div>
      </div>
    </Layout>
  )
}
