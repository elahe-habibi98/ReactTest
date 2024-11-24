import * as Yup from "yup";

export const validationSchema = Yup.object({
  name: Yup.string().required("وارد کردن نام الزامی ست"),
  lastname: Yup.string().required("وارد کردن نام خانوادگی الزامی ست"),
  fatherName: Yup.string().required("وارد کردن نام پدر الزامی ست"),
  phoneNumber: Yup.string()
    .matches(/^\d{11}$/, "شماره همراه باید شامل 11 رقم باشد")
    .required("وارد کردن شماره همراه الزامی ست"),
  grade: Yup.number()
    .oneOf([1, 2], "مقدار نامعتبر")
    .required("Grade is required"),
  university: Yup.string().when("grade", (grade, schema) => {
    if (grade.includes(2)) {
      return schema.required("وارد کردن دانشگاه الزامی ست");
    }
    return schema.notRequired();
  }),
});
