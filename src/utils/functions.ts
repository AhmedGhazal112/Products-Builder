// export function textSlicer(s: string) {
//   const arr = s.split(" ");
//   if (arr.length > 40) {
//     return arr.slice(0, 20).join(" ") + "...";
//   } else return s;
// }
export function textSlicer(s: string) {
  if (s.length >= 50) {
    return s.slice(0, 50) + "...";
  } else return s;
}
