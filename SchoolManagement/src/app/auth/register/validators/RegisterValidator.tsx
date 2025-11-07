import * as yup from "yup";

export const RegisterValidator = yup.object().shape({
  Username: yup.string().required("प्रयोगकर्ताको नाम आवश्यक छ"),
  Email: yup
    .string()
    .email("मान्य इमेल ठेगाना आवश्यक छ")
    .required("इमेल आवश्यक छ"),
  Password: yup
    .string()
    .required("पासवर्ड आवश्यक छ")
    .min(8, "पासवर्ड कम्तिमा ८ अक्षरको हुनुपर्छ"),
  CompanyName: yup.string().required("कम्पनीको नाम आवश्यक छ"),
  Address: yup.string().required("ठेगाना आवश्यक छ"),
  CompanyShortName: yup.string().required("कम्पनी संक्षिप्त नाम आवश्यक छ"),
  ContactNumber: yup
    .string()
    .required("सम्पर्क नम्बर आवश्यक छ")
    .matches(/^[0-9]{7,15}$/, "मान्य फोन नम्बर हुनुपर्छ"),
  ContactPerson: yup.string().required("सम्पर्क व्यक्ति आवश्यक छ"),
  PAN: yup
    .string()
    .optional()
    .matches(/^\d{9}$/, "९ अंकको मान्य PAN नम्बर प्रविष्ट गर्नुहोस्"),
});
