import React from 'react'
import Popular from '../components/popular'
import Hero from '../components/hero'
import Navbar from '../components/navbar'

const home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Popular />
        </>
    )
}

export default home