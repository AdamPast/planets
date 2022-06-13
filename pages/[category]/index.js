import React from 'react'
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js'

const Category = ({ content }) => {
    console.log(content)
    return (
        <div>
            
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
      console.log(data)
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