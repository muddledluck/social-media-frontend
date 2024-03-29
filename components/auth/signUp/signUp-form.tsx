import LightButton from "@/globalComponents/buttons/light-button.component";
import InputGroup from "@/globalComponents/inputGroup/input-group.component";
import { Form, Formik, FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useState } from "react";
import {
  AiOutlineGoogle,
  AiFillApple,
  AiFillEyeInvisible,
  AiFillEye,
} from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { CgGenderFemale, CgGenderMale } from "react-icons/cg";
import styles from "../auth.module.css";
import { BiLockAlt } from "react-icons/bi";
import FormWrapper from "@/components/auth/component/formWrapper";
import FormHead from "@/components/auth/component/formHead";
import { signUpThunk } from "@/slice/userSlices";
import { useDispatch } from "store/store";
import CustomErrorTag from "@/globalComponents/errors";
import { isDeveloperEnvironment } from "@/utils/serverUrl";
interface Values {
  email: string;
  name: string;
  password: string;
  gender: "male" | "female";
  dob: string;
}

const BUTTON_CONTENT = [
  {
    title: "Log in with Google",
    key: "google",
    symbol: <AiOutlineGoogle />,
  },
  {
    title: "Log in with Apple",
    key: "apple",
    symbol: <AiFillApple />,
  },
];

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export default function SignUpForm() {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      dob: new Date().toLocaleDateString(),
      gender: "male",
    },
    onSubmit: async (
      values: Values,
      { setSubmitting }: FormikHelpers<Values>
    ) => {
      dispatch(signUpThunk(values));
    },
    validationSchema: SignupSchema,
  });
  const togglePasswordVisibility = () =>
    setIsVisiblePassword(!isVisiblePassword);
  const afterSymbol = () => {
    return isVisiblePassword ? (
      <span onClick={togglePasswordVisibility}>
        <AiFillEyeInvisible className="w-25" />
      </span>
    ) : (
      <span onClick={togglePasswordVisibility}>
        <AiFillEye />
      </span>
    );
  };

  const { touched, errors } = formik;
  return (
    <FormWrapper>
      <FormHead
        title="Getting Started"
        subTitle="Create an account to continue and connect with the people."
      />
      {isDeveloperEnvironment ? (
        <>
          <div className={styles.auth_box_button}>
            {BUTTON_CONTENT.map((content) => {
              return (
                <LightButton key={content.key}>
                  <span>{content.symbol}</span> {content.title}
                </LightButton>
              );
            })}
          </div>
          <div className={styles.auth_box_divider}>
            <span>OR</span>
          </div>
        </>
      ) : null}
      <Formik
        initialValues={formik.initialValues}
        onSubmit={() => formik.handleSubmit()}
      >
        <Form>
          <InputGroup
            symbol={<MdAlternateEmail />}
            className="mb-3"
            placeholder="Your Email"
            id="email"
            name="email"
            ariaDescribedBy="emailHelp"
            onChange={formik.handleChange}
            value={formik.values.email}
            type="email"
          />
          <CustomErrorTag>
            {errors.email && touched.email ? errors.email : null}
          </CustomErrorTag>
          <InputGroup
            symbol={<BsFillPersonFill />}
            className="mb-3"
            placeholder="Your Name"
            id="name"
            name="name"
            ariaDescribedBy="nameHelp"
            onChange={formik.handleChange}
            value={formik.values.name}
            type="text"
          />
          <CustomErrorTag>
            {errors.name && touched.name ? errors.name : null}
          </CustomErrorTag>
          <InputGroup
            symbol={<BiLockAlt />}
            className="mb-3"
            placeholder="Your Password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            type={isVisiblePassword ? "text" : "password"}
            afterSymbol={afterSymbol()}
          />
          <CustomErrorTag>
            {errors.password && touched.password ? errors.password : null}
          </CustomErrorTag>
          {isDeveloperEnvironment ? (
            <div className="mb-3 d-inline-flex  justify-content-between">
              <div className="w-50 mr-1">
                <input
                  className="form-control w-100"
                  id="dob"
                  name="dob"
                  placeholder="Date of birth"
                  type="date"
                  value={formik.values.dob}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="form-control ms-1 w-50 d-flex justify-content-around">
                <span
                  className={`${styles.auth_box_form_input_icon} input-group-text`}
                >
                  {formik.values.gender === "male" ? (
                    <CgGenderMale />
                  ) : (
                    <CgGenderFemale />
                  )}
                </span>
                <div className="pt-2 w-100 d-flex">
                  <div className="w-100 d-flex justify-content-around">
                    <input
                      className="form-check-input"
                      id="male"
                      name="gender"
                      value="male"
                      type="radio"
                      onChange={formik.handleChange}
                      checked={formik.values.gender === "male"}
                    />
                    <label className="form-check-label" htmlFor="male">
                      Male
                    </label>
                  </div>
                  <div className="w-100 d-flex justify-content-around">
                    <input
                      className="form-check-input"
                      id="female"
                      name="gender"
                      value="female"
                      type="radio"
                      onChange={formik.handleChange}
                      checked={formik.values.gender === "female"}
                    />
                    <label className="form-check-label" htmlFor="female">
                      Female
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <button type="submit" className="btn btn-primary w-100 rounded-5">
            Sign Up
          </button>
        </Form>
      </Formik>
      <div
        className={`${styles.auth_box_form_footer} d-flex justify-content-center`}
      >
        <span>
          Already have an account?{" "}
          <Link href="/">
            <a>Sign In</a>
          </Link>
        </span>
      </div>
    </FormWrapper>
  );
}
