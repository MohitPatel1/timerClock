import { useEffect } from 'react'
import { useState } from 'react'

function App() {
  const [session, setSession] = useState(25)
  const [recess ,setRecess] = useState(5)
  const [timerMinute, setTimerMinute] = useState(25)
  const [timerSecond, setTimerSecond] = useState(0)
  const [timerState, setTimerState] = useState(false)
  const [timerType ,setTimerType] = useState("Session")

  // increment decrement functions
  const increment = (event) => {
    const element = event.target
    if(element.className.includes("recess")){
      
      setRecess(recess + 1)
    }
    else{
      setSession(session + 1)
      setTimerMinute(timerMinute + 1)
    }
  }

  const decrement = (event) => {
    const element = event.target
    if(element.className.includes("recess")) {
      if(recess > 1) {
        setRecess(recess - 1)
      }
    }
    else{
      if(session > 1){
        setSession(session - 1) 
        setTimerMinute(session-1)
      }
    }
  }

  // reset function
  const reset = () => {
    setSession(25)
    setTimerMinute(25)
    setTimerSecond(0)
    setRecess(5)
    setTimerState(false)
  }

  // pause play functions 

  const timerTicking = () => {
    console.log(timerSecond, "  timer second")
    if(timerState){
      if(timerSecond >= 0){
        console.log(timerSecond+" timer second greater than 0")
        setTimerSecond(timerSecond => timerSecond - 1);
      }
      else{
        console.log(timerSecond+" timer second less than 0")
        if(timerMinute > 0){
          console.log(timerMinute+" timer minute greater than 0")
          setTimerMinute(timerMinute => timerMinute - 1)
          setTimerSecond(59);
        }
        else{
          setTimerType("Break")
          console.log(timerMinute+" timer minute less than 0")
          console.log(timerSecond+" timer second")
        }
      }
    }
  }

  const timerCountdown = () => {
    // set interval
    console.log(timerState+" timer state")
    if(timerState == true){
      console.log("ticking start")
      const interval = setInterval(timerTicking, 1000)
      return () => {
        console.log("ticking close")
        clearInterval(interval)
        //close interval
      }
    }
  }

  useEffect(timerCountdown, [timerState])
  

  return (
    <div className="h-screen bg-amber-200 font-semibold cursor-default">
      <div className='w-full h-full flex flex-col justify-center items-center text-2xl'>
        <h1 className='text-center text-2xl bg-yellow-800 rounded-md m-2 p-1'>Timer Clock</h1>
        <div className='bg-yellow-600 flex flex-col justify-center items-center gap-4 p-6 rounded-[20%]'>
          <div className='flex gap-10'>
            <div className='flex flex-col gap-1 '>
              <div>recess lenght</div>
              <div className='flex gap-1 justify-center'>
                <span className="material-symbols-outlined text-3xl recess" onClick={increment}>arrow_upward</span>
                <div>{recess}</div>
                <span className="material-symbols-outlined text-3xl recess" onClick={decrement}>arrow_downward</span>
              </div>
            </div>
            <div className='flex flex-col gap-1 '>
              <div>recess lenght</div>
              <div className='flex gap-1 justify-center'>
                <span className="material-symbols-outlined text-3xl session" onClick={increment}>arrow_upward</span>
                <div>{session}</div>
                <span className="material-symbols-outlined text-3xl session" onClick={decrement}>arrow_downward</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col border-amber-800 border-4 p-2 rounded-2xl'>
            <div className='text-center'>{timerType}</div>
            <div className='text-center text-5xl'>
              <span>{timerMinute}</span>
              <span> : </span>
              <span>{timerSecond}</span>
            </div>
          </div>
          <div className='flex'>
            <span className="material-symbols-outlined text-3xl" onClick={() => setTimerState(!timerState)}>pause</span>
            <span className="material-symbols-outlined text-3xl" onClick={reset}>restart_alt</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
