import React, { useEffect, useState } from 'react';


type Task = {
  id: string,
  title: string
}

function App() {
  const [task, setTask] = useState("")

  const [taskList, setTaskList] = useState<Task[] | null>(null)

  const handleChange = (e: any) => {
    setTask(e.target.value)
  }

  const handleClick = async () => {
    const url = `${process.env.REACT_APP_API_GATEWAY_URL}/tasks`

    const result = await fetch(url)

    const { tasks } = await result.json()

    await setTaskList(tasks)

    console.log(taskList)
  }

  return (
    <div className="App">
      <form>
        <h1>Todo App 05</h1>

        <input type="text" onChange={handleChange} />

        <p>{task}</p>

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
}

export default App;
