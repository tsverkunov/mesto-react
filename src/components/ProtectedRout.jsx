import React from 'react'
import {Redirect, Route} from 'react-router-dom'

function ProtectedRout({path, children, loggedIn}) {
  return (
    <Route path={path}>
      {loggedIn ? children : <Redirect to="/sign-in" />}
    </Route>
  )
}

export default ProtectedRout