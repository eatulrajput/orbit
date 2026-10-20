import React from 'react'
import {
    HeroSection,
    HeroMockup,
    StatsBar,
    BentoFeatures,
    FeaturedPosts,
    FinalCTA,
} from '../components/landing'

function Landing() {
    return (
        <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
            <HeroSection />
            <HeroMockup />
            <StatsBar />
            <BentoFeatures />
            <FeaturedPosts />
            <FinalCTA />
        </div>
    )
}

export default Landing
