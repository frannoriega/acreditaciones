
import FoodtruckSignUpForm from "../foodtruck/form";
import Requirements from "../requirements";

type FoodtruckSignUpProps = {
  onProgress?: (progress: number) => void
}

export default function FoodtruckSignUp({ onProgress }: FoodtruckSignUpProps) {
  return (
    <div className="flex flex-col gap-4">
      <Requirements type="foodtruck" />
      <FoodtruckSignUpForm onProgress={onProgress} />
    </div>
  )
}
