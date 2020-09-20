import React from 'react';
import {motion} from 'framer-motion'
function AboutMeComponent() {
    const pageVariants = {
        initial: {
            opacity: 0,
            x: 0,
            y: 0
        },
        in: {
            opacity: 1,
            x: 0,
            y: 0
        },
        out: {
            opacity: 0,
            x: 0,
            y: 0
        },
    }
    return (
        <motion.div className={"about-me"}
             initial="initial"
             animate="in"
             exit="out"
             variants={pageVariants}
        >
            <h1> About Uploadexa</h1>
            Uploadexa is a personal project built from scratch using in-demand technologies. <br/>The main objective is to learn these technologies by building real-world project.
            <h2>Frameworks</h2>
            <ul>
                <li>Java Spring Boot (Backend)</li>
                <li>ReactJS (Frontend)</li>
            </ul>
            <h2>Database</h2>
            <ul>
                <li>MongoDB</li>
            </ul>
            <h2>File Store</h2>
            <ul>
                <li>AWS S3</li>
            </ul>
            <h2>Styling</h2>
            <ul>
                <li>SASS</li>
            </ul>
            <h2>API Documentation</h2>
            <ul>
                <li>Swagger UI</li>
            </ul>
        </motion.div>
    )
}

export default AboutMeComponent;