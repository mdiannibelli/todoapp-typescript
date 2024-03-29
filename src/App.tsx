import { FormEvent, FormEventHandler, useState } from 'react'

type TaskForm = {
  title?: string;
  id: number; 
  completed?: boolean;
  isEditing?: boolean;
}

function App() {
  const [tasks, setTasks] = useState<TaskForm[]>([])
  const [values, setValues] = useState('')
  const [valuesEdited, setValuesEdited] = useState('')

  const addTask = (task:string) => {
    const id = Math.random()
    setTasks([
      ...tasks, {title: task, id, completed: false, isEditing: false}
    ])
  }

  const deleteTask = (id:number) => {
    const taskToDelete = tasks.filter((task:{id:number}) => task.id !== id);
    setTasks(taskToDelete)
  }

  const handleEdit = (id:number) => {
    setTasks(tasks.map((task) => task.id === id ? {
      ...tasks, isEditing: !task.isEditing, id}: task))
  }

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(values) {
      addTask(values)
      setValues('')
    }
  }

  const editTask = (title:string, id:number) => {
    setTasks(tasks.map((task) => task.id === id ? {...task, title, isEditing: !task.isEditing, id} : task))
    setValuesEdited('')
  }

  const handleCompleted = (id:number) => {
    setTasks(tasks.map((task) => task.id == id ? {...task, completed: !task.completed, id}: task))
  }
  return (
    <>
    <section className='min-h-screen flex flex-col gap-y-20 justify-center items-center bg-gray-900'>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <label className='text-white text-2xl p-2 uppercase' htmlFor="task">Introduzca su tarea</label>
        <input type="text" name='task' id='task' value={values} onChange={(e) => setValues(e.target.value)} className='select-none outline-none bg-purple-700 text-gray-700 p-2 rounded-md' />
        <button type='submit' className='text-white p-1 border-2 mt-2'>Agregar</button>
      </form>
      <div className='flex flex-col items-center gap-y-2'>
        <h1 className='text-2xl text-purple-500 mb-4'>Sus tareas</h1>
        {tasks.map((task, i) => (
          task.isEditing ? (
            <form key={i} onSubmit={() => editTask(valuesEdited ,task.id)} className='flex flex-col'>
              <label className='text-white text-2xl p-2' htmlFor="task">Edite su tarea</label>
              <input type="text" name='task' id='task' value={valuesEdited} onChange={(e) => setValuesEdited(e.target.value)} className='select-none outline-none bg-blue-300 text-gray-700 p-2 rounded-md' />
            </form>
          ) :
          <div className='border-2 p-4 border-gray-800 rounded-md flex flex-col' key={i}>
            <span className='text-purple-500 text-2xl'>Tarea: {task.title}</span>
            <div className='flex items-center gap-x-2'>
              <span className='text-purple-500  text-2xl'>Estado: {task.completed ? <span className='text-green-500'>Completada</span> : <span className='text-red-500'>Sin Completar</span>}</span>
              <button onClick={() => handleCompleted(task.id)}><svg  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="white"  strokeWidth="2"  strokeLinecap="round"  stroke-linejoin="round" ><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 12l5 5l10 -10" /><path d="M2 12l5 5m5 -5l5 -5" /></svg></button>
            </div>
            <div className='flex gap-x-4 justify-center p-2'>
            <button className='text-gray-500' onClick={() => deleteTask(task.id)}>Borrar tarea</button>
            <button className='text-gray-500' onClick={() => handleEdit(task.id)}>Editar tarea</button>

            </div>
          </div>
        ))}
      </div>
    </section>
    </>
  )
}

export default App
