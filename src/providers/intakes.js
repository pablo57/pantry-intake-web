import axios from 'axios';
import moment from 'moment';

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
                created: data.Created ? moment(data.Created) : moment(0),
                changed: data.Changed ? moment (data.Changed) : moment(0)
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
        Notes: intakeData.notes,
        Weight: intakeData.weight,
        Active: intakeData.active
    }

    return axios({
        method:'post',
        url:`http://localhost:8081/v1/intakes`,
        data: requestData
    })
    .then((response) => {
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
            signature: data.Signature,
            notes: data.Notes,
            weight: data.Weight,
            active: data.Active,
            created: data.Created ? moment(data.Created) : moment(0),
            changed: data.Changed ? moment (data.Changed) : moment(0)
        };
        return intakeResponseData;
    }).catch((error) => {
        console.log('error posting member data.', error);
    });
};