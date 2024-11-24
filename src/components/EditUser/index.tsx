import { useQueryClient } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUserEdit } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import {
  Button,
  Col,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";

import { TFormValues } from "@core/models/createUser.model";
import { useEditUser, useGetUserInfo } from "@core/services/api/user.api";
import { validationSchema } from "@core/services/validation/createUser";

const EditUser: FC = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<TFormValues>({
    name: "",
    lastname: "",
    fatherName: "",
    phoneNumber: "",
    grade: 1,
    university: "",
  });

  const editUser = useEditUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: result, isSuccess } = useGetUserInfo(+id!);

  const gradeOptions = [
    { value: 1, label: "دیپلم" },
    { value: 2, label: "لیسانس" },
  ];

  useEffect(() => {
    if (isSuccess) {
      const initialVal = {
        name: result.data.name,
        lastname: result.data.lastname,
        fatherName: result.data.fatherName,
        phoneNumber: result.data.phoneNumber,
        grade: result.data.grade,
        university: result.data.university,
      };
      setInitialValues(initialVal);
    }
  }, [result, isSuccess]);

  const onSubmit = (values: TFormValues) => {
    setLoading(true);
    const obj = {
      name: values.name,
      lastname: values.lastname,
      fatherName: values.fatherName,
      phoneNumber: values.phoneNumber,
      grade: values.grade,
      university: values.university,
    };
    editUser.mutate(
      { id: +id!, obj: obj },
      {
        onSuccess: () => {
          toast.success("اطلاعات با موفقیت ویرایش شد.");
          setLoading(false);
          queryClient.invalidateQueries({ queryKey: ["userList"] });
          navigate(-1);
        },
        onError: (err) => {
          toast.error(err.message);
          setLoading(false);
        },
      }
    );
  };
  return (
    <div className="" dir="rtl">
      <div className="d-flex gap-2 align-items-end mb-5">
        <FaUserEdit color="#854055" size={30} />
        <span className="" style={{ fontSize: "20px" }}>
          ویرایش اطلاعات کاربری
        </span>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            <Row>
              <Col sm={12} md={6} lg={3}>
                {/* Name Input */}
                <FormGroup>
                  <Label for="name" className="font-iranSans">
                    نام
                  </Label>
                  <Field
                    as={Input}
                    id="name"
                    name="name"
                    type="text"
                    invalid={touched.name && !!errors.name}
                  />
                  <ErrorMessage name="name" component={FormFeedback} />
                </FormGroup>
              </Col>

              <Col sm={12} md={6} lg={3}>
                {/* Last Name Input */}
                <FormGroup>
                  <Label for="lastname" className="font-iranSans">
                    نام خانوادگی
                  </Label>
                  <Field
                    as={Input}
                    id="lastname"
                    name="lastname"
                    type="text"
                    invalid={touched.lastname && !!errors.lastname}
                  />
                  <ErrorMessage name="lastname" component={FormFeedback} />
                </FormGroup>
              </Col>

              <Col sm={12} md={6} lg={3}>
                {/* Father's Name Input */}
                <FormGroup>
                  <Label for="fatherName" className="font-iranSans">
                    نام پدر
                  </Label>
                  <Field
                    as={Input}
                    id="fatherName"
                    name="fatherName"
                    type="text"
                    invalid={touched.fatherName && !!errors.fatherName}
                  />
                  <ErrorMessage name="fatherName" component={FormFeedback} />
                </FormGroup>
              </Col>

              <Col sm={12} md={6} lg={3}>
                {/* Phone Number Input */}
                <FormGroup>
                  <Label for="phoneNumber" className="font-iranSans">
                    شماره همراه
                  </Label>
                  <Field
                    as={Input}
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    invalid={touched.phoneNumber && !!errors.phoneNumber}
                  />
                  <ErrorMessage name="phoneNumber" component={FormFeedback} />
                </FormGroup>
              </Col>

              <Col sm={12} md={6} lg={3}>
                {/* Grade Select */}
                <FormGroup>
                  <Label for="grade" className="font-iranSans">
                    تحصیلات
                  </Label>
                  <Field name="grade">
                    {() => (
                      <Select
                        name="grade"
                        options={gradeOptions}
                        value={gradeOptions.find(
                          (option) => option.value === values.grade
                        )}
                        placeholder=""
                        onChange={(selectedOption: any) =>
                          setFieldValue("grade", selectedOption?.value)
                        }
                      />
                    )}
                  </Field>
                  <ErrorMessage name="grade" component={FormFeedback} />
                </FormGroup>
              </Col>

              <Col sm={12} md={6} lg={3}>
                {/* University Field */}
                <FormGroup>
                  <Label for="university" className="font-iranSans">
                    دانشگاه
                  </Label>
                  <Field
                    as={Input}
                    id="university"
                    name="university"
                    type="text"
                    disabled={values.grade !== 2}
                    invalid={touched.university && !!errors.university}
                  />
                  <ErrorMessage name="university" component={FormFeedback} />
                </FormGroup>
              </Col>
            </Row>
            <div className="d-flex gap-3 justify-content-end py-3">
              <Button
                style={{ backgroundColor: "transparent" }}
                onClick={() => navigate(-1)}
              >
                <span className="font-iranSans text-black">بازگشت</span>
              </Button>
              <Button
                disabled={loading}
                type="submit"
                style={{ backgroundColor: "#854055" }}
              >
                {loading ? (
                  <Spinner size="sm" />
                ) : (
                  <span className="font-iranSans">ثبت</span>
                )}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export { EditUser };
