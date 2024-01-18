import styled from "styled-components";

const SideBarTextIcon = ({ text, Icon }) => {
 return (
  <BarContent>
   <Icon />
   <HeadingText>{text}</HeadingText>
  </BarContent>
 );
};

const BarContent = styled.div`
 display: flex;
 font-size: 17px;
 margin-top: 25px;
 &:hover {
  opacity: 0.5;
 }
`;

const HeadingText = styled.h4`
 margin: 0px;
 margin-left: 10px;
`;

export default SideBarTextIcon;
