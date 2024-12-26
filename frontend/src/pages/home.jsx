import React, { useState } from 'react'
import Popular from '../components/popular'
import Hero from '../components/hero'
import HowItWorks from '../components/howitworks'
import BecomeSeller from '../components/becomeseller'
// import SigninForm from '../components/signinForm'

const home = () => {
    // const [formVisiblity, setFormVisiblity] = useState(true);
    return (
        <>
            <Hero />
            <Popular />
            <HowItWorks />
            <BecomeSeller />


        </>
    )
}

export default home