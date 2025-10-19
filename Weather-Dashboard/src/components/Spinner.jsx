import React from 'react'

function Spinner() {
  return (
    <div class='flex item-center justify-center p-12'>
        <div className='relative'>
            {/* Outer Ring */}
            <div class='w-20 h-20 border-4 border-white/20 rounded-full animate-spin border-t-white/80 shardow-lg'>
            </div>
            {/* Inner ring */}
            <div className='absolute inser-2 w-12 h-12 border-3 border-blue-200/30 rounded-full animate-spin border-t-blue-200/80 animation-delay-150'>
            </div>
            {/* center dot */}
            <div className='absolue insert-0 flex items-center justify-center'>
                <div className='w-3 h-3 bg-white/60 rounded-full animate-pulse'>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Spinner
