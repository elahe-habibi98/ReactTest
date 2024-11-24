import { useQueryClient } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import Select from "react-select";
import {
  Button,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Spinner,
} from "reactstrap";

import { TFormValues } from "@core/models/createUser.model";
import { useCreateUser } from "@core/services/api/user.api";
import { validationSchema } from "@core/services/validation/createUser";

interface IAddUserProp {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddUser: FC<IAddUserProp> = ({
  showModal,
  setShowModal,
}): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues: TFormValues = {
    name: "",
    lastname: "",
    fatherName: "",
    phoneNumber: "",
    grade: 1,
    university: "",
  };
  const gradeOptions = [
    { value: 1, label: "دیپلم" },
    { value: 2, label: "لیسانس" },
  ];

  const createUser = useCreateUser();
  const queryClient = useQueryClient();

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

    createUser.mutate(obj, {
      onSuccess: () => {
        toast.success("کاربر با موفقیت ایجاد شد.");
        setLoading(false);
        queryClient.invalidateQueries({ queryKey: ["userList"] });
        setShowModal(!showModal);
      },
      onError: (err) => {
        toast.error(err.message);
        setLoading(false);
        setShowModal(!showModal);
      },
    });
  };
  return (
    <div>
      <Modal
        isOpen={showModal}
        toggle={() => setShowModal(!showModal)}
        centered
        dir="rtl"
      >
        <ModalHeader>
          <span className="font-iranSans">ایجاد کاربر جدید</span>
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ values, errors, touched, setFieldValue }) => (
              <Form>
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
                        placeholder=""
                        onChange={(selectedOption: any) =>
                          setFieldValue("grade", selectedOption?.value)
                        }
                      />
                    )}
                  </Field>
                  <ErrorMessage name="grade" component={FormFeedback} />
                </FormGroup>

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
                <div className="d-flex gap-3 justify-content-end">
                  <Button
                    color="danger"
                    onClick={() => setShowModal(!showModal)}
                  >
                    <span className="font-iranSans">انصراف</span>
                  </Button>
                  <Button color="success" disabled={loading} type="submit">
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
        </ModalBody>
      </Modal>
    </div>
  );
};

export { AddUser };
