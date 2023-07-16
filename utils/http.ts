export const getDataFromServer = async (limit: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_LINK}data?limit=${limit}`
  );
  const data = await res.json();
  return data;
};
