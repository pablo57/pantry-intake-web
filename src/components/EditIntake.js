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
import { createMember } from '../providers/members';
import { getHouseholdMembers } from '../providers/households';
import { getHouseholdIntakes } from '../providers/intakes';
import AddHouseholdMember, { AddHouseHoldMember } from './AddHouseholdMember';

export class EditIntake extends React.Component {
  constructor(props) {
    super(props);

    // check if intakeData was passed in (in the case of an edit)
    let intakeData;
    if (this.props.intakeData) {
      intakeData = {...this.props.intakeData};
    } else {
      intakeData = {
        id: undefined,
        householdId: this.props.memberData.householdId,
        memberId: this.props.memberData.id,
        foodBox: false,
        perishable: false,
        camper: false,
        diaper: false,
        signature: undefined,
        notes: undefined,
        weight: undefined,
        householdCount: undefined,
        active: false,
        created: undefined,
      }
    }

    this.state = {
      memberNumber: '',
      memberLastName: '',
      memberDOB: '',
      householdData: undefined,
      householdMembers: [],
      intakeData
    };
  }

  componentDidMount() {
    console.log('componentDidMount');
    if (this.state.intakeData.id) {
      getHouseholdMembers(this.state.intakeData.householdId).then((data) => {
        this.setState({ householdMembers: data.members, householdData: data });
      })
    }
  }


  handleFoodBoxChange = (e) => {
    const val = e.target.checked;
    let intakeData = this.state.intakeData;
    intakeData.foodBox = val;
    this.setState({ intakeData });
  }

  handlePerishableChange = (e) => {
    const val = e.target.checked;
    let intakeData = this.state.intakeData;
    intakeData.perishable = val;
    this.setState({ intakeData });
  }

  handleDiaperChange = (e) => {
    const val = e.target.checked;
    let intakeData = this.state.intakeData;
    intakeData.diaper = val;
    this.setState({ intakeData });
  }

  handleCamperChange = (e) => {
    const val = e.target.checked;
    let intakeData = this.state.intakeData;
    intakeData.camper = val;
    this.setState({ intakeData });
  }

  handleNotesChange = (e) => {
    const val = e.target.value;
    let intakeData = this.state.intakeData;
    intakeData.notes = val;
    this.setState({ intakeData });
  }

  handleWeightChange = (e) => {
    const val = e.target.value;
    let intakeData = this.state.intakeData;
    intakeData.weight = val;
    this.setState({ intakeData });
  }

  showAddMemberModal = () => {
    this.setState({ addMemberModalshow: true });
  }
  hideAddMemberModal = () => {
    this.setState({ addMemberModalshow: false });
  }

  save = () => {
    this.props.save(this.state.intakeData);
  }

  /**
   * Called by child edit component when requesting to create or update a member.
   */
  saveHouseholdIntakeData = (intakeData) => {
    if (this.state.editMode === 'edit') {
      // this is an update
      updateMember(intakeData).then((data) => {
        // this.setState({ selectedMember: { ...this.state.selectedMember, ...intakeData } });
      });
    } else {
      // create a new household member
      intakeData.householdId = this.state.intakeData.householdId;
      createMember(intakeData).then((data) => {
        this.setState({ householdMembers: [...this.state.householdMembers, data] });
      })
    }

    this.setState({ addMemberModalshow: false });
  }

  render = (props) => {
    return (
      <div>

      <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-lg">{this.props.mode === 'edit' ? 'Edit' : 'Add'} Intake</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <form>
    <FormGroup
      controlId="formBasicText"
    >
      <ControlLabel>Food Box</ControlLabel>
      <FormControl
        type="checkbox"
        value={this.state.intakeData.foodBox}
        onChange={this.handleFoodBoxChange}
      />
      <ControlLabel>Perishable</ControlLabel>
      <FormControl
        type="checkbox"
        value={this.state.intakeData.perishable}
        onChange={this.handlePerishableChange}
      />
      <ControlLabel>Camper</ControlLabel>
      <FormControl
      type="checkbox"
      value={this.state.intakeData.camper}
      onChange={this.handleCamperChange}
      />
      <ControlLabel>Diapers</ControlLabel>
      <FormControl
      type="checkbox"
      value={this.state.intakeData.diaper}
      onChange={this.handleDiaperChange}
      />
      <ControlLabel>Notes</ControlLabel>
      <FormControl
      type="text"
      value={this.state.intakeData.notes}
      placeholder="Enter Intake Notes"
      onChange={this.handleNotesChange}
      />
      <ControlLabel>Weight</ControlLabel>
      <FormControl
      type="text"
      value={this.state.intakeData.weight}
      placeholder="Enter Intake Weight"
      onChange={this.handleWeightChange}
      />

    </FormGroup>
  </form>
      
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
      intakeData={ undefined }
      save={ this.saveHouseholdintakeData }
    />
    </Modal>

      </div>
    );
  }
}

export default EditIntake;
