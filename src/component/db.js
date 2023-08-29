import { $host } from "../http";

const getUser = async () => {
  const res = await $host.get("api/v1/");
};
export const data = [
  {
    id: 1,
    url: "Abdulaxad",
    name: "Kuchkarov",
    name2: "Abdulaxad Maratovich",
    tel: "+998903572528",
    companyName: "IT park",
    jobName: "Executive director",
    instagram: "",
    telegram: "https://t.me/s/akuchkarov",
    linkedin: "",
    facebook: "",
    avatar: require("../assets/img/behzod-aka-avatar.JPG"),
    pallete: {
      main: { red: 255, green: 255, blue: 255 },
      secondary: { red: 0, green: 0, blue: 0 },
    },
  },
];
