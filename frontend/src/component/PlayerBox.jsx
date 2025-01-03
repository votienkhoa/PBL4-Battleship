import styled from "@emotion/styled";
import RatingValue from "./RatingValue.jsx";

const StyledPlayerBox = styled.div`
    width: 200px;
    height: 69px;
    min-height: 60px;
    background-color: rgba(0, 0, 0, 0.5); 
    color: white;
    text-align: center;
    line-height:34px;
    border-radius: 10px;
    font-family: 'Inter', sans-serif;
    font-size: 14px; 
    font-weight: bold;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 1px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease; 
    pointer-events: auto;
    &:hover {
        background-color: rgba(0, 0, 0, 0.7); 
        transform: scale(1.1);
    }
`;
function PlayerBox(props) {
    return (
        <StyledPlayerBox>
            <div>player: {props.name}</div>
            <div>rating: <RatingValue rating={props.rating}></RatingValue></div>
        </StyledPlayerBox>
    );
}

export default PlayerBox;