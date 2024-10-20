import Image from "next/image";

'use client'

import { useRef, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Home, Users, CreditCard, Info, Globe, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SiX, SiInstagram, SiYoutubeshorts, SiFacebook } from '@icons-pack/react-simple-icons'
import { useRouter } from 'next/navigation'


const features = [
  { title: 'Immersive Experience', description: 'Step into properties and explore every detail in stunning virtual reality.', icon: Home },
  { title: 'Global Accessibility', description: 'View properties from anywhere in the world, no travel required.', icon: Globe },
  { title: 'Secure Meetings', description: 'We ensure your virtual tours remain private and secure.', icon: Shield }
]

const pricingTiers = [
  {
    name: 'Individual', description: 'Pay as you go', price: '$2.99/min', features: [
      'Unlimited VR property tours',
      'Basic analytics',
      'Email support',
      'Up to 5 active listings'
    ]
  },
  {
    name: 'Agent', description: 'For real estate agents', price: '$1.99/min', features: [
      'Everything in Individual tier',
      'Advanced analytics and reporting',
      'Unlimited active listings',
      'Custom branding options',
      'Digital Marketing Support'
    ]
  },
  {
    name: 'Property Developer', description: 'Tailored Experiences', price: 'Custom', features: [
      'Everything in Agent tier',
      'Dedicated Account Manager',
      'Priority Listings',
      'Tailored Experiences',
      'Exclusive Deals',
      'Custom Integrations',
      'SLA'
    ]
  },
]

