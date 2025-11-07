import * as yup from "yup";

export const LoginValidator = yup.object().shape({
  email: yup
    .string()
    .email("मान्य इमेल ठेगाना आवश्यक छ")
    .required("इमेल आवश्यक छ"),
  password: yup
    .string()
    .required("पासवर्ड आवश्यक छ")
    .min(8, "पासवर्ड कम्तिमा ८ अक्षरको हुनुपर्छ"),
});
