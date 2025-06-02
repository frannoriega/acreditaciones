import BandSignUpForm from "./form";
import BandRequirements from "./requirements";

type BandSignUpProps = {
  onProgress?: (progress: number) => void
}

export default function BandSignUp({ onProgress }: BandSignUpProps) {
  return (
    <div className="flex flex-col gap-4">
      <BandRequirements />
      <BandSignUpForm onProgress={onProgress} />
    </div>
  )
}
