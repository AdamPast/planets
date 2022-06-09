import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const StyledContainer = styled.div`
    height: 100vh;
    background: linear-gradient(132.22deg, #060672 -7.6%, #000000 100%);
    display: flex;
    align-items: center;
    justify-content: center;
`
const StyledH1 = styled.h1`
    display: block;
    position: absolute;
    left: 127px;
    top: 74px;
    font-style: normal;
    font-weight: 700;
    font-size: 52px;
    line-height: 63px;
    color: #FFFFFF;
    text-shadow: 0px 7px 4px rgba(0, 0, 0, .25);
`

const StyledRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 0 120px;
`
const StyledLink = styled.a`
    opacity: 0.88;
    border: 10px solid #888888;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, .25);
    border-radius: 50px;
    width: 375px;
    height: 173px;
    background-color: transparent;
    color: #fff;
    text-decoration: none;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    font-weight: 700;
    text-transform: uppercase;
`

const Planets = () => {
   
    return (
        <StyledContainer>
            <StyledH1>Kosmiczna encyklopedia układu słonecznego 🚀</StyledH1>
            <StyledRow>
                <Link href="/" passHref><StyledLink>Planety</StyledLink></Link>
                <Link href="/" passHref><StyledLink>Gwiazdy</StyledLink></Link>
                <Link href="/" passHref><StyledLink>Satelity</StyledLink></Link>
            </StyledRow>
        </StyledContainer>
    )
}

export default Planets
