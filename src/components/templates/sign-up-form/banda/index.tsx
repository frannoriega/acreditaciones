import BandSignUpForm from "./form";
import BandRequirements from "./requirements";

export default function BandSignUp() {
  return (
    <div className="flex flex-col gap-4">
      <BandRequirements />
      <BandSignUpForm />
    </div>
  )
}
