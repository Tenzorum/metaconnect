import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import Base from "../layouts/base";
import Card from "../components/Card";
import EnsStatusBar from "../components/EnsStatusBar";
import Form from "../components/Form";
import Input from "../components/Input";
import Button from "../components/Button";
import {checkEnsAvail, createEns} from "../helpers/love";
import { accountUpdateName } from "../reducers/_account";
import { metaConnectionShow } from "../reducers/_metaConnection";
import { p2pRoomSendMessage } from "../reducers/_p2pRoom";
import {
  formatHandle,
  generateNewMetaConnection,
  handleMetaConnectionURI,
  cleanHandle
} from "../helpers/utilities";
import { fonts, colors } from "../styles";

const StyledTitle = styled.h2`
  margin: 20px 0;
`;

const StyledSubtitle = styled.p`
  font-size: ${fonts.size.h4};
  margin: 40px 0;
`;

const StyledRedLine = styled.div`
  background: rgb(${colors.red});
  width: 62px;
  height: 3px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: auto;
  margin: 20px 0;
  padding: 12px 20px;
`;

class Home extends Component {
  state = {
    title: "MetaConnect",
    subtitle: "A meta connection to start your journey using Ethereum",
    pendingMetaConnection: null,
    name: "",
    twitter: "",
    telegram: "",
    github: "",
    linkedin: "",
    phone: "",
    email: "",
    ensMessage: "Enter a valid username",
    statusBarColor: "lightPurple"
  };
  componentDidMount() {
    this.checkUrl();
  }
  checkUrl = () => {
    const { location } = this.props;
    if (location.search) {
      let result = handleMetaConnectionURI(location.search);
      if (result) {
        this.setState({
          title: `You were invited by ${formatHandle(result.name)}`,
          subtitle: "Choose a username below to start your MetaConnection",
          pendingMetaConnection: result
        });
      }
    }
  };
  updateName = async ({ target }) => {
    const input = target.value;
    const name = !!input ? "@" + input.replace(/[\s@]/gi, "") : "";
    this.setState({ name });
    const ensAvail = await checkEnsAvail(name.substring(1));
    console.log("ENS AVAIL: ", ensAvail);
  };
  updateHandle = (input, format, socialMedia) => {
    const handle = format ? formatHandle(input) : input.replace(/\s/gi, "");
    this.setState({ [socialMedia]: handle });
  };
  onSubmit = () => {
    const name = this.state.name.replace(/@/gi, "");
    const { pendingMetaConnection } = this.state;
    const { userId } = this.props;
    this.props.accountUpdateName(name);
    if (pendingMetaConnection) {
      const socialMedia = {
        twitter: cleanHandle(this.state.twitter),
        telegram: cleanHandle(this.state.telegram),
        github: cleanHandle(this.state.github),
        linkedin: cleanHandle(this.state.linkedin),
        phone: this.state.phone,
        email: this.state.email
      };
      const metaConnection = generateNewMetaConnection({
        peer: userId,
        name,
        socialMedia
      });
      this.props.p2pRoomSendMessage(pendingMetaConnection.peer, metaConnection);
      this.props.metaConnectionShow(pendingMetaConnection);
    } else {
      window.browserHistory.push("/dashboard");
    }
  };
  createEnsName = async () => {
    const ens = await createEns('123456789', "0xA1b02d8c67b0FDCF4E379855868DeB470E169cfB","0xA1b02d8c67b0FDCF4E379855868DeB470E169cfB");
    console.log("ENS: ", ens)
  };
  render() {
    const { pendingMetaConnection, name, title, subtitle } = this.state;
    return (
      <Base paddingTop={!pendingMetaConnection}>
        <StyledTitle>{title}</StyledTitle>
        <StyledRedLine />
        <StyledSubtitle>{subtitle}</StyledSubtitle>
        <Card>
          <Form onSubmit={this.onSubmit}>
            <Input
              required
              label="Username"
              placeholder="@carlosmatos"
              type="text"
              color={"lightGrey"}
              shadow={false}
              value={name}
              onChange={this.updateName}
              autoCapitalize="off"
            />
            {pendingMetaConnection && (
              <Fragment>
                <Input
                  label="Twitter"
                  placeholder="@twitter"
                  type="text"
                  color={"lightGrey"}
                  shadow={false}
                  value={this.state.twitter}
                  autoCapitalize="off"
                  onChange={({ target }) =>
                    this.updateHandle(target.value, true, "twitter")
                  }
                />
                <Input
                  label="Telegram"
                  placeholder="@telegram"
                  type="text"
                  color={"lightGrey"}
                  shadow={false}
                  value={this.state.telegram}
                  autoCapitalize="off"
                  onChange={({ target }) =>
                    this.updateHandle(target.value, true, "telegram")
                  }
                />
                <Input
                  label="Github"
                  placeholder="@github"
                  type="text"
                  color={"lightGrey"}
                  shadow={false}
                  value={this.state.github}
                  autoCapitalize="off"
                  onChange={({ target }) =>
                    this.updateHandle(target.value, true, "github")
                  }
                />

                <Input
                  label="Linkedin"
                  placeholder="@linkedin"
                  type="text"
                  color={"lightGrey"}
                  shadow={false}
                  value={this.state.linkedin}
                  autoCapitalize="off"
                  onChange={({ target }) =>
                    this.updateHandle(target.value, true, "linkedin")
                  }
                />

                <Input
                  label="Phone"
                  placeholder="+13442321010"
                  type="text"
                  color={"lightGrey"}
                  shadow={false}
                  value={this.state.phone}
                  autoCapitalize="off"
                  onChange={({ target }) =>
                    this.updateHandle(target.value, false, "phone")
                  }
                />

                <Input
                  label="Email"
                  placeholder="johndoe@email.com"
                  type="email"
                  color={"lightGrey"}
                  shadow={false}
                  value={this.state.email}
                  autoCapitalize="off"
                  onChange={({ target }) =>
                    this.updateHandle(target.value, false, "email")
                  }
                />
              </Fragment>
            )}
            <EnsStatusBar type="text" color={this.state.statusBarColor} message={this.state.ensMessage}/>
            <StyledButton onClick={this.createEnsName}>
            Test
            </StyledButton>
            <StyledButton color="red" textTransform="uppercase" type="submit">
              {"Start 🚀"}
            </StyledButton>
          </Form>
        </Card>
      </Base>
    );
  }
}

Home.propTypes = {
  accountUpdateName: PropTypes.func.isRequired
};

const reduxProps = ({ metaConnection, p2pRoom }) => ({
  userId: p2pRoom.userId,
  metaConnectionName: metaConnection.name
});

export default connect(
  reduxProps,
  {
    accountUpdateName,
    metaConnectionShow,
    p2pRoomSendMessage
  }
)(Home);
