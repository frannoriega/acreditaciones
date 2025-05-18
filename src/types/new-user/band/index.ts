type BandSignUp = {
  name: string,
  birthday: Date,
  musicians: number,
  employees: {
    technicians: number,
    photographers: number,
    // TODO: Complete
  },
  fee: number,
  demo_url: string,
}

export type { BandSignUp }
