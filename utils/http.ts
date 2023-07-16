export const getDataFromServer = async () => {
  const res = await fetch(process.env.NEXT_APP_API_LINK as string);
  const data = await res.json();
  return data;
};
