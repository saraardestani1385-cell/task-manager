import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'مرور درس برنامه‌نویسی', completed: false },
    { id: 2, title: 'تمرین زبان انگلیسی', completed: true },
    { id: 3, title: 'مطالعه جزوه دانشگاه', completed: false },
  ])

  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState('all')

  const addTask = (e) => {
    e.preventDefault()

    if (!newTask.trim()) return

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: newTask,
        completed: false,
      },
    ])

    setNewTask('')
  }

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  const completedCount = tasks.filter((task) => task.completed).length

  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completedCount / tasks.length) * 100)

  return (
    <main className="app" dir="rtl">
      <header className="header">
        <div className="brand">
          <span className="brand-icon">✓</span>
          <span>کارهای من</span>
        </div>

        <span className="today">برنامه‌ریز روزانه من ✨</span>
      </header>

      <section className="welcome">
        <span className="welcome-label">خوش اومدی! 🌱</span>
        <h1>امروز قراره چیکار کنی؟</h1>
        <p>کارهای مهمت رو بنویس و یکی‌یکی انجامشون بده.</p>
      </section>

      <section className="stats">
        <div className="stat-card">
          <span>همه کارها</span>
          <strong>{tasks.length}</strong>
        </div>

        <div className="stat-card">
          <span>انجام شده</span>
          <strong>{completedCount}</strong>
        </div>

        <div className="stat-card">
          <span>باقی‌مانده</span>
          <strong>{tasks.length - completedCount}</strong>
        </div>
      </section>

      <section className="progress-section">
        <div className="progress-info">
          <span>پیشرفت امروز</span>
          <strong>{progress}%</strong>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </section>

      <section className="task-section">
        <h2>لیست کارهای من</h2>

        <form className="task-form" onSubmit={addTask}>
          <input
            type="text"
            placeholder="یک کار جدید بنویس..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />

          <button type="submit">+ افزودن کار</button>
        </form>

        <div className="filters">
          <button
            className={filter === 'all' ? 'selected' : ''}
            onClick={() => setFilter('all')}
          >
            همه
          </button>

          <button
            className={filter === 'active' ? 'selected' : ''}
            onClick={() => setFilter('active')}
          >
            انجام نشده
          </button>

          <button
            className={filter === 'completed' ? 'selected' : ''}
            onClick={() => setFilter('completed')}
          >
            انجام شده
          </button>
        </div>

        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <p className="empty">کاری برای نمایش وجود نداره 🌸</p>
          ) : (
            filteredTasks.map((task) => (
              <div className="task-item" key={task.id}>
                <label className={task.completed ? 'done' : ''}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span>{task.title}</span>
                </label>

                <button
                  className="delete"
                  onClick={() => deleteTask(task.id)}
                  aria-label="حذف کار"
                >
                  حذف
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      <footer>
       ساخته شده با ❤️ و React | نسخه توسعه
      </footer>
    </main>
  )
}

export default App