const countries = [
  { name: 'USA', code: '+1', cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'] },
  { name: 'UK', code: '+44', cities: ['London', 'Manchester', 'Birmingham', 'Glasgow', 'Liverpool'] },
  { name: 'Canada', code: '+1', cities: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Ottawa'] },
  { name: 'Germany', code: '+49', cities: ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt'] },
  { name: 'UAE', code: '+971', cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah'] },
  { name: 'India', code: '+91', cities: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'] },
  { name: 'Singapore', code: '+65', cities: ['Central Area', 'Jurong East', 'Tampines', 'Woodlands', 'Sengkang'] },
  { name: 'Australia', code: '+61', cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'] }
]

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  companyName: z.string().min(2, { message: 'Company name must be at least 2 characters.' }),
  countryCode: z.string().min(1, { message: 'Please select a country code.' }),
  phoneNumber: z.string().regex(/^\d{6,14}$/, { message: 'Please enter a valid phone number.' }),
  country: z.string().min(1, { message: 'Please select a country.' }),
  city: z.string().min(1, { message: 'Please select a city.' }),
  social: z.string().optional()
})

export default function DreamNest() {
  const router = useRouter()
  const meetingRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const pricingRef = useRef<HTMLDivElement>(null)
  const aboutUsRef = useRef<HTMLDivElement>(null)
  const [selectedCountry, setSelectedCountry] = useState('')
  const [meetingCode, setMeetingCode] = useState('')
  const [meetingCodeError, setMeetingCodeError] = useState('')

  useEffect(() => {
    const validateMeetingCode = (code: string) => {
      const digits = code.replace(/\D/g, '')
      if (code === '') {
        setMeetingCodeError('')
      } else if (digits.length < 8) {
        setMeetingCodeError('')
      } else if (digits.length > 8) {
        setMeetingCodeError('Too many digits entered')
      } else {
        setMeetingCodeError('')
      }
    }

    validateMeetingCode(meetingCode)
  }, [meetingCode])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      companyName: '',
      countryCode: '',
      phoneNumber: '',
      country: '',
      city: '',
      social: ''
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
    // Redirect to the new page
    router.push('/waitlist-confirmation')
  }

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#b7b1d2]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#4b3d8f] text-white shadow-md">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">DreamNest</h1>
          <ul className="flex space-x-4">
            <li><Button variant="ghost" className="text-white hover:text-[#b7b1d2]" onClick={() => scrollToSection(featuresRef)}><Users className="mr-2 h-4 w-4" /> Features</Button></li>
            <li><Button variant="ghost" className="text-white hover:text-[#b7b1d2]" onClick={() => scrollToSection(pricingRef)}><CreditCard className="mr-2 h-4 w-4" /> Pricing</Button></li>
            <li><Button variant="ghost" className="text-white hover:text-[#b7b1d2]" onClick={() => scrollToSection(aboutUsRef)}><Info className="mr-2 h-4 w-4" /> About Us</Button></li>
            <li><Button variant="default" className="bg-[#37a987] hover:bg-[#37a987]/90">Try Demo</Button></li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow mt-16">
        <section ref={meetingRef} className="min-h-screen flex items-center bg-cover bg-center" style={{ backgroundImage: 'url("https://ik.imagekit.io/3jvmqu1vj/DreamNest/hero-bg.jpg?updatedAt=1697818349573")' }}>
          <div className="container mx-auto px-4">
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl font-bold mb-4 text-white">Let's explore your dream home together</h2>
              {meetingCodeError && (
                <p className="text-red-500 text-sm mb-2">{meetingCodeError}</p>
              )}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button className="bg-[#37a987] hover:bg-[#37a987]/90 whitespace-nowrap" onClick={() => scrollToSection(aboutUsRef)}>New Meeting</Button>
                <div className="flex-grow flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Input
                    placeholder="Meeting Code (XXXX-XXXX)"
                    pattern="[0-9]{4}-[0-9]{4}"
                    title="Please enter a valid meeting code (XXXX-XXXX)"
                    className="bg-white flex-grow"
                    value={meetingCode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d-]/g, '')
                      const digits = value.replace(/\D/g, '')
                      
                      if (digits.length <= 8) {
                        let formattedValue = digits
                        if (digits.length > 4) {
                          formattedValue = `${digits.slice(0, 4)}-${digits.slice(4)}`
                        }
                        setMeetingCode(formattedValue)
                      }
                    }}
                  />
                  <Button 
                    className="bg-[#4b3d8f] hover:bg-[#4b3d8f]/90 whitespace-nowrap" 
                    onClick={async () => {
                      if (!/^\d{4}-\d{4}$/.test(meetingCode)) {
                        setMeetingCodeError("Please enter a valid meeting code (XXXX-XXXX)");
                        return;
                      }
                      try {
                        const response = await fetch(`/api/meeting/validate?code=${meetingCode}`);
                        if (response.ok) {
                          window.location.href = `/meeting/${meetingCode}`;
                        } else {
                          setMeetingCodeError("Invalid meeting code");
                        }
                      } catch (error) {
                        console.error("Error validating meeting code:", error);
                        setMeetingCodeError("An error occurred while validating the meeting code");
                      }
                    }}
                  >
                    Join
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={featuresRef} className="min-h-screen flex items-center bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-[#4b3d8f]">Why Choose VR for Real Estate?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="bg-[#b7b1d2] hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-[#4b3d8f] rounded-full flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-[#4b3d8f] text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#4b3d8f]">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section ref={pricingRef} className="min-h-screen flex items-center bg-[#4b3d8f]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-white">Pricing</h2>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
                {pricingTiers.map((tier, index) => (
                  <Card key={index} className="bg-white flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-[#4b3d8f]">{tier.name}</CardTitle>
                      <CardDescription>{tier.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-4xl font-bold text-[#37a987] mb-4">{tier.price}</p>
                      <ul className="list-disc list-inside space-y-2">
                        {tier.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="text-[#4b3d8f]">{feature}</li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full bg-[#37a987] hover:bg-[#37a987]/90"
                        onClick={() => tier.name === 'Agent' ? scrollToSection(aboutUsRef) : null}
                      >
                        {tier.name === 'Business' ? 'Talk to Sales' : 'Get Started'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section ref={aboutUsRef} className="min-h-screen flex items-center bg-white">
          <div className="container mx-auto px-4 flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4 text-[#4b3d8f]">About Us</h2>
              <Card className="mb-4 w-4/5">
                <CardHeader>
                  <CardTitle className="text-[#4b3d8f]">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#4b3d8f]">
                    DreamNest is revolutionizing the real estate industry by providing immersive VR experiences for home buyers and sellers.
                    Our mission is to make house hunting more efficient, enjoyable, and accessible for everyone.
                  </p>
                </CardContent>
              </Card>
              <Card className="mb-4 w-4/5">
                <CardHeader>
                  <CardTitle className="text-[#4b3d8f]">Reach us @</CardTitle>
                </CardHeader>
                <CardContent className="flex space-x-4">
                  <a href="https://x.com/dreamnest-app" target="_blank" rel="noopener noreferrer">
                    <SiX className="h-6 w-6 text-[#4b3d8f] hover:text-[#37a987]" />
                  </a>
                  <a href="https://instagram.com/dreamnest-app" target="_blank" rel="noopener noreferrer">
                    <SiInstagram className="h-6 w-6 text-[#4b3d8f] hover:text-[#37a987]" />
                  </a>
                  <a href="https://youtube.com/@dreamnest-app" target="_blank" rel="noopener noreferrer">
                    <SiYoutubeshorts className="h-6 w-6 text-[#4b3d8f] hover:text-[#37a987]" />
                  </a>
                  <a href="https://facebook.com/dreamnest-app" target="_blank" rel="noopener noreferrer">
                    <SiFacebook className="h-6 w-6 text-[#4b3d8f] hover:text-[#37a987]" />
                  </a>
                </CardContent>
                <CardContent>
                  <p className="mb-2 text-[#4b3d8f]">DreamNest Inc.</p>
                  <p className="mb-2 text-[#4b3d8f]">123 VR Street, Tech City, TC 12345</p>
                  <p className="mb-2 text-[#4b3d8f]">Email: info@dreamnest.com</p>
                  <p className="text-[#4b3d8f]">Phone: +1 (555) 123-4567</p>
                </CardContent>
              </Card>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4 text-[#4b3d8f]">Join Waitlist</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#4b3d8f]">Name</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#4b3d8f]">Company Name</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="countryCode"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-[#4b3d8f]">Country Code</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {countries.map((country) => (
                                <SelectItem key={country.code} value={country.code}>
                                  {country.name} ({country.code})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem className="flex-[2]">
                          <FormLabel className="text-[#4b3d8f]">Phone Number</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-white" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#4b3d8f]">Country</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value)
                            setSelectedCountry(value)
                            form.setValue('city', '')
                          }}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white">
                              <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {countries.map((country) => (

                              <SelectItem key={country.name} value={country.name}>
                                {country.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#4b3d8f]">City</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white">
                              <SelectValue placeholder="Select a city" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {countries.find(c => c.name === selectedCountry)?.cities.map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="social"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#4b3d8f]">Social Media (Optional)</FormLabel>
                        <FormControl>
                          <div className="flex space-x-2">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                form.setValue('social', 'x');
                                field.onChange('https://x.com/');
                              }}
                            >
                              <SiX className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                form.setValue('social', 'instagram');
                                field.onChange('https://instagram.com/');
                              }}
                            >
                              <SiInstagram className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                form.setValue('social', 'facebook');
                                field.onChange('https://facebook.com/');
                              }}
                            >
                              <SiFacebook className="h-4 w-4" />
                            </Button>
                            <Input 
                              {...field} 
                              className="bg-white flex-grow" 
                              placeholder="Your profile URL" 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-[#37a987] hover:bg-[#37a987]/90">Join Waitlist</Button>
                </form>
              </Form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#4b3d8f] text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} DreamNest. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
