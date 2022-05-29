import { format } from "date-fns";

export const timeFormat = (
  date: Date,
  formatString = "yyyy-MM-dd HH:mm:ss",
) => {
  if (!Date) {
    throw new Error("请传入正确的时间");
  }
  return format(date, formatString);
};
