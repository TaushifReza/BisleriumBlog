import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout({ children }) {
    return (
        <div>
            {/* Navbar  */}
            <Navbar />

            {/* main Content  */}
            <div className="content min-h-screen">
                {children}
            </div>

             {/* Footer  */}
             <Footer />
        </div>
    )
}

export default Layout