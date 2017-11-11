import axios from 'axios';

/**
 * Perform a GET call on households endpoint to get all members for that household.
 * 
 * @param {*} id The id of the household to get the members for.
 */
export const getHouseholdMembers = (id) => {
    return axios({
        method:'get',
        url:`http://localhost:8081/v1/households/${id}?members=true`,
    })
    .then((response) => {
        let data = response.data.data;
        
        // need to serialize the data
        let householdData =  {
            id: data.Id,
            name: data.Name,
            applicationDate: data.ApplicaitonDate,
            renewalDate: data.RenewalDate,
            created: data.Created,
            changd: data.Changed,
            members: data.members.map((member) => {
                return {
                    id: member.Id,
                    householdId: member.HouseholdId,
                    lastName: member.LastName,
                    firstName: member.FirstName,
                    DOB: member.DOB,
                    isAdult: member.IsAdult,
                    isHeadOfHousehold: member.IsHeadOfHousehold,
                    active: member.Active,
                    created: member.Created,
                    changd: member.Changed
                }
            })
        }
        return householdData;
    }).catch((error) => {
        console.log('error posting member data.', error);
    });
};