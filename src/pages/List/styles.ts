import styled from "styled-components";

export const ListContainer = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > div {
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    > div > h1 {
        margin-bottom: 2rem;
        margin-top: 2rem;
    }
`

export const CatContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 3rem;
    gap: 3rem;
    border: 2px solid white;
    border-radius: 16px;

    width: 100%;
    max-width: 300px;

    > img {
        max-width: 180px;
        max-height: 200px;
        border-radius: 14px;
    }

    > span {
        margin-right: 2rem;
    }
`
