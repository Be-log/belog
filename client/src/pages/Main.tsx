import React, { useState } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

const Main = () => {
  const [first, setfirst] = useState(null)

  useQuery(['test'], async () => {
    const test = await axios.get('http://localhost:5000/test')
    setfirst(test.data.test)
  })

  return <div>{first}</div>
}

export default Main
