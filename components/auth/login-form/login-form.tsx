import LightButton from "@/globalComponents/buttons/light-button.component";
import InputGroup from "@/globalComponents/inputGroup/input-group.component";
import { Form, Formik, FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import {
  AiOutlineGoogle,
  AiFillApple,
  AiFillEye,
  AiFillEyeInvisible,
} from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";
import { BiLockAlt } from "react-icons/bi";
import styles from "../auth.module.css";
import { useState } from "react";
import FormWrapper from "@/components/auth/component/formWrapper";
import FormHead from "@/components/auth/component/formHead";
import { isDeveloperEnvironment } from "@/utils/serverUrl";
import CustomErrorTag from "@/globalComponents/errors";
import { useDispatch } from "store/store";
import { signInThunk } from "@/slice/userSlices";
interface Values {
  email: string;
  password: string;
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
const SigninSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export default function LoginForm() {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
      setTimeout(() => {
        dispatch(signInThunk(values));
      }, 500);
    },
    validationSchema: SigninSchema,
  });
  const togglePasswordVisibility = () =>
    setIsVisiblePassword(!isVisiblePassword);
  const afterSymbol = () => {
    return isVisiblePassword ? (
      <span onClick={togglePasswordVisibility}>
        <AiFillEyeInvisible />
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
      <FormHead title="Sign In" subTitle="Welcome back, you've been missed!" />
      {isDeveloperEnvironment ? (
        <>
          <div className={styles.auth_box_button}>
            {BUTTON_CONTENT.map((content) => {
              return (
                <LightButton key={content.key} className="m-1  w-100">
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
          <div className={styles.auth_box_form_footer}>
            <span>
              <input type="checkbox" /> Remember Me
            </span>
            <span>
              <Link href="/forgot">
                <a>Forgot Password?</a>
              </Link>
            </span>
          </div>

          <button type="submit" className="btn btn-primary py-1 fs-3 w-100 rounded-5">
            Login
          </button>
        </Form>
      </Formik>
      <div
        className={`${styles.auth_box_form_footer} d-flex justify-content-center`}
      >
        <span>
          You haven&#39;t any account?{" "}
          <Link href="/sign-up">
            <a>Sign Up</a>
          </Link>
        </span>
      </div>
    </FormWrapper>
  );
}
