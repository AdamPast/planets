import React from 'react'
import { useRouter } from 'next/router'
import { supabaseAdmin } from '../../utils/supabase'

const Detail = ({ content }) => {
    return (
        <div>         
            <p>{content.name} asdasd</p>
        </div>
    )
}

export default Detail

export async function getStaticProps({ params }){
      console.log(params)
      const { data: data } = await supabaseAdmin
      .from(`${params.category}`) 
      .select(`*`)
      .ilike('name', `${params.detail}`)
      .single()

    return{
        props: {
            content: data
        }
    }
}

export async function getStaticPaths({content}) {

        const getAll = async () => {
            const { data: planets } = await supabaseAdmin
            .from('planets')
            .select(`name, category (name)`)
            const { data: stars } = await supabaseAdmin
            .from('stars')
            .select(`name, category (name)`)
            const { data: satellites } = await supabaseAdmin
            .from('satellites')
            .select(`name, category (name)`)
            return [planets,stars,satellites]
        }
            const data = await getAll();
            const paths = data.map(data => {
                return data.map(data => {
                    const itemName = data.name.toString().toLowerCase();
                    const itemCategory = data.category.name.toString().toLowerCase()
                    return{
                        params: {
                            category: itemCategory,
                            detail: itemName
                        }
                    }
                })
            })
            let arr = []
            paths.map(paths => {
                paths.map(paths => {
                    arr.push(paths)
                })
            })
    return {
        paths: arr,
        fallback: false
    }
   
}