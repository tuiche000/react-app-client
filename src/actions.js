export const SET_FOLIDAY_TOKEN='folidayToken';

export function setFolidayToken(folidayToken){
  console.log(folidayToken)
  return {
    type: SET_FOLIDAY_TOKEN,
    value: folidayToken
  };
}
