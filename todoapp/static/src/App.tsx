import React, { useEffect, useState } from 'react';

const url = process.env.REACT_APP_API_GATEWAY_URL

type Task = {
  id: string,
  title: string
}

function App() {
  const [task, setTask] = useState("")

  const [taskList, setTaskList] = useState<Task[]>([{ id: "hoge", title: "hoho" }])

  const handleChange = (e: any) => {
    setTask(e.target.value)
  }

  const handleClick = async () => {
    const url = "https://i7jw9utro9.execute-api.ap-northeast-1.amazonaws.com/tasks"

    const result = await fetch(url)

    const tasks: Task = await result.json()

    setTaskList((taskList) => ([...taskList, tasks]))

    console.log(taskList, tasks)
  }

  return (
    <div className="App">
      <form>
        <h1>Todo App</h1>

        <input type="text" onChange={handleChange} />

        <p>{task}</p>

        <button onClick={handleClick} type="button">送信</button>
      </form>

      <ul>
        {taskList && taskList.map((task) => {
          return (
            <p>{task.title}</p>
          )
        })}
      </ul>
    </div>
  )
}

export default App;
