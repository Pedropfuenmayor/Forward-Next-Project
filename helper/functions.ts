import { getOQ } from "../models/models";

export const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export function uid() {
  return Math.floor(Math.random() * (1000000000 - 1) + 1);
}

export const sqlQuery = (challenges) => {
  let sql = "";

  for (let i = 0; i < challenges.length; i++) {
    sql += `when id = ${challenges[i].id} then ${challenges.indexOf(
      challenges[i]
    )} `;
  }
  return sql;
};

export const validateOQ = (oq: getOQ) => {
  if (oq.getOQ) {
    if (oq.getOQ.id !== 0) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
