import FormHead from "@/components/auth/component/formHead";
import FormWrapper from "@/components/auth/component/formWrapper";
import InputGroup from "@/globalComponents/inputGroup/input-group.component";
import Link from "next/link";
import { useState } from "react";
import { MdAlternateEmail } from "react-icons/md";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  return (
    <FormWrapper>
      <FormHead
        title={"Forgot"}
        subTitle={"Enter your details to receive a rest link"}
      />
      <form>
        <div className="mt-3">
          <InputGroup
            symbol={<MdAlternateEmail />}
            placeholder="Your Email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="mt-3 mb-3">
          <button type="submit" className="btn btn-primary w-100 rounded-5">
            Send a Link
          </button>
        </div>
      </form>
      <div className="d-flex justify-content-center align-items-center">
        <Link href="/">
          <a>{"< "}Back to Sign In</a>
        </Link>
      </div>
    </FormWrapper>
  );
}
