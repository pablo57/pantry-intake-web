import React from 'react';
import {
  Button,
  ButtonToolbar,
  Table,
  Modal } from 'react-bootstrap';
import SearchMember from './SearchMember';
import EditMember from './EditMember';
import EditIntake from './EditIntake';
import AddHouseHoldMember from './AddHouseholdMember';
import { createMember, updateMember } from '../providers/members';
import { getHouseholdIntakes, createIntake, updateIntake } from '../providers/intakes';
import { getHouseholdMembers } from '../providers/households';


export class DashboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMember: undefined,
      householdData: undefined,
      householdMembers: [],
      householdIntakes: [],
      editMode: undefined
    };
  }

  /**
   * Passed down to be called by child search component when clicking confirm
   * for selecting the desired member from the search results.
   */
  memberSelected = (member) => {
    this.setState({ searchModalshow: false, selectedMember: member });

    getHouseholdMembers(member.householdId).then((data) => {
      this.setState({ householdMembers: data.members, householdData: data });
    })

    getHouseholdIntakes(member.householdId).then((intakes) => {
      this.setState({ householdIntakes: intakes });
    });
  }

  showSearchModal = () => {
    this.setState({ searchModalshow: true });
  }
  hideSearchModal = () => {
    this.setState({ searchModalshow: false, mode: undefined });
  }

  showEditModal = (mode) => {
    this.setState({ mode, editModalshow: true });
  }
  hideEditModal = () => {
    this.setState({ editModalshow: false, mode: undefined });
  }

  // Returns the latest intake (if it exists) for the current household.
  // Passed on to the the editIntake component to provide the data to be edited.
  // NOTE: This assumes the last item in the householdIntakes array to be the latest intake.
  // getLatestIntake() {
  //   console.log(this.state.householdIntakes.reverse());
  //   return this.state.householdIntakes.length > 0
  //     ? this.state.householdIntakes.reverse()[0]
  //     : undefined;
  // }
  showEditIntakeModal = (mode) => {

    this.setState({ mode, editIntakeModalshow: true });
  }
  hideEditIntakeModal = () => {
    this.setState({ editIntakeModalshow: false, mode: undefined });
  }

  showAddMemberModal = () => {
    this.setState({ addMemberModalshow: true });
  }
  hideAddMemberModal = () => {
    this.setState({ addMemberModalshow: false, mode: undefined });
  }

  /**
   * Called when user clicks on clear button. Used to clear the state and remove
   * the currently selected member.
   */
  handleClear = () => {
    this.setState({
      selectedMember: undefined,
      householdData: undefined,
      householdMembers: [],
      householdIntakes: [],
      editMode: undefined
    });
  }

  /**
   * Called by child edit component when requesting to create or update a member.
   */
  saveMemberData = (memberData) => {
    if (this.state.selectedMember && this.state.selectedMember.id) {
      // this is an update
      updateMember(memberData).then((data) => {
        this.setState({ selectedMember: { ...this.state.selectedMember, ...data } });
      });
    } else {
      // create a new member
      createMember(memberData).then((data) => {
        this.setState({ selectedMember: { ...data } });
      })
    }

    this.setState({ editModalshow: false });
  }

  /**
   * Called by child edit component when requesting to create an intake.
   */
  saveIntakeData = (intakeData) => {

    intakeData.householdId = this.state.householdData.id;
    intakeData.memberId = this.state.selectedMember.id;
    intakeData.householdCount = this.state.householdMembers.length;

    if (intakeData.id) {
      // this is an update
      updateIntake(intakeData).then((data) => {
        let intakes = this.state.householdIntakes.map((intake) => {
          if (intake.id === data.id) {
              return {
                  ...intake,
                  ...data
              };
          } else {
              return intake;
          }
        });

        this.setState({ householdIntakes: intakes });
      });
    } else {
      createIntake(intakeData).then((data) => {
        this.setState({ householdIntakes: [...this.state.householdIntakes, data] });
      });
    }
    this.setState({ editIntakeModalshow: false });
  }

  /**
   * Called by child edit component when requesting to create or update a member.
   */
  saveHouseholdMember = (memberData) => {
    // create a new household member
    memberData.householdId = this.state.householdData.id;
    createMember(memberData).then((data) => {
      this.setState({ householdMembers: [...this.state.householdMembers, data] });
    });

    this.setState({ addMemberModalshow: false });
  };

  render = (props) => {
    return (
      <div>
        <Button bsStyle="primary" onClick={this.showSearchModal}>
          Search
        </Button>
        {
          this.state.selectedMember ? (
            <div>
              <Button bsStyle="primary" onClick={ this.handleClear }>
                Clear
              </Button>
            </div>
          ) : (
              <Button bsStyle="primary" onClick={() => this.showEditModal('add')}>
                Create Member
              </Button>
          )
        }
        {
          this.state.selectedMember ? (
            <div>
              <h3>Member Info</h3>
              { this.state.selectedMember && (
                <Button bsStyle="primary" onClick={() => this.showEditModal('edit')}>
                  Edit
                </Button>
              )}
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
                  <tr>
                  <td>{this.state.selectedMember.id}</td>
                  <td>{this.state.selectedMember.firstName}</td>
                  <td>{this.state.selectedMember.lastName}</td>
                  <td>{this.state.selectedMember.DOB.format('MM/DD/YYYY')}</td>
                </tr>
                </tbody>
              </Table>
            </div>
          ) : (<h4>No Member Selected. Please search for and select a member or create a new member to start.</h4>)
        }
        <hr/>
        { this.state.selectedMember && (
          <div>
            <h3>HouseHold</h3>
            <Button bsStyle="primary" onClick={this.showAddMemberModal}>Add Household Member</Button>
            {
              this.state.householdMembers.length > 1 ? (

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
                    this.state.householdMembers && this.state.householdMembers.filter((data) => data.id !== this.state.selectedMember.id).map((data) => (
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
              ) : (<p>No other members</p>)
            }
          </div>
        )}
        <hr/>
        {
          this.state.selectedMember && (
          <div>
            <h3>Intake History</h3>
            <Button bsStyle="primary" onClick={() => this.showEditIntakeModal('create')}>
              Create Intake
            </Button>
            {
              this.state.householdIntakes.length > 0 && (
                <Button bsStyle="primary" onClick={() => this.showEditIntakeModal('edit')}>
                  Edit Latest Intake
                </Button>
              )
            }
            {
              this.state.householdIntakes.length > 0 ? (
                  <div>
                    <Table striped bordered condensed hover>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>FoodBox</th>
                        <th>Perishables</th>
                        <th>Camper</th>
                        <th>Diapers</th>
                        <th>Notes</th>
                        <th>Household Count</th>
                        <th>Weight</th>
                        <th>Member</th>
                        <th>Signature</th>
                      </tr>
                    </thead>
                      <tbody>
                      {
                        this.state.householdIntakes && this.state.householdIntakes.map((intake) => (
                          <tr key={intake.id}>
                            <td>{intake.created.format('MM/DD/YYYY')}</td>
                            <td><input type="checkbox" checked={intake.foodBox} readOnly disabled /></td>
                            <td><input type="checkbox" checked={intake.perishable} readOnly disabled /></td>
                            <td><input type="checkbox" checked={intake.camper} readOnly disabled /></td>
                            <td><input type="checkbox" checked={intake.diaper} readOnly disabled /></td>
                            <td>{intake.notes}</td>
                            <td>{intake.householdCount}</td>
                            <td>{intake.weight}</td>
                            <td>
                            {
                              this.state.householdMembers.map((member) => {
                                if (member.id === intake.memberId) {
                                  return (<p key={member.id}>{`${member.firstName} ${member.lastName}`}</p>)
                                }
                              })
                            }
                            </td>
                            <td>
                              {
                                intake.signature
                                ? <img className='sigImage' src={intake.signature} />
                                : <p>No signature</p>
                              }
                            </td>
                          </tr>
                        ))
                      }
                      </tbody>
                    </Table>
                  </div>
              ) : (<h4>No Intake History</h4>)
            }
          </div>
        )}

        <ButtonToolbar>

        <Modal
          show={this.state.searchModalshow}
          onHide={this.hideSearchModal}
          dialogClassName="custom-modal"
        >
          <SearchMember hideModal={this.hideSearchModal} handleConfirm={this.memberSelected} />
        </Modal>

        <Modal
          show={this.state.editModalshow}
          onHide={this.hideEditModal}
          dialogClassName="custom-modal"
        >
          <EditMember
            hideModal={ this.hideEditModal }
            mode={ this.state.mode }
            memberData={ this.state.selectedMember }
            save={ this.saveMemberData }
          />
        </Modal>

        <Modal
          show={this.state.editIntakeModalshow}
          onHide={this.hideEditIntakeModal}
          dialogClassName="custom-modal"
        >
          <EditIntake
            hideModal={ this.hideEditIntakeModal }
            mode={ this.state.mode }
            intakeData={ this.state.mode === 'edit'
              ? this.state.householdIntakes[this.state.householdIntakes.length - 1]
              : undefined
            }
            save={ this.saveIntakeData }
          />
        </Modal>

        <Modal
          show={this.state.addMemberModalshow}
          onHide={this.hideAddMemberModal}
          dialogClassName="custom-modal"
        >
          <AddHouseHoldMember
            hideModal={ this.hideAddMemberModal }
            mode={ 'add' }
            memberData={ undefined }
            save={ this.saveHouseholdMember }
          />
        </Modal>
        </ButtonToolbar>

      </div>
    );
  }
}

export default DashboardPage;
