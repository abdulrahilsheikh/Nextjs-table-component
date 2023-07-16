export const getDataFromServer = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_LINK}data`);
  const data = await res.json();
  return data;
};
