import React from 'react'
import Card from './cards';
import Demo from './Demo';
 const App = () => {

  return (
    <>
        <Card customClasses="bg-yellow-300"/>
        <Card customClasses="bg-red-200"/>
        <Card customClasses="bg-blue-100"/>
        <Demo/>
    </>

  )
 }

export default App