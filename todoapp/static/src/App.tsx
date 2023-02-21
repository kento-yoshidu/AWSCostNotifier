import React, { useState } from 'react'
import useSWR from "swr"

type Task = {
  id: string,
  title: string
}

/* 
const fetcher = (...args) => fetch(...args).then(res => {
  res.json()
})
*/

function App() {
  /*
  // const { data, error, isLoading } = useSWR(`${process.env.REACT_APP_API_GATEWAY_URL}/tasks`, fetcher)

  const options = {
    mode: "cors",
    headers: {
      
    }
  }

  const { data, error, isLoading } = useSWR([`${process.env.REACT_APP_API_GATEWAY_URL}/tasks/`, options], fetcher, {
    
  })

  if (error) return <div>error has occurred!</div>

  if (isLoading) return <h1>Loading...</h1>

  if (!isLoading) {
    console.log({ data })
  }
  */

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
}

export default App;
