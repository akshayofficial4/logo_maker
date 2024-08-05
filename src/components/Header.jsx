import React from 'react'
import { Button } from './ui/button'
import { Download } from 'lucide-react'

function Header() {
  return (
    <div className='p-4 shadow-sm border flex items-center justify-between' >
      <img src='/src/assets/logo.svg' />

    {/* Download Button... */}

      <Button className ="flex gap-2 items-center" ><Download className='h-4 w-4' /> Download</Button>
    </div>
  )
}

export default Header
