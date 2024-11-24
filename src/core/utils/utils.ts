export const faNumber = (numb: string, comma?: ",") => {
  let num = numb;
  const hasZero = num[0] === "0";
  if (hasZero) {
    num = "1" + num;
  }
  const farsiNum = new Intl.NumberFormat("fa-IR", {
    useGrouping: comma ? true : false,
  }).format(+num);

  if (hasZero) return farsiNum?.slice(1);
  else return farsiNum;
};
