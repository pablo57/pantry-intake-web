import React from 'react';
import {
  Button,
  FormGroup,
  Form,
  ControlLabel,
  FormControl,
  ButtonToolbar,
  Table,
  Modal,
  Well } from 'react-bootstrap';
import SignatureCanvas from 'react-signature-canvas'

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

    this.sigPad = {}
    this.state = {
      intakeData,
      sigPadIsEmpty: true
    };
  }

  componentDidMount() {
    this.sigPad.fromDataURL(this.state.intakeData.signature);
  }

  clear = (e) => {
    e.preventDefault();
    this.sigPad.clear();
    this.setState({ sigPadIsEmpty: this.sigPad.isEmpty() });
  }
  sigPadOnEndOfStroke = () => {
    this.setState({ sigPadIsEmpty: this.sigPad.isEmpty() });
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
    let signature = this.sigPad
      .getTrimmedCanvas()
      .toDataURL('image/png');

    let intakeData = {
      ...this.state.intakeData,
      signature
    };

    this.props.save(intakeData);
  }

  render = () => {
    return (
      <div>

        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">{this.props.mode === 'edit' ? 'Edit' : 'Create'} Intake</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <FormGroup controlId="formBasicText">
              <ControlLabel>Food Box</ControlLabel>
              <FormControl
                type="checkbox"
                checked={this.state.intakeData.foodBox}
                value={this.state.intakeData.foodBox}
                onChange={this.handleFoodBoxChange}
              />

              <ControlLabel>Perishable</ControlLabel>
              <FormControl
                type="checkbox"
                checked={this.state.intakeData.perishable}
                onChange={this.handlePerishableChange}
              />

              <ControlLabel>Camper</ControlLabel>
              <FormControl
                type="checkbox"
                checked={this.state.intakeData.camper}
                onChange={this.handleCamperChange}
              />

              <ControlLabel>Diapers</ControlLabel>
              <FormControl
                type="checkbox"
                checked={this.state.intakeData.diaper}
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
              <ControlLabel>Signature</ControlLabel>
              {
                <Well>
                  <div className='sigContainerContainer'>
                    <div className='sigContainer'>
                      <SignatureCanvas
                        canvasProps={{width: 500, height: 200, className: 'sigPad'}}
                        ref={(ref) => { this.sigPad = ref }}
                        onEnd={this.sigPadOnEndOfStroke}
                      />
                    </div>
                    <div>
                      <button className="sigButtons" onClick={this.clear}>
                        Clear
                      </button>
                    </div>
                    { this.state.signature && <img className='sigImage' src={this.state.signature} /> }
                  </div>
                </Well>
              }

          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.props.hideModal}>Cancel</Button>
          {this.sigPad && <Button onClick={this.save} disabled={this.state.sigPadIsEmpty}>Save</Button>}

        </Modal.Footer>

      </div>
    );
  }
}

export default EditIntake;
