import React from 'react'
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js'

const Detail = ({ content }) => {
    console.log(content)
    return (
        <div>
            
        </div>
    )
}

export default Detail

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
            content: params
        }
    }
}

export async function getStaticPaths({content}) {
    console.log(content)
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    )
        const { data: categories } = await supabaseAdmin
        .from('categories')
        .select('name')
        const { data: planets } = await supabaseAdmin
        .from('planets')
        .select(`*, category (name)`)
        const { data: stars } = await supabaseAdmin
        .from('stars')
        .select(`*, category (name)`)
        const { data: satellites } = await supabaseAdmin
        .from('satellites')
        .select(`*, category (name)`)

            const paths = planets.map(data => {
            const itemName = data.name.toString().toLowerCase()
            const itemCategory = data.category.name.toString().toLowerCase()
            return{
                params:{
                    category: itemCategory,
                    detail: itemName
                }
            }
        })   
        // paths[1] = stars.map(data => {
        //     const itemName = data.name.toString().toLowerCase()
        //     const itemCategory = data.category.name.toString().toLowerCase()
        //     return{
        //         params:{
        //             category: itemCategory,
        //             detail: itemName
        //         }
        //     }
        // })
        // paths[2] = satellites.map(data => {
        //     const itemName = data.name.toString().toLowerCase()
        //     const itemCategory = data.category.name.toString().toLowerCase()
        //     return{
        //         params:{
        //             category: itemCategory,
        //             detail: itemName
        //         }
        //     }
        // })     


            
    return {
        paths: paths,
        fallback: false
    }
   
}