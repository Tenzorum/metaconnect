import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import Base from "../layouts/base";
// import Link from "../components/Link";
import Loader from '../components/Loader'

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-transform: uppercase;
  text-align: center;
  height: 100%;
`;

const Loading = () => (
  <Base>
    <StyledWrapper>
      <Loader/>
    </StyledWrapper>
  </Base>
);

Loading.propTypes = {
  address: PropTypes.string.isRequired
};

const reduxProps = ({ account }) => ({
  address: account.address,
});

export default connect(
  reduxProps,
  null
)(Loading);


