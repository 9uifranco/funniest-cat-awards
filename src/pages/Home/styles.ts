import styled from "styled-components";
import { motion } from "framer-motion";

export const MainContainer = styled(motion.div)`
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    > h1 {
        margin-top: 2rem;
    }

    > div {
        display: flex;
        flex-direction: column;
        margin-top: 2rem;
    }

    // Some animation based on class

    .disappear-svg {
        animation: 0.2s disappear 0.3s forwards;
    }

    .disappear-img {
        animation: disappear 0.2s forwards;
    }
    
    @keyframes disappear {
        from {
            opacity: 1;
            scale: 1;
        }

        to {
            opacity: 0;
            scale: 1.1;
        }
    }
`

export const VoteBox = styled(motion.div)`
    border-radius: 30px;
    width: 400px;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 5rem;
    max-height: 400px;
    margin: 0;
`

export const CurrentCatImage = styled.img`
    pointer-events: none;
    position: absolute;
    max-width: 200px;
    max-height: 300px;
    object-fit: cover;
`

export const ProgressIcon = styled.svg`
    width: 50%;
    height: 50%;
    z-index: 10;    
`

export const Spinner = styled.div`
    border: 8px solid #8f8f8f; /* Light grey */
    border-top: 8px solid #3082b8; /* Blue */
    border-radius: 50%;
    width: 80px;
    height: 80px;
    animation: spin 2s linear infinite;
    margin-top: 5rem;
    position: absolute;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`