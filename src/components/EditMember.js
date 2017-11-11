import React from 'react';
import { Button, FormGroup, Form, ControlLabel, FormControl, ButtonToolbar, Modal } from 'react-bootstrap';

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
        DOB: undefined,
        isAdult: false,
        isHeadOfHousehold: false,
        active: false
      }
    }

    this.state = {
      memberNumber: '',
      memberLastName: '',
      memberDOB: '',
      matchedData: [],
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
      <FormControl
      type="text"
      value={this.state.memberData.DOB}
      placeholder="Enter Member DOB"
      onChange={this.handleMemberDOBChange}
    />

    </FormGroup>
  </form>
      <h4>HouseHold</h4>
      <Button >Add Household Member</Button>
      {
        this.state.matchedData.length === 0 ? (<p>No other members</p>) : (
          this.state.matchedData.map((data) => (
            <div key={data.id}>
              <p>Id: {data.id}</p>
              <p>Name: {data.lastName}, {data.FirstName}</p>
              <hr/>
            </div>
          ))
        )
      }
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
