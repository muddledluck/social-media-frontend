import LightButton from "@/components/custom-components/buttons/light-button.component";
import { Field, Form, Formik, FormikHelpers } from "formik";
import Link from "next/link";
import { AiOutlineGoogle, AiFillApple } from "react-icons/ai";
import styles from "../auth.module.css";
interface Values {
  email: string;
  name: string;
  password: string;
  gender: string;
  dob: Date;
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

export default function SignUpForm() {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className={`${styles.auth_box}`}>
        <div className={styles.auth_box_head}>
          <h1 className="display-6 mb-3">Getting Started</h1>
          <span>
            Create an account to continue and connect with the people.
          </span>
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
            name: "",
            password: "",
            dob: new Date(),
            gender: "",
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
                id="name"
                name="name"
                placeholder="Your Name"
                aria-describedby="nameHelp"
              />
            </div>
            <div className="mb-3">
              <Field
                className="form-control"
                id="password"
                name="password"
                placeholder="Create Password"
                type="password"
              />
            </div>
            <div className="mb-3 d-inline-flex  justify-content-between">
              <input
                className="form-control w-50"
                id="dob"
                name="dob"
                placeholder="Date of birth"
                type="date"
              />
              <input
                className="form-check-input"
                id="male"
                name="gender"
                value="Male"
                type="radio"
              />
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
              <input
                className="form-check-input"
                id="female"
                name="gender"
                value="Female"
                type="radio"
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>

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
      </div>
    </div>
  );
}
