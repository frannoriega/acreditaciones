import Requirements from "../requirements";
import BandSignUpForm from "./form";

type BandSignUpProps = {
  onProgress?: (progress: number) => void
}

export default function BandSignUp({ onProgress }: BandSignUpProps) {
  return (
    <div className="flex flex-col gap-4">
      <Requirements type="band" />
      <BandSignUpForm onProgress={onProgress} />
    </div>
  )
}
