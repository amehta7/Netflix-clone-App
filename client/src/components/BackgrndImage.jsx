import React from 'react'
import backgrnd from '../assets/login.jpg'
import styled from 'styled-components'

const BackgrndImage = () => {
  return (
    <Container>
      <img src={backgrnd} alt={backgrnd} />
    </Container>
  )
}

export default BackgrndImage

const Container = styled.div`
  height: 100vh;
  width: 100vw;

  img {
    height: 100vh;
    width: 100vw;
  }
`
