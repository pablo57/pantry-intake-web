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
import { createMember } from '../providers/members';
import AddHouseholdMember, { AddHouseHoldMember } from './AddHouseholdMember';

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

  handleMemberDOBChange = (e) => {
    const val = e.target.value;
    let memberData = this.state.memberData;
    memberData.DOB = val;
    this.setState({ memberData });
  }

  showAddMemberModal = () => {
    this.setState({ addMemberModalshow: true });
  }
  hideAddMemberModal = () => {
    this.setState({ addMemberModalshow: false });
  }

  onDateChange = (date) => {
    if (date) {
      let memberData = this.state.memberData;
      memberData.DOB = date;
      this.setState(() => ({ memberData }));
    }
  };

  onFocusedChange = ({ focused }) => {
      this.setState(() => ({ calendarFocused: focused }));
  };

  save = () => {
    console.log('save data: ', this.state.memberData);
    this.props.save(this.state.memberData);
  }

  /**
   * Called by child edit component when requesting to creat a new member for the household.
   */
  saveHouseholdMemberData = (memberData) => {
    this.props.saveHouseholdMember(memberData);
    this.setState({ addMemberModalshow: false });
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
        onChange={this.onDateChange}
      />
    </FormGroup>
  </form>
      <h4>HouseHold</h4>
      <Button onClick={this.showAddMemberModal}>Add Household Member</Button>
      {
        this.props.householdMembers && this.props.householdMembers.length === 0 ? (<p>No other members</p>) : (
          
            <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>Member#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>DOB</th>
              </tr>
            </thead>
            <tbody>
            {
              this.props.householdMembers && this.props.householdMembers.map((data) => (
                <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td>{data.DOB.format('MM/DD/YYYY')}</td>
              </tr>
              ))
            }
            </tbody>
          </Table>
        )
      }
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={this.props.hideModal}>Cancel</Button>
      <Button onClick={this.save}>Save</Button>
    </Modal.Footer>

    <Modal
      show={this.state.addMemberModalshow}
      onHide={this.hideAddMemberModal}
      dialogClassName="custom-modal"
    >
    <AddHouseHoldMember 
      hideModal={ this.hideAddMemberModal }
      mode={ 'add' }
      memberData={ undefined }
      save={ this.saveHouseholdMemberData }
    />
    </Modal>

      </div>
    );
  }
}

export default EditMember;
