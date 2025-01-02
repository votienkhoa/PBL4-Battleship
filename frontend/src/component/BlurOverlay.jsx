import styled from "@emotion/styled";

const Blur = styled.div`
    backdrop-filter: blur(6px);
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 20px
`;
// eslint-disable-next-line react/prop-types
function BlurOverlay({children}) {
    return (
        <Blur>
            {children}
        </Blur>
    );
}

export default BlurOverlay;