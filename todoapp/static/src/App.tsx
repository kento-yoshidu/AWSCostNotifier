import React, { useState, useRef, useCallback } from 'react'
import { useSyncExternalStore } from 'react'

type Task = {
  id: string,
  title: string
}

type Tasks = {
  tasks: Task[]
}

function useData<T>(url: string): T | undefined {
  const data$ = useRef<T>()

  const subscribe = useCallback(
    (onStoreChange: () => void): (() => void) => {
      const controller = new AbortController()

      fetch(url, { signal: controller.signal })
        .then((res) => res.json())
        .then((data) => {
          data$.current = data

          onStoreChange()
        })

      return () => {
        controller.abort()
      }
    },
    [url]
  )

  return useSyncExternalStore(subscribe, () => data$.current)
}

function App() {
  const data = useData<Tasks>(`${process.env.REACT_APP_API_GATEWAY_URL}/tasks`)

  return (
    <>
      <h1>hog</h1>

      <ul>
        {data && data.tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </>
  )
  /*
  const [taskList, setTaskList] = useState<Task[] | null>(null)

  const handleClick = async () => {
    const url = `${process.env.REACT_APP_API_GATEWAY_URL}/tasks`

    const result = await fetch(url)

    const { tasks } = await result.json()

    setTaskList(tasks)
  }

  return (
    <div className="App">
      <form>
        <button onClick={handleClick} type="button">送信</button>
      </form>

      <ul>
        {taskList && (
          <>
            {taskList.map((task: Task) => (
              <li key={task.id}>{task.title}</li>
            ))}
          </>
        )}
      </ul>
    </div>
  )
  */
}

export default App
