import styled from "@emotion/styled";
export const FormWrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;;
    align-items: center;
    width: 400px;
    margin: auto;
    padding-bottom: 40px;
    padding-top: 50px;
    border: 2px solid rgba(170, 11, 214, 0.8);
    border-radius: 10px;
    background-color: rgba(0,0,0, 0.4);
    box-shadow: 0 4px 15px 2px rgba(0, 0, 0, 0.5);
`
export const FormContainer = styled.div`
    height: 100%;
    width: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
`
export const Input = styled.input`
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 15px;
    border: 2px solid transparent;
    border-radius: 8px;
    font-size: 14px;
    outline: none;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    &::placeholder {
        color: #b0b0b0; 
        opacity: 0.5;
    }
    &:focus {
        border: 2px solid #aa0bd6;
    }
`;
export const Label = styled.label`
    display: block;
    font-size: 14px;
    color: #f5f5f5;
    text-align: left;
    margin-top: 10px;
`;
export const Button = styled.button`
    width: 100%;
    padding: 10px;
    margin-top: 15px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background: linear-gradient(135deg, #aa0bd6, #6d0eaa);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.05);
    }
`;
export const Title = styled.h2`
    text-align: center;
    margin: 0;
    color: #fff;
    font-size: 32px;
`;
export const ErrorMessage = styled.p`
    text-align: center;
    color: red;
    font-size: 1.1rem;
    min-height: 1.4rem;
    margin-bottom: 0;
    margin-top: 1.5rem;
`
export const StyledLink = styled.p`
    text-align: center;
    color: #f5f5f5;
    margin-top: 30px;
    a {
        color: #c572e1;
        text-decoration: none;
        font-weight: bold;
        &:hover {
            text-decoration: underline;
        }
    }
`;