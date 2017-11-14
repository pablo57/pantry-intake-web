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

export class EditMember extends React.Component {
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
      memberData
    };
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

  onDateChange = (date) => {
    if (date) {
      let memberData = this.state.memberData;
      memberData.DOB = date;

      // Use the selected date to determine whether the user is 18 years or older.
      let years = moment().diff(date, 'years');
      if (years >= 18) {
        memberData.isAdult = true;
      } else {
        memberData.isAdult = false;
      }

      this.setState(() => ({ memberData }));
    }
  };

  handleMemberIsHeadOfHouseholdChange = (e) => {
    const val = e.target.checked;
    let memberData = this.state.memberData;
    memberData.isHeadOfHousehold = val;
    this.setState({ memberData });
  };

  onFocusedChange = ({ focused }) => {
      this.setState(() => ({ calendarFocused: focused }));
  };

  save = () => {
    this.props.save(this.state.memberData);
  }

  render = (props) => {
    return (
      <div>

        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">{this.props.mode === 'edit' ? 'Edit' : 'Create'} Member</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {this.props.memberData ? <p>Member# - {this.props.memberData.id}</p> : <p>Member # will be assiged automatically.</p>}
          <form>
            <FormGroup controlId="formBasicText">
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
                onChange={this.onDateChange}
              />

              <ControlLabel>Adult</ControlLabel>
              <FormControl
                type="checkbox"
                checked={this.state.memberData.isAdult}
                placeholder="Enter Member Last Name"
                readOnly
                disabled
              />

              <ControlLabel>Head Of Household</ControlLabel>
              <FormControl
                type="checkbox"
                checked={this.state.memberData.isHeadOfHousehold}
                placeholder="Enter Member Last Name"
                onChange={this.handleMemberIsHeadOfHouseholdChange}
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

export default EditMember;
