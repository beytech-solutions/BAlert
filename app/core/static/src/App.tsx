import 'vite/modulepreload-polyfill';
import { useEffect, useState } from 'react'
import homeImg from './assets/home.jpg'
import './App.css'

//@ts-expect-error
import BX24 from 'bx24-api'

type AppStates = "loading" | "setup" | "error-loading" | "waiting-auth" | "success"

function App() {
  const [appState, setAppState] = useState<AppStates>("loading")
  
  useEffect(() => {
    try {
      BX24.init().then(() => {
        setAppState("setup")
        
        BX24.install().then((installFinish: Function) => {
          console.log("instalando...")
          installFinish()
          console.log("instalado")
          setAppState("waiting-auth")
        }).catch((e: Error) => {
          console.error(e)
          setAppState("error-loading")
        })
      })
      
      BX24.getAuth().then((auth: any) => {
        console.log(auth)
      }).catch((e: Error) => {
        console.error(e)
        setAppState("error-loading")
      })
  

    } catch (err) {
      console.log("erroo", err);
      
      setAppState("error-loading")
    }
    
  }, [BX24])

  return (
    <div className={appState == 'loading' ? 'translucid' : ''}>
      <div>
        <img src={homeImg} alt="" className='logo'/>
      </div>
      <h1>BAlert</h1>
      <p>
        Stay up to date with your bitrix24 <br />
        notifications and messages
      </p>
      <div className="card">
        <a href="#wow">
          <button>
            Download extension
          </button>
        </a>
        
      </div>
      <p className="read-the-docs">
        {appState}
      </p>
    </div>
  )
}

export default App
