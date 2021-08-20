import styled from "styled-components";

export const Container = styled.main`
    max-width: 1120px;
    margin: 0 auto;
    padding: 2.5rem 1rem 1rem 1rem ;
`

export const Content = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
`
export const Item = styled.div`
    justify-content: center;
    display: flex;
`