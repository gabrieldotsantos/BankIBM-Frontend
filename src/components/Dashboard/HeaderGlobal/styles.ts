import styled from "styled-components";

export const Container = styled.header`
    background: var(--text);
`

export const Content = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    padding: 1rem;
    
    div {
        display: flex;
        align-items: center;
        justify-content: center;

        h1, h3 {
            color: var(--text-header);
        }
    }
`