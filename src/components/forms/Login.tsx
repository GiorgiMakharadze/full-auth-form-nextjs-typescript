import * as React from "react";
import Input from "../inputs/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiLock, FiMail } from "react-icons/fi";
import SlideButton from "../buttons/SlideButton";
import { SubmitHandler } from "react-hook-form/dist/types/form";
import { useRouter } from "next/router";

interface LoginFormProps {}

const FormSchema = z.object({
  email: z.string().email("Please enter valid email address"),
  password: z
    .string()
    .min(6, "Password must be atleast 6 characters.")
    .max(20, "Password must be less than 20 characters."),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const router = useRouter();
  const path = router.pathname;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {};
  return (
    <div className="w-full px-12 py-4">
      <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
        Sign in
      </h2>
      <p className="text-center text-sm text-gray-600 mt-2">
        You do not have an account ? &nbsp;
        <a
          className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
          onClick={() => {
            router.push({
              pathname: path,
              query: {
                tab: "signup",
              },
            });
          }}
        >
          Sign up
        </a>
      </p>
      <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="email"
          label="Email Adress"
          type="text"
          icon={<FiMail />}
          placeholder="example@example.com"
          register={register}
          error={errors?.email?.message}
          disabled={isSubmitting}
        />

        <Input
          name="password"
          label="Phone number"
          type="password"
          icon={<FiLock />}
          placeholder="**********"
          register={register}
          error={errors?.password?.message}
          disabled={isSubmitting}
        />

        <SlideButton
          type="submit"
          text="Sign in"
          slide_text="Secure sign in"
          icon={<FiLock />}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};

export default LoginForm;
