import LightButton from "@/components/custom-components/buttons/light-button.component";
import { Field, Form, Formik, FormikHelpers } from "formik";
import Link from "next/link";
import { AiOutlineGoogle, AiFillApple } from "react-icons/ai";
import styles from "../auth.module.css";
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

export default function LoginForm() {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className={`${styles.auth_box}`}>
        <div className={styles.auth_box_head}>
          <h1 className="display-6 mb-3">Sign In</h1>
          <span>Welcome back, you&#39;ve been missed!</span>
        </div>
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
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 500);
          }}
        >
          <Form>
            <div className="mb-3">
              <Field
                className="form-control"
                id="email"
                name="email"
                placeholder="Your Email"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="mb-3">
              <Field
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                type="password"
              />
            </div>
            <div className={styles.auth_box_form_footer}>
              <span>
                <input type="checkbox" /> Remember Me
              </span>
              <span>Forgot Password?</span>
            </div>

            <button type="submit" className="btn btn-primary w-100 rounded-5">
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
      </div>
    </div>
  );
}
