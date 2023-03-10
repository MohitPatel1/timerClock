import { useEffect } from 'react'
import { useState } from 'react'
import chaiyya_chaiyaa from '../audios/chalChaiyaChaiya.mp3'

function App() {
  const [session, setSession] = useState(25)
  const [recess ,setRecess] = useState(5)
  const [timerMinute, setTimerMinute] = useState(25)
  const [timerSecond, setTimerSecond] = useState(0)
  const [timerState, setTimerState] = useState(false)
  const [timerType ,setTimerType] = useState("Session")  
  const audio = new Audio()
  audio.src = chaiyya_chaiyaa

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

  // toggles timer type
  const toggleTimerType = () => {
    setTimerType(timerType => {
      if(timerType === 'Session'){
        return 'Break'
      }
      else{
        return 'Session'
      }
    })
  }

  // change timer type function
  const timerTypeChange = () => {
    if(timerType == 'Break'){
      setTimerMinute(recess)
    }
    else{
      setTimerMinute(session)
    }
  }


  // pause play functions 

  const timerTicking = () => {

    setTimerSecond(timerSecond => {
      if(timerSecond < 1){
        setTimerMinute(timerMinute => {
          if(timerMinute > 0){
            return timerMinute - 1
          }
          else{
            audio.play()
            toggleTimerType()
          }
        })
        return 59
      }
      else{
        return timerSecond - 5
      }
    })
   
  }

  const timerCountdown = () => {
    // set interval
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
  useEffect(timerTypeChange, [timerType])
  

  return (
    <div className="h-screen bg-amber-200 font-semibold cursor-default">
      <div className='w-full h-full flex flex-col justify-center items-center text-2xl'>
        <h1 className='text-center text-2xl bg-yellow-800 rounded-md m-2 p-1'>Timer Clock</h1>
        <div className='bg-yellow-600 flex flex-col justify-center items-center gap-4 p-6 rounded-[20%]'>
          <div className='flex gap-10'>
            <div className='flex flex-col gap-1 '>
              <div id='break-label'>Break Lenght</div>
              <div className='flex gap-1 justify-center'>
                <span className="material-symbols-outlined text-3xl recess" id='session-increment' onClick={increment}>arrow_upward</span>
                <div id="break-length">{recess}</div>
                <span className="material-symbols-outlined text-3xl recess" id='break-decrement' onClick={decrement}>arrow_downward</span>
              </div>
            </div>
            <div className='flex flex-col gap-1 '>
              <div id='session-label'>Session Length</div>
              <div className='flex gap-1 justify-center'>
                <span className="material-symbols-outlined text-3xl session" id='break-increment' onClick={increment}>arrow_upward</span>
                <div id="session-length">{session}</div>
                <span className="material-symbols-outlined text-3xl session" id='session-decrement' onClick={decrement}>arrow_downward</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col border-amber-800 border-4 p-2 rounded-2xl'>
            <div className='text-center' id="timer-label">{timerType}</div>
            <div className='text-center text-5xl' id="time-left">
              <span>{timerMinute}</span>
              <span> : </span>
              <span>{timerSecond}</span>
            </div>
          </div>
          <div className='flex'>
            <span className="material-symbols-outlined text-3xl" id="start_stop" onClick={() => setTimerState(!timerState)}>pause</span>
            <span className="material-symbols-outlined text-3xl" id="reset" onClick={reset}>restart_alt</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
