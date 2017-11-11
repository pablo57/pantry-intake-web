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
                changed: data.Changed,
            }
        });
        return intakes;
    }).catch((error) => {
        console.log('error posting member data.', error);
    });
};

export const createIntake = (intakeData) => {
    let requestData = {
        HouseholdId: intakeData.householdId,
        MemberId: intakeData.memberId,
        FoodBox: intakeData.foodBox,
        Perishable: intakeData.perishable,
        Camper: intakeData.camper,
        Diaper: intakeData.diaper,
        Notes: intakeData.notes ? intakeData.notes : null,
        Weight: intakeData.weight ? intakeData.weight : 0,
        Active: intakeData.active ? intakeData.active : true
    }

    return axios({
        method:'post',
        url:`http://localhost:8081/v1/intakes`,
        data: requestData
    })
    .then((response) => {
        console.log(response);
        let data = response.data.data;
        // serialize the data
        const intakeResponseData = {
            id: data.Id,
            householdId: data.HouseholdId,
            memberId: data.MemberId,
            foodBox: data.FoodBox,
            perishable: data.Perishable,
            camper: data.Camper,
            diaper: data.Diaper,
            signature: data.Signature ? data.Signature : null,
            notes: data.Notes,
            weight: data.Weight ? data.Weight : null,
            active: data.Active,
            created: data.Created ? data.Created : null,
            changed: data.Changed ? data.Changed : null,
        };
        console.log(intakeResponseData);
        return intakeResponseData;
    }).catch((error) => {
        console.log('error posting member data.', error);
    });
};