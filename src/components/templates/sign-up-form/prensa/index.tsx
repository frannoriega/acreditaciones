
import FoodtruckSignUpForm from "../foodtruck/form";
import Requirements from "../requirements";

type PressSignUpProps = {
  onProgress?: (progress: number) => void
}

export default function PressSignUp({ onProgress }: PressSignUpProps) {
  return (
    <div className="flex flex-col gap-4">
      <Requirements type="press"/>
      <FoodtruckSignUpForm onProgress={onProgress} />
    </div>
  )
}
