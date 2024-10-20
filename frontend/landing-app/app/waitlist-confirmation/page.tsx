import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SiX, SiInstagram, SiYoutubeshorts, SiFacebook } from '@icons-pack/react-simple-icons'

export default function WaitlistConfirmation() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#b7b1d2] p-4">
      <h1 className="text-3xl font-bold mb-4 text-[#4b3d8f]">Thank You for Joining Our Waitlist!</h1>
      <p className="text-lg mb-6 text-center max-w-md">
        We're excited to have you on board. While you wait, why not try our demo or follow us on social media for updates?
      </p>
      <div className="space-y-4">
        <Button className="w-full bg-[#37a987] hover:bg-[#37a987]/90">
          <Link href="/demo">Try Our Demo</Link>
        </Button>
        <div className="flex justify-center space-x-4">
          <a href="https://x.com/dreamnest" target="_blank" rel="noopener noreferrer">
            <SiX className="h-8 w-8 text-[#4b3d8f] hover:text-[#37a987]" />
          </a>
          <a href="https://instagram.com/dreamnest" target="_blank" rel="noopener noreferrer">
            <SiInstagram className="h-8 w-8 text-[#4b3d8f] hover:text-[#37a987]" />
          </a>
          <a href="https://youtube.com/@dreamnest" target="_blank" rel="noopener noreferrer">
            <SiYoutubeshorts className="h-8 w-8 text-[#4b3d8f] hover:text-[#37a987]" />
          </a>
          <a href="https://facebook.com/dreamnest" target="_blank" rel="noopener noreferrer">
            <SiFacebook className="h-8 w-8 text-[#4b3d8f] hover:text-[#37a987]" />
          </a>
        </div>
      </div>
    </div>
  )
}