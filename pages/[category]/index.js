import React from 'react'
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js'

const Category = ({ content }) => {
    return (
        <div>
        {content.map(data => {
           return <p key={data.id}>{data.name}</p>
        })}
        </div>
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

    return{
        props:{
            content: data
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
    console.log(categories)

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