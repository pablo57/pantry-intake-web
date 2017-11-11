import axios from 'axios';

/**
 * Perform a GET call on intakes endpoint
 * 
 * @param {*} id The id of the household to get intakes for.
 */
export const getHouseholdIntakes = (id) => {
    return axios({
        method:'get',
        url:`http://localhost:8081/v1/intakes?household_id=${id}`,
    })
    .then((response) => {

        // need to serialize the data
        let intakes = response.data.data.map((data) => {
            return {
                id: data.Id,
                householdId: data.HouseholdId,
                memberId: data.MemberId,
                foodBox: data.FoodBox,
                perishable: data.Perishable,
                camper: data.Camper,
                diaper: data.Diaper,
                signature: data.Signature,
                notes: data.Notes,
                weight: data.Weight,
                householdCount: data.HouseholdCount,
                active: data.Active,
                created: data.Created,
                changd: data.Changed,
            }
        });
        return intakes;
    }).catch((error) => {
        console.log('error posting member data.', error);
    });
};