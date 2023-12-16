import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>



<section className="text-gray-600 body-font">
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 className="title-font sm:text-5xl text-3xl mb-4 font-medium text-gray-900">Welcome To The <br /> Future of Education
      </h1>
      <p className="mb-8 leading-relaxed">Unlock the potential of NFTs with our cutting-edge solution that transforms traditional degrees into secure, transparent, and tamper-proof Non-Fungible Tokens (NFTs). Embrace the future as we bring innovation to the heart of academia.</p>
      <div className="flex justify-center">
        <Link href="/new-degree"  className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">New Degree</Link>
      </div>
    </div>
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
      <img className="object-cover object-center rounded" alt="hero" src="/hero-img.jpg"/>
    </div>
  </div>
</section>
    </>
  )
}
