import React from 'react'

// Import FontAwesomeIcon component
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Importing Component
import Signout from './Signout';

function Header() {
    return (
        <header>
            <a href="http://chatsociety.netlify.app/">
                <h1>Chat Society</h1>
            </a>
            <a href="https://github.com/swapnilsparsh/ChatSociety" target="_blank" rel="noreferrer" >
                <FontAwesomeIcon size='3x' icon={faGithub} />
            </a>
            <Signout />
        </header>
    )
}

export default Header
