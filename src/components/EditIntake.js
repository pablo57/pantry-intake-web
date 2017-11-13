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
      intakeData
    };
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

  save = () => {
    this.props.save(this.state.intakeData);
  }

  render = () => {
    return (
      <div>

        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">{this.props.mode === 'edit' ? 'Edit' : 'Add'} Intake</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <FormGroup controlId="formBasicText">
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

      </div>
    );
  }
}

export default EditIntake;
