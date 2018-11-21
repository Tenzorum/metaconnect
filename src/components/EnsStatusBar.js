import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors, fonts, shadows, responsive } from "../styles";

const StyledStatusBarWrapper = styled.div`
  width: 100%;
  opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
  display: flex;
  flex-direction: column;
  margin-top: 12px;
`;

const StyledLabel = styled.label`
  opacity: ${({ hide }) => (hide ? 0 : 1)};
  align-self: start;
  width: 100%;
  margin-left: 6px;
  text-align: left;
`;

const StyledStatusBar = styled.div`
  width: 100%;
  margin-top: 8px;
  background: ${({ color }) => `rgb(${colors[color]})`};
  padding: 12px;
  border: none;
  border-style: none;
  font-family: ${({ monospace }) =>
  monospace ? `${fonts.family.SFMono}` : `inherit`};
  font-size: ${fonts.size.h6};
  font-weight: ${fonts.weight.semibold};
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  border-radius: 8px;
  -webkit-box-shadow: ${({ shadow }) => (shadow ? shadows.medium : "none")};
  box-shadow: ${({ shadow }) => (shadow ? shadows.medium : "none")};
  outline: none;
  @media screen and (${responsive.sm.max}) {
    padding: 8px 10px;
  }
`;

const EnsStatusBar = ({
                 label,
                 color,
                 type,
                 disabled,
                 value,
                 shadow,
                 monospace,
                 message,
                 ...props
               }) => {
  return (
    <StyledStatusBarWrapper disabled={disabled}>
      <StyledLabel hide={label === "Input"}>{label}</StyledLabel>
      <StyledStatusBar
        disabled={disabled}
        color={color}
        shadow={shadow}
        type={type}
        value={!disabled ? value : ""}
        monospace={monospace}
        {...props}
      >
      {message}
      </StyledStatusBar>
    </StyledStatusBarWrapper>
  );
};

EnsStatusBar.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string,
  label: PropTypes.string,
  color: PropTypes.string,
  shadow: PropTypes.bool,
  monospace: PropTypes.bool,
  disabled: PropTypes.bool
};

EnsStatusBar.defaultProps = {
  label: "",
  color: "white",
  shadow: true,
  monospace: false,
  disabled: false
};

export default EnsStatusBar;
