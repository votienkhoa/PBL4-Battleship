import styled from "@emotion/styled";
import {ratingColor} from "../utils/ratingUltils.js";

const StyledRatingValue = styled.span`
    font-size: 14px;
    font-weight: bold;
    color: ${(props) => ratingColor(props.rating)};
    margin-left: 5px;
`;

function RatingValue(props) {
    return (
        <StyledRatingValue rating={props.rating}>
            {props.rating}
        </StyledRatingValue>
    );
}

export default RatingValue;