# dreamnest-app
DreamNest - VR meeting app for Real Estate Marketing


# v0 prompt for front-end
I want to create a landing page for a VR meeting app for real-estate marketing called DreamNest, which helps connect remote family together as in their search for their dream home. 

Lets build the app as a single page app using next.js, lucide for icons, tailwind for ui and css, and shadcn. It has 4 sections called "Meeting", "Features", "Pricing" and "About Us", arranged in this order. The header contains menu linking to features, pricing and about us, and a final button link called "Try Demo" which is highlighted. There is a footer, with copyright info. Each section is the size of the viewport. 

The first section "meeting" is the hero section. This has a form like in google meet, with a caption reading "Let's explore your dream home together". Below the caption, there will be three fields. The first field is a button link called "New Meeting". The second field is a text box with "Meeting Code (XXXX-XXXX)". The third field is a button called "Join".  The meeting code field should validate for 8 numbers in XXXX-XXXX format.

The second section "features", highlights the advantages of VR based real estate marketing like "Immersive experience - Step into properties and explore every detail in stunning virtual reality.", "Global Accessibility - View properties from anywhere in the world, no travel required." and "Secure Meetings - We ensure your virtual tours remain private and secure.".

The third section "Pricing", shows tiered structure, "Agent" with featuring "Pay as you go", with costs ranging in "minutes" used, charging $1/min, "business" tier, highlighting unlimited usage, with a button to "talk to sales".

The final section is an "About US". Its divided into two sections, left and right. The left sections lists mission as "DreamNest is revolutionizing the real estate industry by providing immersive VR experiences for home buyers and sellers. Our mission is to make house hunting more efficient, enjoyable, and accessible for everyone." and lists the business name, address, email and phone number. The right section has a "Join waitlist", which requests "Name", "Company Name", "Phone number", "Country", "City", and optionally a social like twitter or linkedin. The phone number field, will separate country code and number fields. The country code will be drop down listing country codes with a country name and flag logo. The Country and City options are be autopopulated for "USA", "UK", "Canada", "Germany", "UAE", "India", "Singapore", "Australia". For each country, list only the major cities.

The next para describes the interactions within each page. On clicking new meeting in first section or buttons under agent pricing, it should guide users to "Join Waitlist" section. On clicking meeting "Join" button, it should redirect the user to a different page.

Use the color scheme #4b3d8f - primary color for headers, buttons and text,#37a987 - secondary color for call to actions and pricing, #b7b1d2 for background and cards. Use icons from lucide or tailwind as appropriate. Color icons are preferred.

https://v0.dev/chat/xspGyQIKRrz


# Project Structure - Claude

## Overall Project Structure
📦 dreamnest-app
├── 📂 frontend
│   ├── 📂 landing-app
│   └── 📂 vr-app
├── 📂 backend
└── docker-compose.yml

## Project Structure for the landing-app

dreamnest-app/frontend/landing-app/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Pricing.tsx
│   │   └── AboutUs.tsx
│   └── forms/
│       └── WaitlistForm.tsx
├── lib/
│   ├── constants/
│   │   ├── features.ts
│   │   ├── pricing.ts
│   │   └── countries.ts
│   ├── schemas/
│   │   └── waitlist.ts
│   └── types/
│       └── index.ts
├── styles/
│   └── globals.css
└── public/
    └── images/
