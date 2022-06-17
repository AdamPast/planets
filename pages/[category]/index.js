import React from 'react'
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js'
import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    min-height: 100vh;
    flex-wrap: wrap;
    background-color: black;
    color: white;
    overflow: hidden;
`
const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`
const StyledTitle = styled.h1`
    text-transform: uppercase;
    font-size: 40px;
    text-align:center;
`
const StyledRow = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    & > a{
        display: block;
        text-decoration: none;
        color: white;
    }
`
const StyledItem = styled.div`
    display: flex;
    width: 300px;
    height: 330px;
    border: 5px solid #FFFFFF;
    border-radius: 50px;
    margin:10px 65px;
    flex-direction: column;
    padding: 20px;
    align-items: center;
    justify-content: center;
    
`
const StyledItemTitle = styled.p`
    width: 100%;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    font-size: 48px;
    line-height: 59px;
    text-align: center;
    margin: 0;
    
`

const StyledImage = styled(Image)`
   width: 100%;
   height: 100%;

`

const StyledLink = styled.a`
    opacity: 0.88;
    border: 5px solid #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, .25);
    border-radius: 50px;
    width: 167px;
    height: 41px;
    background-color: transparent;
    color: #fff;
    text-decoration: none;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    text-transform: uppercase;
    line-height: 43px;

`
const StyledHome = styled.div`
    width: 167px;

`

const Category = ({ content, category, categoryName }) => {
    console.log(category);
    return (
        <StyledContainer>
        <StyledHeader>
            <Link href="/" passHref><StyledLink>← Powrót</StyledLink></Link>
            <StyledTitle>{categoryName}</StyledTitle>
            <StyledHome></StyledHome>
        </StyledHeader>
        <StyledRow>
        {content.map(data => {
           return <Link href={`${category}/${data.name.toLowerCase()}`} passHref key={data.id}><a><StyledItem><StyledItemTitle>{data.name}</StyledItemTitle>
           <StyledImage
                alt={data.name}
                src={data.image}
                width={500}
                height={500}
                quality={50}
           />
           </StyledItem></a></Link>
        })}
        </StyledRow>
        </StyledContainer>
    )
}

export default Category

export async function getStaticProps({ params }){
    const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.SUPABASE_SERVICE_ROLE_KEY || ''
      )
      const { data: data } = await supabaseAdmin
      .from(`${params.category}`) 
      .select('*')
      
      const { data: category } = await supabaseAdmin
      .from('categories')
      .select('*')
      .ilike(`name`, `${params.category}`)
       const categoryName = category[0].displayname
    return{
        props:{
            category: params.category,
            content: data,
            categoryName: categoryName
        }
    }
}

export async function getStaticPaths() {
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    )
    const { data: categories } = await supabaseAdmin
    .from('categories')
    .select('name')
    return {
        paths: categories.map(category => {
            const categoryName = category.name
            return {
                params:{
                    category: categoryName.toString()
                }          
            }
        }),
        fallback: false
    }
   
}