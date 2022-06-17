import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js' 

export async function getStaticProps() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )
  const { data: categories } = await supabaseAdmin
  .from('categories')
  .select('*')
  const { data: test} = await supabaseAdmin
      .from('planets')
      .select(`*, category (name)`)
      console.log(test)
  return{
    props: {
      categories
    }
  }
}
const StyledContainer = styled.div`
    height: 100vh;
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

const Home = ({ categories }) => {
  return (
    <>
    <Head>
    
    </Head>
        <StyledContainer>
            <StyledH1>Kosmiczna encyklopedia układu słonecznego 🚀</StyledH1>
            <StyledRow>
              {categories ? categories.map((category) => {
                return <Link href={`/${category.name}`} passHref key={category.id}><StyledLink>{category.displayname}</StyledLink></Link>
              }) : null}
            </StyledRow>
        </StyledContainer>
    </>
  )
}

export default Home
