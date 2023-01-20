import { useState } from 'react'

function App() {
  const [session, setSession] = useState(25)
  const [timer, setTimer] = useState("25:00")
  const [pusePlay, setPusePlay] = useState(0)
  const [recess ,setRecess] = useState(5)
  const [period ,setPeriod] = useState("Session")

  return (
    <div className="h-screen bg-amber-400">
      <div className='w-full h-full flex flex-col justify-center items-center text-2xl'>
        <h1 className='text-center text-2xl bg-amber-500'>Timer Clock</h1>
        <div className='bg-amber-600 flex flex-col justify-center items-center gap-4 p-6 rounded-[20%]  text-slate-100 '>
          <div className='flex gap-10'>
            <div className='flex flex-col gap-1 '>
              <div>Break lenght</div>
              <div className='flex gap-1 justify-center'>
              <span class="material-symbols-outlined text-3xl">arrow_upward</span>
                <div>{recess}</div>
                <span class="material-symbols-outlined text-3xl">arrow_downward</span>
              </div>
            </div>
            <div className='flex flex-col gap-1 '>
              <div>Break lenght</div>
              <div className='flex gap-1 justify-center'>
                <span class="material-symbols-outlined text-3xl">arrow_upward</span>
                <div>{session}</div>
                <span class="material-symbols-outlined text-3xl">arrow_downward</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col border-amber-800 border-2 p-2 rounded-2xl'>
            <div className='text-center'>{period}</div>
            <div className='text-center text-5xl'>{timer}</div>
          </div>
          <div className='flex'>
            <span className="material-symbols-outlined text-3xl">pause</span>
            <span className="material-symbols-outlined text-3xl">restart_alt</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
