import Link from 'next/link'
import Image from 'next/image'
import { SignInButton, SignedOut, UserButton } from '@clerk/nextjs'
import { ThemeToggler } from './ThemeToggler'

function Header() {
  return (
    <header className="flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
            <div className="pl-4 pr-2 w-fit">
                <Image 
                    src="https://www.shareicon.net/download/2015/11/09/669581_dropbox_512x512.png"
                    alt="logo"
                    className="invert"
                    height={50}
                    width={50}
                />
            </div>
            <h1 className="font-bold text-xl">Dropbox</h1>
        </Link>

        <div className="px-5 flex space-x-2 items-center">
            { /* Theme toggler */ }
            <ThemeToggler />

            <UserButton afterSignOutUrl="/" />
            
            <SignedOut>
                <SignInButton afterSignInUrl="/dashboard" mode="modal" />
            </SignedOut>
        </div>
    </header>
  )
}

export default Header