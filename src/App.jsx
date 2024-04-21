import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXZYabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += ",./<>-_!"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, charAllowed, generatePassword])

  return (
    <>
      <div className='w-full h-screen bg-black text-white py-10'>
        <div className='w-full max-w-sm md:max-w-xl md:mx-auto px-4 py-5 rounded-xl text-orange-500 bg-gray-700'>
          <h1 className='text-4xl text-center mb-7 text-white'>Password Generator</h1>
          <div className='flex gap-3'>
            <input type="text" value={password} placeholder='Password' className='px-4 py-2 rounded-lg outline-0 w-full text-lg' ref={passwordRef} readOnly />
            <button className='text-white bg-blue-600 px-3 py-1 rounded-lg text-lg' onClick={copyPasswordToClipboard}>Copy</button>
          </div>

          <div className='flex flex-col md:flex-row gap-5 mt-5 items-center'>
            <div className='flex gap-2'>
              <input type="range" id="passLength" className='cursor-pointer' min={6} max={50} value={length} onChange={(e) => { setLength(e.target.value) }} />
              <label htmlFor="passLength">Length: {length}</label>
            </div>

            <div className='flex gap-7'>

              <div className='flex gap-1'>
                <input type="checkbox" id="numberInput" className='cursor-pointer' defaultChecked={numberAllowed} onChange={() => {
                  setNumberAllowed((prev) => !prev)
                }} />
                <label htmlFor="numberInput">Number</label>
              </div>

              <div className='flex gap-1'>
                <input type="checkbox" id="charInput" className='cursor-pointer' defaultChecked={charAllowed} onChange={() => {
                  setCharAllowed((prev) => !prev)
                }} />
                <label htmlFor="charInput">Special Character</label>
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
