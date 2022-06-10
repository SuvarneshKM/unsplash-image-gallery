import React from 'react'
import BlurImage from '../components/Image'
import { createClient } from '@supabase/supabase-js'

type Image = {
  photo_id: string,
  photo_url: string,
  photo_image_url: string,
  photographer_username: string,
  ai_description: string,
}

export default function index({ images }: { images: Image[] }) {
  return (
    <div className='mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
      <h1 className='text-gray-900 text-3xl font-bold uppercase pb-8 sm:pb-12'>Unsplash images</h1>
      <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
        {images.map(image => (
          <BlurImage key={image.photo_id} image={image} />
        ))}
      </div>
      <p className='text-gray-900 text-sm text-center bottom-0'>Made with ❤️ by <a href="https://github.com/SuvarneshKM" target='_blank' rel='noopener noreferrer'>SuvarneshKM</a></p>
    </div>
  )
}


export async function getStaticProps() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );

  const { data } = await supabaseAdmin.from('images').select('*').order('photo_id').range(0, 100)
  return {
    props: {
      images: data,
    },
  }
}