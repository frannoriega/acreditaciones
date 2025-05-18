import { ArtisanSignUp } from "./artisan"
import { BandSignUp } from "./band"

type UserType = 'banda' | 'artesane' | 'gastronomico' | 'prensa'

type NewUser = {
  user_id: number,
  type: UserType,
  data: BandSignUp | ArtisanSignUp
}

export type { NewUser, UserType }
