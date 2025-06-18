import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    padding-top: 10px;
`
const Input = styled.input`
    margin: 10px;
`

const RadioButton = ({ label, value, onChange }) => {
    return (
        <Wrapper>
            <Input type="radio" checked={value} onChange={onChange} />
            {label}
        </Wrapper>
    )
}

export default RadioButton