import Image from 'next/image'
import React, { useState } from 'react'

// helper function combine  list of classNames
function cn(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

type Image = {
    photo_id: string,
    photo_url: string,
    photo_image_url: string,
    photographer_username: string,
    ai_description: string,
}


export default function BlurImage({ image }: { image: Image }) {
    const [isLoading, setLoading] = useState(true);

    return (
        <a href={image.photo_url} className='group' target='_blank' rel='noopener noreferrer'>
            <div className='aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full overflow-hidden rounded-lg bg-gray-200'>
                <Image
                    alt=""
                    src={image.photo_image_url}
                    objectFit='cover'
                    layout='fill'
                    className={cn('group-hover:opacity-75 duration-700 ease-in-out',
                        isLoading
                            ? 'grayscale blur-2xl scale-100'
                            : 'grayscale-0 blur-0 scale-100'
                    )}
                    onLoadingComplete={() => setLoading(false)}
                />
            </div>
            <h3 className='mt-4 text-sm text-gray-700'>
                {image.ai_description == null ? 'The best thing about a picture is that it never changes, even when the people in it do.' : image.ai_description}
            </h3>
            <p className='mt-1 text-lg font-medium text-gray-900'>@{image.photographer_username}</p>
        </a>
    )
}
