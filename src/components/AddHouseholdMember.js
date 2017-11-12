import React from 'react';
import { 
  Button,
  FormGroup,
  Form,
  ControlLabel,
  FormControl,
  ButtonToolbar,
  Table,
  Modal } from 'react-bootstrap';
import moment from 'moment';
import Datetime from 'react-datetime';
import { getHouseholdMembers } from '../providers/households';
import { getHouseholdIntakes } from '../providers/intakes';

export class AddHouseHoldMember extends React.Component {
  constructor(props) {
    super(props);

    // check if memberData was passed in (in the case of an edit)
    let memberData;
    if (this.props.memberData) {
      memberData = {...this.props.memberData};
    } else {
      memberData = {
        id: undefined,
        householdId: undefined,
        lastName: undefined,
        firstName: undefined,
        DOB: moment(),
        isAdult: false,
        isHeadOfHousehold: false,
        active: false
      }
    }

    this.state = {
      householdData: undefined,
      householdMembers: [],
      memberData
    };
  }

  componentDidMount() {
    console.log('componentDidMount');
    if (this.state.memberData.id) {
      getHouseholdMembers(this.state.memberData.householdId).then((data) => {
        this.setState({ householdMembers: data.members, householdData: data });
      })
    }
  }


  handleMemberFirstNameChange = (e) => {
    const val = e.target.value;
    let memberData = this.state.memberData;
    memberData.firstName = val;
    this.setState({ memberData });
  }

  handleMemberLastNameChange = (e) => {
    const val = e.target.value;
    let memberData = this.state.memberData;
    memberData.lastName = val;
    this.setState({ memberData });
  }

  handleMemberDOBChange = (date) => {
    let memberData = this.state.memberData;
    memberData.DOB = date;
    this.setState({ memberData });
  }

  showAddMemberModal = () => {
    this.setState({ mode, addMemberModalshow: true });
  }
  hideAddMemberModal = () => {
    this.setState({ addMemberModalshow: false });
  }

  save = () => {
    console.log('save');
    this.props.save(this.state.memberData);
  }

  render = (props) => {
    return (
      <div>

      <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-lg">{this.props.mode === 'edit' ? 'Edit' : 'Add'} Member</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    {this.props.memberData ? <p>Member# - {this.props.memberData.id}</p> : <p>Member # will be assiged automatically.</p>}
    <form>
    <FormGroup
      controlId="formBasicText"
    >
      <ControlLabel>First Name</ControlLabel>
      <FormControl
        type="text"
        value={this.state.memberData.firstName}
        placeholder="Enter Member First Name"
        onChange={this.handleMemberFirstNameChange}
      />
      <ControlLabel>Last Name</ControlLabel>
      <FormControl
        type="text"
        value={this.state.memberData.lastName}
        placeholder="Enter Member Last Name"
        onChange={this.handleMemberLastNameChange}
      />
      <ControlLabel>DOB</ControlLabel>
        <Datetime
            value={this.state.memberData.DOB}
            timeFormat={false}
            onChange={this.handleMemberDOBChange}
        />

    </FormGroup>
  </form>

    </Modal.Body>
    <Modal.Footer>
      <Button onClick={this.props.hideModal}>Cancel</Button>
      <Button onClick={this.save}>Save</Button>
    </Modal.Footer>

      </div>
    );
  }
}

export default AddHouseHoldMember;
