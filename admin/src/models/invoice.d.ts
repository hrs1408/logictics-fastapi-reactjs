type CreateInvoiceType = {
  senderFullName: string
  senderPhone: string
  senderAddress: string
  senderProvince: string
  senderDistrict: string
  senderWard: string
  receiverFullName: string
  receiverPhone: string
  receiverAddress: string
  receiverProvince: string
  receiverDistrict: string
  receiverWard: string
  shippingType: 'CPN'
  weight: number
  quantity: number
  price: number
  length: number
  width: number
  height: number
  cod: number
  kindOfGoods: 'DOCUMENT' | 'GOODS' | 'COLD_GOODS' | 'BIOLOGICAL_PRODUCT'
  goodsContent: string
  expenseCover?: number
  expenseCount?: number
  payments: 'PAYMENT_SENDER' | 'PAYMENT_RECEVER'
  isShowGoods: boolean | string
  transportEquipment: 'MOTORBIKE' | 'CAR'
  requirementOther: string
}

type InvoiceCreateResponse = {
  id?: number
  ownerId?: string
  owner?: Owner
  senderFullName?: string
  senderPhone?: string
  senderAddress?: string
  senderProvince?: string
  senderDistrict?: string
  senderWard?: string
  receiverFullName?: string
  receiverPhone?: string
  receiverAddress?: string
  receiverProvince?: string
  receiverDistrict?: string
  receiverWard?: string
  shippingType?: string
  weight?: string
  quantity?: string
  price?: string
  length?: string
  width?: string
  height?: string
  cod?: string
  kindOfGoods?: string
  goodsContent?: string
  expenseCover?: string
  expenseCount?: string
  payments?: string
  isShowGoods?: string
  transportEquipment?: string
  requirementOther?: string
  status?: string
}

type Owner = {
  id?: number
  email?: string
  typeUser?: string
  userInformation?: null
  userInternalInformation?: null
}

type Meta = {
  error?: boolean
  message?: string
}
