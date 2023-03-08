type Province = {
  Id: string
  Name: string
  Districts: District[]
}

type District = {
  Id: string
  Name: string
  Wards: Ward[]
}

type Ward = {
  Id?: string
  Name?: string
  Level: Level
}

enum Level {
  Huyện = 'Huyện',
  Phường = 'Phường',
  ThịTrấn = 'Thị trấn',
  Xã = 'Xã',
}
