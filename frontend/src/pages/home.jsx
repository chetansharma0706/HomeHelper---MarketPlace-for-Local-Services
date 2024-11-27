import React, { useState } from 'react'
import Popular from '../components/popular'
import Hero from '../components/hero'
import Navbar from '../components/navbar'
import HowItWorks from '../components/howitworks'
import BecomeSeller from '../components/becomeseller'
// import SigninForm from '../components/signinForm'

const home = () => {
    // const [formVisiblity, setFormVisiblity] = useState(true);
    return (
        <>
            <Navbar />
            <Hero />
            <Popular />
            <HowItWorks />
            <BecomeSeller />


        </>
    )
}

export default home